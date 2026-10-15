// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { ogImagesIntegration } from './src/integrations/og-images';

// https://astro.build/config
export default defineConfig({
	site: 'https://felag.online',
	base: '/',
	integrations: [mdx(), sitemap(), ogImagesIntegration()],
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
