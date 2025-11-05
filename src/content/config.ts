import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
      cover: image(),
      draft: z.boolean().default(false),
    }),
});

const casos = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortTitle: z.string().optional(),
      description: z.string(),
      cover: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = {
  blog,
  casos,
};
