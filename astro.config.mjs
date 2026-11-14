// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { ogImagesIntegration } from './src/integrations/og-images';
import { rehypeExternalLinks } from './src/plugins/rehype-external-links.mjs';
import { rehypeSectionWrappers } from './src/plugins/rehype-section-wrappers.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://felag.online',
	base: '/',
	viewTransitions: true,
	integrations: [mdx(), sitemap(), ogImagesIntegration()],
	image: {
		// Оптимизация изображений через Sharp (дефолт Astro)
	},
	markdown: {
		rehypePlugins: [rehypeExternalLinks, rehypeSectionWrappers],
	},
	vite: {
		// Для Windows - кэш node_modules в отдельной директории
		cacheDir: '.vite',
	},
	redirects: {
		// --- Точечные редиректы: старые статьи /library/<slug>/ → /saga/<slug>/ ---
		// RU статьи
		'/ru/library/algo-journey/': '/ru/saga/algo-journey/',
		'/ru/library/behind-the-scenes-architecture/': '/ru/saga/behind-the-scenes-architecture/',
		'/ru/library/information-harbor-architecture/': '/ru/saga/information-harbor-architecture/',
		// EN статьи
		'/en/library/algo-journey/': '/en/saga/algo-journey/',
		'/en/library/behind-the-scenes-architecture/': '/en/saga/behind-the-scenes-architecture/',
		'/en/library/information-harbor-architecture/': '/en/saga/information-harbor-architecture/',

		// --- Редиректы категорий /library/<cat>/ → /saga/?categories=<cat> ---
		// RU категории
		'/ru/library/compass/': { destination: '/ru/saga/?categories=compass', status: 301 },
		'/ru/library/route/': { destination: '/ru/saga/?categories=route', status: 301 },
		'/ru/library/forge/': { destination: '/ru/saga/?categories=forge', status: 301 },
		'/ru/library/helm/': { destination: '/ru/saga/?categories=helm', status: 301 },
		'/ru/library/treasury/': { destination: '/ru/saga/?categories=treasury', status: 301 },
		'/ru/library/logbook/': { destination: '/ru/saga/?categories=logbook', status: 301 },
		'/ru/library/crew/': { destination: '/ru/saga/?categories=crew', status: 301 },
		// EN категории
		'/en/library/compass/': { destination: '/en/saga/?categories=compass', status: 301 },
		'/en/library/route/': { destination: '/en/saga/?categories=route', status: 301 },
		'/en/library/forge/': { destination: '/en/saga/?categories=forge', status: 301 },
		'/en/library/helm/': { destination: '/en/saga/?categories=helm', status: 301 },
		'/en/library/treasury/': { destination: '/en/saga/?categories=treasury', status: 301 },
		'/en/library/logbook/': { destination: '/en/saga/?categories=logbook', status: 301 },
		'/en/library/crew/': { destination: '/en/saga/?categories=crew', status: 301 },

		// --- Редиректы старых разделов (без /library/) ---
		'/en/compass/': '/en/saga/',
		'/en/route/': '/en/saga/',

		// --- Удалённая испанская локаль ---
		'/es/library/': '/en/saga/',
	},
});
