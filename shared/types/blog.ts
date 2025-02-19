// types/blog.ts

export type BlogCategory = {
  __typename?: string
  title?: string
  uri?: string
  image?: string
  description?: string
  authorImage?: string
}

export type BlogMedia = {
  __typename: 'blogMedia_Asset'
  url?: string | null
  height?: number | null
  width?: number | null
  size?: string | null
  mimeType?: string
  title?: string
  alt?: string
}

export type ProfileImage = {
  id: number
  url: string
}
export type ContentAuthors = {
  __typename: ''
  typeHandle?: string | null
  id: number
  title: string | null
  profileImage: ProfileImage[]
  description?: string | null
}

export type BlogPost = {
  __typename: 'blog_default_Entry'
  uri?: string | null
  slug?: string | null
  status?: string | null
  id?: string | null
  title?: string | null
  blogCategories: BlogCategory[]
  blogFeaturedImage: BlogMedia[]
  blogPostContent?: string | null
  postDate?: string | null
  dateUpdated?: string | null
  authorName?: string | null
  authorImage?: string | null
  excerptText?: string | null
  contentAuthors?: ContentAuthors[]
  readingTime?: string
}
