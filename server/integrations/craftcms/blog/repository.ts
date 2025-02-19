import type { ApiContext } from '#shared/types'
import { getBlogCategories } from '~~/server/integrations/craftcms/blog/api/get-blog-categories'
import { getBlogCategory } from '~~/server/integrations/craftcms/blog/api/get-blog-category'
import { getBlogPosts } from '~~/server/integrations/craftcms/blog/api/get-blog-posts'
import { getBlogPost } from '~~/server/integrations/craftcms/blog/api/get-blog-post'

export function createBlogRepository({ env }: ApiContext) {
  async function fetchBlogCategories() {
    try {
      return await getBlogCategories({ env })
    } catch {
      return []
    }
  }

  async function fetchBlogCategory(uri: string) {
    try {
      return await getBlogCategory(uri, { env })
    } catch {
      return null
    }
  }

  interface FetchBlogPostsParams {
    page?: number
    pageSize?: number
    categoryUri?: string
    isFeatured?: boolean
  }

  async function fetchBlogPosts(params: FetchBlogPostsParams) {
    try {
      const { page, pageSize, categoryUri, isFeatured } = params
      return await getBlogPosts(
        { page, pageSize, categoryUri, isFeatured },
        { env },
      )
    } catch {
      return {
        blogPosts: [],
        entryCount: 0,
      }
    }
  }

  async function fetchFeaturedBlogPosts() {
    return await fetchBlogPosts({ isFeatured: true })
  }

  async function fetchBlogPost(uri: string) {
    try {
      return await getBlogPost(uri, { env })
    } catch {
      return null
    }
  }

  return {
    fetchBlogCategories,
    fetchBlogCategory,
    fetchBlogPosts,
    fetchFeaturedBlogPosts,
    fetchBlogPost,
  }
}
