import { defineCollection, z, reference } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: reference('categories'),
    tags: z.string().array(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
})

const categories = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    shortDescription: z.string(),
  }),
})

export const collections = { blog, categories }
