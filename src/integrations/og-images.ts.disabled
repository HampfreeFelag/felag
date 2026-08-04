import type { AstroIntegration } from 'astro';
import { readFile, writeFile, mkdir, readdir } from 'fs/promises';
import { existsSync, readFileSync } from 'fs';
import path from 'path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { OGImageComponent } from '../utils/og-image.tsx';
import { ui } from '../i18n/ui';

interface OGImageData {
	title: string;
	subtitle?: string;
	category?: string;
	rubric?: string;
	lang: string;
	slug: string;
}

// Read frontmatter from markdown file
function parseFrontmatter(content: string): Record<string, any> {
	const match = content.match(/^---\n([\s\S]*?)\n---/);
	if (!match) return {};
	const yaml = match[1];
	const data: Record<string, any> = {};
	for (const line of yaml.split('\n')) {
		const kv = line.match(/^(\w+):\s*(.+)$/);
		if (kv) {
			let val: any = kv[2].trim();
			// Remove quotes
			if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
			if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
			// Parse booleans
			if (val === 'true') val = true;
			if (val === 'false') val = false;
			data[kv[1]] = val;
		}
	}
	return data;
}

// Load fonts (TTF format required for Satori)
async function loadFonts() {
	const fonts = [];

	// Try to load Inter from Google Fonts (TTF format)
	try {
		// Use Google Fonts CSS API to get actual TTF URLs
		const cssUrl = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';
		const cssResponse = await fetch(cssUrl);
		if (cssResponse.ok) {
			const css = await cssResponse.text();
			// Extract font URLs from CSS
			const urlRegex = /url\(([^)]+)\)/g;
			let match;
			const urls: string[] = [];
			while ((match = urlRegex.exec(css)) !== null) {
				urls.push(match[1]);
			}
			for (const url of urls) {
				try {
					const fontResponse = await fetch(url);
					if (fontResponse.ok) {
						const fontData = await fontResponse.arrayBuffer();
						fonts.push({
							name: 'Inter',
							data: Buffer.from(fontData),
							weight: url.includes('wght@400') ? 400 : 700,
							style: 'normal',
						});
					}
				} catch (e) {
					console.warn(`[OG Images] Failed to load font from ${url}`);
				}
			}
		}
	} catch (error) {
		console.warn('[OG Images] Error loading Inter from Google Fonts:', error);
	}

	// Fallback: use system Arial font
	if (fonts.length === 0) {
		try {
			const arialPath = 'C:/Windows/Fonts/arial.ttf';
			if (existsSync(arialPath)) {
				const fontData = readFileSync(arialPath);
				fonts.push({
					name: 'Arial',
					data: fontData,
					weight: 400,
					style: 'normal',
				});
				console.log('[OG Images] Using system Arial font as fallback');
			}
		} catch (e) {
			console.warn('[OG Images] Failed to load system font:', e);
		}
	}

	if (fonts.length === 0) {
		console.warn('[OG Images] No fonts loaded! OG images will fail.');
	}

	return fonts;
}

// Generate OG image from data
async function generateOGImage(data: OGImageData, fonts: any[], outputPath: string) {
	try {
		// Get rubric translation
		const rubric = data.rubric || (() => {
			const catKey = (data.category || 'general').toLowerCase().trim();
			const translations = (ui as any)[data.lang];
			if (translations?.cat?.[catKey]) {
				return translations.cat[catKey];
			}
			return data.category?.toUpperCase() || 'GENERAL';
		})();

		// Generate SVG using Satori
		const svg = await satori(
			OGImageComponent({
				title: data.title,
				subtitle: data.subtitle,
				category: data.category || 'general',
				rubric,
			}),
			{
				width: 1200,
				height: 630,
				fonts: fonts.length > 0 ? fonts : [],
			}
		);

		// Convert SVG to PNG using Resvg
		const resvg = new Resvg(svg, {
			fitTo: {
				mode: 'width',
				value: 1200,
			},
		});

		const pngData = resvg.render();
		const pngBuffer = pngData.asPng();

		// Ensure directory exists
		const dir = path.dirname(outputPath);
		if (!existsSync(dir)) {
			await mkdir(dir, { recursive: true });
		}

		// Write PNG file
		await writeFile(outputPath, pngBuffer);

		return true;
	} catch (error) {
		console.error(`[OG Images] Error generating image for ${data.slug}:`, (error as Error).message);
		return false;
	}
}

// Get published posts from filesystem
async function getPublishedPosts(baseDir: string, lang: string): Promise<OGImageData[]> {
	const posts: OGImageData[] = [];
	try {
		const entries = await readdir(baseDir, { withFileTypes: true });
		for (const entry of entries) {
			if (!entry.isDirectory()) continue;
			const indexPath = path.join(baseDir, entry.name, 'index.md');
			if (!existsSync(indexPath)) continue;
			const content = await readFile(indexPath, 'utf-8');
			const fm = parseFrontmatter(content);
			if (fm.draft === true) continue;
			if (!fm.title) continue;
			posts.push({
				title: fm.title,
				subtitle: fm.description || '',
				category: fm.category || 'general',
				lang,
				slug: entry.name,
			});
		}
	} catch (e) {
		console.warn(`[OG Images] Error reading ${lang} posts:`, e);
	}
	return posts;
}

export function ogImagesIntegration(): AstroIntegration {
	return {
		name: 'og-images',
		hooks: {
			'astro:build:done': async ({ dir }) => {
				console.log('[OG Images] Starting OG image generation...');

				// Load fonts
				const fonts = await loadFonts();

				// Read posts from filesystem
				const contentBase = path.resolve(process.cwd(), 'src/content');
				const [postsRu, postsEn] = await Promise.all([
					getPublishedPosts(path.join(contentBase, 'blog-ru'), 'ru'),
					getPublishedPosts(path.join(contentBase, 'blog-en'), 'en'),
				]);

				const allPosts = [...postsRu, ...postsEn];

				// Generate OG images for each post
				const ogDir = path.join(dir.pathname, 'og');
				let successCount = 0;
				let failCount = 0;

				for (const post of allPosts) {
					const outputPath = path.join(ogDir, `${post.lang}-${post.slug}.png`);
					const success = await generateOGImage(post, fonts, outputPath);
					if (success) {
						successCount++;
					} else {
						failCount++;
					}
				}

				// Generate OG images for homepage (per language)
				for (const lang of ['ru', 'en']) {
					const homepageData: OGImageData = {
						title: 'FÉLAG',
						subtitle: lang === 'ru'
							? 'Блог о трейдинге, криптовалюте и автоматизации торговли'
							: 'Blog about trading, cryptocurrency and automated trading',
						category: 'general',
						lang,
						slug: 'homepage',
					};

					const homepagePath = path.join(ogDir, `${lang}-homepage.png`);
					await generateOGImage(homepageData, fonts, homepagePath);

					// Generate about page OG image
					const aboutData: OGImageData = {
						title: lang === 'ru' ? 'О ПРОЕКТЕ' : 'ABOUT',
						subtitle: lang === 'ru'
							? 'FÉLAG — образовательная лаборатория о трейдинге'
							: 'FÉLAG — an educational laboratory about trading',
						category: 'general',
						lang,
						slug: 'about',
					};

					const aboutPath = path.join(ogDir, `${lang}-about.png`);
					await generateOGImage(aboutData, fonts, aboutPath);
				}

				console.log(`[OG Images] Generated ${successCount} images successfully, ${failCount} failed`);
				console.log('[OG Images] OG image generation complete!');
			},
		},
	};
}
