<script setup lang="ts">
import {
  withLeadingSlash,
  withoutLeadingSlash,
  withoutTrailingSlash,
} from 'ufo'
import type { BreadcrumbItem, BlogPost } from '#shared/types'
import {
  computed,
  ref,
  useFetch,
  navigateTo,
  useRoute,
  useSeomatic,
  useHead,
} from '#imports'

import MainContainer from '~/components/layout/MainContainer.vue'
import RelatedBlogPostsSection from '~/components/blog/RelatedBlogPostsSection.vue'
import BreadcrumbsSection from '~/components/common/BreadcrumbsSection.vue'
import BlogPostContent from '~/components/blog/BlogPostContent.vue'
import Badge from '~/components/ui/Badge.vue'
import BlogSocialShare from '~/components/blog/BlogSocialShare.vue'

const route = useRoute()

const uri = withoutLeadingSlash(withoutTrailingSlash(route.path))

const hideBreadcrumbs = ref<boolean>(false)

const { data: blogPost } = await useFetch<BlogPost>(`/api/v1/blog/post`, {
  method: 'POST',
  body: {
    uri,
  },
})

if (!blogPost.value) {
  await navigateTo('/404', { redirectCode: 404 })
}

const { seomaticHeadData } = useSeomatic(blogPost)
useHead(seomaticHeadData)

const blogBreadcrumbs: Array<BreadcrumbItem> = [
  {
    name: 'Home',
    href: '/',
    current: false,
  },
  {
    name: 'Blog',
    href: '/blog',
    current: false,
  },
  {
    name: blogPost.value?.title || '',
    href: withLeadingSlash(uri),
    current: true,
  },
]

const breadcrumbs: Array<BreadcrumbItem> = blogBreadcrumbs

const selectedCategory = blogPost.value?.blogCategories[0]?.title

const currentPage = 1

const requestBody = {
  page: currentPage,
  categoryUri:
    'blog/category/' + selectedCategory?.toLowerCase().replace(/\s+/g, '-'), // Convert category title to URI format
}

const { data: paginatedBlogPosts } = await useFetch<{
  blogPosts: Array<BlogPost>
}>('/api/v1/blog/posts', {
  method: 'POST',
  body: requestBody,
})

const blogPosts = computed(() => {
  return (paginatedBlogPosts.value?.blogPosts || []).map((blogPost) => {
    return {
      title: blogPost.title || '',
      category: blogPost.blogCategories[0]?.title || '',
      categoryLink: withLeadingSlash(
        withoutTrailingSlash(blogPost.blogCategories[0]?.uri || ''),
      ),
      description: blogPost.excerptText || '',
      link: withLeadingSlash(withoutTrailingSlash(blogPost.uri || '')),
      image: blogPost.blogFeaturedImage[0]?.url || '',
      authorImage: blogPost.contentAuthors
        ? blogPost.contentAuthors[0]?.profileImage[0]?.url || ''
        : '',
      authorName: blogPost.contentAuthors
        ? blogPost.contentAuthors[0]?.title || ''
        : '',
      date: blogPost.postDate,
    }
  })
})

const relatedBlogArticles = computed(() => {
  // return the first post if there are no featured posts
  return blogPosts.value.slice(0, 3)
})
</script>

<template>
  <div>
    <BreadcrumbsSection v-if="!hideBreadcrumbs" :items="breadcrumbs" />

    <section class="relative">
      <div
        class="absolute inset-0 z-0 m-auto h-full w-full before:absolute before:inset-0 before:z-10 before:m-auto before:h-full before:w-full before:bg-black before:opacity-20 after:absolute after:inset-0 after:m-auto after:h-full after:w-full after:bg-gradient-to-tr after:from-black after:opacity-60 after:content-['']"
      >
        <picture
          v-if="
            blogPost?.blogFeaturedImage[0] &&
            blogPost?.blogFeaturedImage[0]?.__typename === 'blogMedia_Asset'
          "
          class="h-full w-full"
        >
          <NuxtImg
            :src="blogPost?.blogFeaturedImage[0]?.url || undefined"
            :srcset="blogPost?.blogFeaturedImage[0]?.url || undefined"
            sizes="100vw"
            class="h-full w-full object-cover"
            :width="blogPost.blogFeaturedImage[0]?.width ?? undefined"
            :height="blogPost.blogFeaturedImage[0]?.height ?? undefined"
            alt=""
          />
        </picture>
      </div>

      <div class="z-10">
        <MainContainer class="relative px-5">
          <div
            class="relative flex min-h-[45vh] flex-col items-center justify-center md:h-[600px] lg:items-start"
          >
            <!-- Content -->
            <div class="max-w-prose">
              <h1
                class="inline-block text-3xl font-semibold !leading-snug tracking-wide text-white sm:text-4xl md:text-5xl"
              >
                {{ blogPost?.title }}
              </h1>
            </div>
          </div>
        </MainContainer>
      </div>
    </section>

    <!-- Blog Post Content -->
    <section class="my-8">
      <MainContainer>
        <div class="lg:grid lg:grid-cols-3 lg:gap-x-8">
          <article class="lg:col-span-2">
            <div class="container mx-auto my-4 max-w-prose lg:prose-lg">
              <div
                class="flex flex-col gap-1 md:flex-row md:items-start md:justify-between"
              >
                <div class="w-full md:grow">
                  <Badge
                    v-for="(category, index) in blogPost?.blogCategories"
                    :key="index"
                    class="order-1 mb-4 lg:order-1"
                    :text="category?.title"
                  />
                  <BlogAuthorInfo
                    class="order-2 lg:order-3"
                    :author-image-url="
                      blogPost?.contentAuthors
                        ? blogPost?.contentAuthors[0]?.profileImage[0]?.url ||
                          undefined
                        : ''
                    "
                    :author-name="
                      blogPost?.contentAuthors
                        ? blogPost?.contentAuthors[0]?.title || undefined
                        : ''
                    "
                    :post-date="blogPost?.dateUpdated"
                  />
                </div>
                <div class="w-full md:w-fit">
                  <div class="flex items-center justify-between space-x-8">
                    <BlogReadingTime
                      :reading-time-in-min="blogPost?.readingTime"
                    />
                    <BlogSocialShare
                      :url="withLeadingSlash(blogPost?.uri || '')"
                      :title="blogPost?.title || ''"
                      :description="blogPost?.excerptText || ''"
                    />
                  </div>
                </div>
              </div>

              <BlogPostContent :html-content="blogPost?.blogPostContent" />
              <BlogPostCategoryCard class="mb-6" />
              <CtasSideImageCta />
            </div>
          </article>
          <aside class="lg:col-span-1">
            <div class="space-y-8">
              <BlogPostSideCard />
              <BlogPostSideCta />
            </div>
          </aside>
        </div>
      </MainContainer>
    </section>

    <RelatedBlogPostsSection :articles="relatedBlogArticles" />
  </div>
</template>
