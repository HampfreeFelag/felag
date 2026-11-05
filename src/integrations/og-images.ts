import type { AstroIntegration } from 'astro';
import { readFile, writeFile, mkdir, readdir } from 'fs/promises';
import { existsSync, readFileSync } from 'fs';
import path from 'path';
import React from 'react';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { ui } from '../i18n/ui';

interface OGImageData {
	title: string;
	subtitle?: string;
	category?: string;
	rubric?: string;
	lang: string;
	slug: string;
}

// ─── Frontmatter parser ───────────────────────────────────────────────
function parseFrontmatter(content: string): Record<string, any> {
	const match = content.match(/^---\n([\s\S]*?)\n---/);
	if (!match) return {};
	const yaml = match[1];
	const data: Record<string, any> = {};

	for (const line of yaml.split('\n')) {
		const kv = line.match(/^(\w+):\s*(.+)$/);
		if (kv) {
			let val: any = kv[2].trim();
			if (typeof val === 'string') {
				if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
				if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
				// Handle inline arrays: ['compass'] → 'compass'
				const arrMatch = val.match(/^\['([^']+)'\]$/);
				if (arrMatch) val = arrMatch[1];
			}
			if (val === 'true') val = true;
			if (val === 'false') val = false;
			data[kv[1]] = val;
		}
	}

	// Handle `categories: ['compass']` (array) — extract first element
	// After parsing, data.categories is a string 'compass' (extracted by arrMatch above)
	if (!data.category && data.categories) {
		data.category = data.categories;
	}

	return data;
}

// ─── Category → rubric translation (from ui.ts) ──────────────────────
function translateRubric(catKey: string, lang: string): string {
	const catMap: Record<string, Record<string, string>> = {
		route: { ru: 'Маршрут', en: 'Route' },
		forge: { ru: 'Кузница', en: 'Forge' },
		helm: { ru: 'Штурвал', en: 'Helm' },
		treasury: { ru: 'Казна', en: 'Treasury' },
		compass: { ru: 'Компас', en: 'Compass' },
		logbook: { ru: 'Бортжурнал', en: 'Logbook' },
		crew: { ru: 'Команда', en: 'Crew' },
		general: { ru: 'Общее', en: 'General' },
	};
	return catMap[catKey]?.[lang] ?? catKey.toUpperCase();
}

// ─── Category → color (synced with global.css) ───────────────────────
const CATEGORY_COLORS: Record<string, string> = {
	route: '#1E3A5F',
	forge: '#A97B2C',
	helm: '#3E6E96',
	treasury: '#8A6423',
	compass: '#5E7355',
	logbook: '#4E7DA3',
	crew: '#A54E4B',
	general: '#7A8B9C',
};

// ─── Font loader ─────────────────────────────────────────────────────
async function loadFonts(): Promise<any[]> {
	const fonts: any[] = [];
	const fontsDir = path.resolve(process.cwd(), 'src', 'assets', 'fonts');

	// Load local TTF fonts (downloaded from Google Fonts, cached in repo)
	const localFonts = [
		{ file: 'CormorantGaramond-600.ttf', name: 'Cormorant Garamond', weight: 600, style: 'normal' },
		{ file: 'Inter-400.ttf', name: 'Inter', weight: 400, style: 'normal' },
		{ file: 'Inter-500.ttf', name: 'Inter', weight: 500, style: 'normal' },
		{ file: 'JetBrainsMono-500.ttf', name: 'JetBrains Mono', weight: 500, style: 'normal' },
	];

	for (const ff of localFonts) {
		const ttfPath = path.join(fontsDir, ff.file);
		if (existsSync(ttfPath)) {
			fonts.push({ ...ff, data: readFileSync(ttfPath) });
		}
	}

	// Fallback: try Google Fonts if local fonts missing
	if (fonts.length === 0) {
		try {
			const cssUrl = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&display=swap';
			const cssResponse = await fetch(cssUrl);
			if (cssResponse.ok) {
				const css = await cssResponse.text();
				const urlRegex = /url\(([^)]+)\)/g;
				let match;
				while ((match = urlRegex.exec(css)) !== null) {
					const url = match[1];
					try {
						const fontResponse = await fetch(url);
						if (fontResponse.ok) {
							const fontData = await fontResponse.arrayBuffer();
							const buf = Buffer.from(fontData);
							if (url.includes('Cormorant')) {
								fonts.push({ name: 'Cormorant Garamond', data: buf, weight: 600, style: 'normal' });
							} else if (url.includes('Inter')) {
								const is500 = url.includes('wght@500');
								fonts.push({ name: 'Inter', data: buf, weight: is500 ? 500 : 400, style: 'normal' });
							} else if (url.includes('JetBrains')) {
								fonts.push({ name: 'JetBrains Mono', data: buf, weight: 500, style: 'normal' });
							}
						}
					} catch { /* skip */ }
				}
			}
		} catch { /* skip */ }
	}

	// Last resort: system Arial
	if (fonts.length === 0) {
		try {
			const arialPath = 'C:/Windows/Fonts/arial.ttf';
			if (existsSync(arialPath)) {
				fonts.push({ name: 'Arial', data: readFileSync(arialPath), weight: 400, style: 'normal' });
				console.log('[OG Images] Using system Arial as last resort');
			}
		} catch { /* skip */ }
	}

	if (fonts.length === 0) {
		console.warn('[OG Images] No fonts loaded! OG images will fail.');
	}

	return fonts;
}

// ─── OG image generator ──────────────────────────────────────────────
async function generateOGImage(data: OGImageData, fonts: any[], outputPath: string) {
	try {
		const category = data.category || 'general';
		const catColor = CATEGORY_COLORS[category] || CATEGORY_COLORS.general;
		const rubric = data.rubric || translateRubric(category, data.lang);

		// Adaptive title size based on length
		const title = data.title || '';
		const titleFontSize = title.length > 60 ? 56 : title.length > 40 ? 64 : 72;

		const svg = await satori(
			React.createElement('div', {
				style: {
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					padding: '72px',
					position: 'relative',
					background: 'linear-gradient(135deg, #1E3A5F 0%, #14283F 100%)',
				},
			},
				// Content (centered vertically)
				React.createElement('div', {
					style: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
				},
					React.createElement('h1', {
						style: {
							fontFamily: "'Cormorant Garamond', Georgia, serif",
							fontSize: `${titleFontSize}px`,
							fontWeight: 600,
							color: '#FAF9F6',
							lineHeight: 1.2,
							margin: '0 0 24px 0',
							maxWidth: '1000px',
							letterSpacing: '-0.01em',
						},
					}, title),
					data.subtitle ? React.createElement('p', {
						style: {
							fontFamily: "'Inter', sans-serif",
							fontSize: '24px',
							fontWeight: 400,
							color: '#B8C4D0',
							lineHeight: 1.5,
							margin: 0,
							maxWidth: '960px',
						},
					}, data.subtitle) : null
				),

				// Bottom bar
				React.createElement('div', {
					style: {
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginTop: 'auto',
						paddingTop: '24px',
						borderTop: '1px solid rgba(255,255,255,0.12)',
					},
				},
					React.createElement('span', {
						style: {
							fontFamily: "'JetBrains Mono', monospace",
							fontSize: '14px',
							color: '#A97B2C',
							letterSpacing: '0.02em',
						},
					}, `${rubric} · felag.online`),
					React.createElement('span', {
						style: {
							fontFamily: "'Cormorant Garamond', Georgia, serif",
							fontSize: '16px',
							fontWeight: 600,
							color: '#A97B2C',
							letterSpacing: '0.1em',
							textTransform: 'uppercase',
						},
					}, 'FÉLAG')
				),

				// Geometric accent: 3 dots in bottom-right corner
				React.createElement('div', {
					style: {
						position: 'absolute',
						top: '72px',
						right: '72px',
						display: 'flex',
						gap: '8px',
						alignItems: 'center',
					},
				},
					React.createElement('div', {
						style: {
							width: '6px',
							height: '6px',
							borderRadius: '50%',
							background: '#A97B2C',
							opacity: 0.3,
						},
					}),
					React.createElement('div', {
						style: {
							width: '6px',
							height: '6px',
							borderRadius: '50%',
							background: '#A97B2C',
							opacity: 0.5,
						},
					}),
					React.createElement('div', {
						style: {
							width: '6px',
							height: '6px',
							borderRadius: '50%',
							background: '#A97B2C',
							opacity: 0.7,
						},
					})
				)
			),
			{
				width: 1200,
				height: 630,
				fonts,
			}
		);

		const resvg = new Resvg(svg, {
			fitTo: { mode: 'width', value: 1200 },
		});

		const pngBuffer = resvg.render().asPng();

		const dir = path.dirname(outputPath);
		if (!existsSync(dir)) {
			await mkdir(dir, { recursive: true });
		}

		await writeFile(outputPath, pngBuffer);
		return true;
	} catch (error) {
		console.error(`[OG Images] Error generating image for ${data.slug}:`, (error as Error).message);
		return false;
	}
}

// ─── Get published posts ─────────────────────────────────────────────
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

// ─── Integration ─────────────────────────────────────────────────────
export function ogImagesIntegration(): AstroIntegration {
	return {
		name: 'og-images',
		hooks: {
			'astro:build:done': async ({ dir }) => {
				console.log('[OG Images] Starting OG image generation...');

				const fonts = await loadFonts();

				const contentBase = path.resolve(process.cwd(), 'src/content');
				const [postsRu, postsEn] = await Promise.all([
					getPublishedPosts(path.join(contentBase, 'blog-ru', 'saga'), 'ru'),
					getPublishedPosts(path.join(contentBase, 'blog-en', 'saga'), 'en'),
				]);

				const allPosts = [...postsRu, ...postsEn];

				const ogDir = path.resolve(dir.pathname.replace(/^\/[a-zA-Z]:/, ''), 'og');
				let successCount = 0;
				let failCount = 0;

				for (const post of allPosts) {
					const outputPath = path.join(ogDir, `${post.lang}-${post.slug}.png`);
					const success = await generateOGImage(post, fonts, outputPath);
					if (success) successCount++;
					else failCount++;
				}

				// Homepage + About
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
					await generateOGImage(homepageData, fonts, path.join(ogDir, `${lang}-homepage.png`));

					const aboutData: OGImageData = {
						title: lang === 'ru' ? 'О ПРОЕКТЕ' : 'ABOUT',
						subtitle: lang === 'ru'
							? 'FÉLAG — образовательная лаборатория о трейдинге'
							: 'FÉLAG — an educational laboratory about trading',
						category: 'general',
						lang,
						slug: 'about',
					};
					await generateOGImage(aboutData, fonts, path.join(ogDir, `${lang}-about.png`));
				}

				console.log(`[OG Images] Generated ${successCount} images successfully, ${failCount} failed`);
				console.log('[OG Images] OG image generation complete!');
			},
		},
	};
}
