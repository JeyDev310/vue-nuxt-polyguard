export interface GenericPageEntry {
  uri?: string | null
  title?: string | null
  ancestors: Array<{
    title?: string | null
    uri?: string | null
  }>
}

export interface BreadcrumbItem {
  name: string
  current: boolean
  href?: string
}

export interface BlogPostCardItem {
  category?: string
  categoryLink?: string
  title: string
  description: string
  link: string
  image?: string
  authorImage: string
  authorName: string
  date?: string | null
}

export interface MenuNodeItem {
  id?: string | null
  title?: string | null
  nodeUri?: string | null
  newWindow?: string | null
  excerptText?: string | null
  children?: Array<MenuNodeItem> | null
}

export interface ProductCategoryCard {
  imageSrc: string
  name: string
  href: string
  imageAlt: string
}
