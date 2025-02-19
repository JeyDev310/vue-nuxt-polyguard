<script setup lang="ts">
import {
  withoutLeadingSlash,
  withoutTrailingSlash,
  withLeadingSlash,
} from 'ufo'
import {
  computed,
  watch,
  ref,
  useRoute,
  useFetch,
  createError,
  navigateTo,
} from '#imports'

import Paginator from '~/components/common/Paginator.vue'
import MainContainer from '~/components/layout/MainContainer.vue'
import BlogPostCard from '~/components/blog/BlogPostCard.vue'
import FeaturedBlogPostsSection from '~/components/blog/FeaturedBlogPostsSection.vue'

interface BlogCategory {
  title: string
  uri: string
}

interface BlogImage {
  url: string
}

interface ProfileImage {
  url: string
}

interface ContentAuthors {
  profileImage: ProfileImage[]
  title: string
}

interface BlogPost {
  title: string
  blogCategories: BlogCategory[]
  excerptText: string
  uri: string
  blogFeaturedImage: BlogImage[]
  contentAuthors: ContentAuthors[]
  postDate: string
}

interface PaginatedBlogPosts {
  blogPosts: BlogPost[]
  totalPages: number
}

interface Props {
  title?: string
  channel?: string
  sectionCategories?: string
  categorySlug?: string
  pageSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  categorySlug: undefined,
  channel: 'blog',
  sectionCategories: '',
  pageSize: 12,
})

const route = useRoute()
const queryPage = route.query.page

const currentPage = ref<number>(getCurrentPage())

// Validate channel
const categoryUri = withoutLeadingSlash(
  withoutTrailingSlash(props.categorySlug),
)

const paginatedBlogPosts = ref<PaginatedBlogPosts | undefined | null>(null)

const allowedChannels = ['blog']

if (!props.channel || !allowedChannels.includes(props.channel)) {
  throw createError({
    statusCode: 404,
    message: 'Page Not Found',
  })
}

//Fetch blog categories
const { data: blogCategories } = await useFetch('/api/v1/blog/blog-categories')

const blogPostsCards = computed(() => {
  return (paginatedBlogPosts.value?.blogPosts || []).map(
    (blogPost: BlogPost) => {
      return {
        title: blogPost.title || '',
        category: blogPost.blogCategories[0]?.title || '',
        categoryLink: withLeadingSlash(
          withoutTrailingSlash(blogPost.blogCategories[0]?.uri || ''),
        ),
        description: blogPost.excerptText || '',
        link: withLeadingSlash(withoutTrailingSlash(blogPost.uri || '')),
        image: blogPost.blogFeaturedImage[0]?.url || '',
        authorImage: blogPost.contentAuthors[0]?.profileImage[0]?.url || '',
        authorName: blogPost.contentAuthors[0]?.title || '',
        date: blogPost.postDate,
      }
    },
  )
})

const navigationalBlogCategories = computed(() => {
  return [
    { title: 'All', uri: '/blog' },
    ...(blogCategories.value ?? []).map((category: BlogCategory) => {
      return {
        title: category.title,
        uri: withLeadingSlash(withoutTrailingSlash(category.uri)),
      }
    }),
  ]
})

const mostRecentBlogArticles = computed(() => {
  // return the first post if there are no featured posts
  return blogPostsCards.value.slice(0, 3)
})

// Watch for page changes to update the URL
watch(
  () => currentPage.value,
  async (newVal) => {
    await navigateTo({
      path: route.path,
      query: { page: newVal },
    })
  },
)

// Watch the route for changes to refresh data (this also works during page reload)
watch(
  () => route.query,
  async () => {
    await loadBlogPosts()
  },
  { immediate: true },
)

async function loadBlogPosts() {
  const requestBody = {
    page: currentPage.value,
    ...(categoryUri !== 'blog' && { categoryUri }),
  }
  const { data } = await useFetch<PaginatedBlogPosts>('/api/v1/blog/posts', {
    method: 'POST',
    body: requestBody,
  })

  paginatedBlogPosts.value = data.value
}

function getCurrentPage(): number {
  if (!queryPage) return 1

  const pageNumber = parseInt(queryPage.toString())
  if (isNaN(pageNumber)) {
    return 1
  } else if (pageNumber < 1) {
    return 1
  } else {
    return pageNumber
  }
}
</script>

<template>
  <div>
    <!-- Heading Section -->
    <section class="mt-16">
      <MainContainer>
        <div class="flex w-full flex-col md:justify-normal">
          <h1
            class="font-eastman w-full text-left text-5xl font-semibold leading-snug"
          >
            {{ props.title }}
          </h1>
        </div>
      </MainContainer>
    </section>

    <!-- Featured Blog Posts Section -->
    <FeaturedBlogPostsSection
      v-if="mostRecentBlogArticles"
      :articles="mostRecentBlogArticles"
      blurb="Explore our articles to learn more about products in application."
    />

    <!-- Blog Categories Navigation Section-->
    <section class="my-16">
      <MainContainer>
        <BlogCategoriesNavigation
          :blog-categories="navigationalBlogCategories"
        />
      </MainContainer>
    </section>

    <!-- Blog Listing Section-->
    <section class="my-16">
      <MainContainer>
        <div class="grid gap-x-5 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          <BlogPostCard
            v-for="post in blogPostsCards"
            :key="post.title"
            :article="post"
          />
        </div>
      </MainContainer>
    </section>

    <!-- Paginator Section -->
    <section class="my-24">
      <MainContainer>
        <div class="flex w-full justify-center">
          <Paginator
            v-model="currentPage"
            :total-pages="paginatedBlogPosts?.totalPages || 0"
          />
        </div>
      </MainContainer>
    </section>
  </div>
</template>
