import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogSchema = ({ image }) =>
	z.object({
		title: z.string(),
		description: z.string(),
		metaOgTitle: z.string().optional(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		bannerImage: z.string().optional(),
		previewImage: z.string().optional(),
		category: z.string().optional(),
		tags: z.array(z.string()).optional(),
		pinned: z.boolean().optional(),
		draft: z.boolean().optional(),
		heroImage: image().optional(),
	});

const blogRu = defineCollection({
	loader: glob({ base: './src/content/blog-ru', pattern: '**/*.{md,mdx}' }),
	schema: blogSchema,
});

const blogEn = defineCollection({
	loader: glob({ base: './src/content/blog-en', pattern: '**/*.{md,mdx}' }),
	schema: blogSchema,
});

export const collections = {
	'blog-ru': blogRu,
	'blog-en': blogEn,
};
