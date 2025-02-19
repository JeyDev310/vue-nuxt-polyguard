import { z } from 'zod'

export function serializeBlogCategories(blogCategories: unknown[]) {
  const schema = z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      slug: z.string(),
      uri: z.string(),
    }),
  )

  const result = schema.safeParse(blogCategories)

  if (!result.success) {
    console.error('parse error', result, 'blogCategories', blogCategories)
    return []
  }
  return result.data.map((c) => {
    return {
      id: c?.id ?? '',
      title: c?.title ?? '',
      slug: c?.slug ?? '',
      uri: `blog/category/${c?.slug}`,
    }
  })
}
