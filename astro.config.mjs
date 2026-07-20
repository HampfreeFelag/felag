// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://felag.online',
	base: '/',
	integrations: [mdx(), sitemap()],
	image: {
		// Используем встроенные сервисы изображений для PNG
		service: {
			entrypoint: 'astro/assets/services/noop',
		},
	},
	vite: {
		// Для Windows - кэш node_modules в отдельной директории
		cacheDir: '.vite',
	},
});
