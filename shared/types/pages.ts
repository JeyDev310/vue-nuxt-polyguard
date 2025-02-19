import type { InternalApi } from 'nitropack'

export type {
  PageSectionsCtas2ColumnsBannerFieldsFragment,
  PageSectionsLatestCaseStudiesFieldsFragment,
  PageSectionsCtasSimpleBannerFieldsFragment,
  PageSectionsResponsiveImageBannerFieldsFragment,
  PageSectionsFaqsFieldsFragment,
  PageSectionsCtasEdgeImageFieldsFragment,
  PageSectionsFeaturedCaseStudyFieldsFragment,
  PageSectionsProductListFieldsFragment,
  PageSectionsAlternateContentFieldsFragment,
  PageSectionsOembedVideoFieldsFragment,
  PageSectionsFeaturedPagesFieldsFragment,
  PageSectionsExistingContentModuleFieldsFragment,
  PageSectionsDividerFieldsFragment,
  PageSectionsFormieFormFieldsFragment,
  PageSectionsVideoGridFieldsFragment,
  PageSectionsFeaturedResourcesFieldsFragment,
  PageSectionsImageFieldsFragment,
  PageSectionsRichTextFieldsFragment,
  PageSectionsFeaturedCardsFieldsFragment,
  PageSectionsCtas2ColumnsFieldsFragment,
  PageSectionsLatestNewsFieldsFragment,
  PageSectionsJumpLinkTargetFieldsFragment,
  PageSectionsFormosanMapFieldsFragment,
} from '~~/server/codegen'

// Type utility to extract the specific entry type
export type ExtractEntryType<T, TTypeName extends string> = T extends {
  __typename: TTypeName
}
  ? T
  : never

export type PageEntry = InternalApi['/api/v1/pages']['post']

export type PagesChannelListingEntry = ExtractEntryType<
  PageEntry,
  'pagesChannelListing_Entry'
>
export type PagesContentPageEntry = ExtractEntryType<
  PageEntry,
  'pagesContentPage_Entry'
>
export type PagesFaqListingEntry = ExtractEntryType<
  PageEntry,
  'pagesFaqListing_Entry'
>
export type PagesLandingPageEntry = ExtractEntryType<
  PageEntry,
  'pagesLandingPage_Entry'
>
export type PagesProductListingEntry = ExtractEntryType<
  PageEntry,
  'pagesProductListing_Entry'
>
export type PagesResourceListingEntry = ExtractEntryType<
  PageEntry,
  'pagesResourceListing_Entry'
>

export type ProductCategoryEntry =
  InternalApi['/api/v1/categories/product-category']['post']

export type ProductCategoriesCatalogPageEntry = ExtractEntryType<
  ProductCategoryEntry,
  'productCategoriesCatalogPage_Entry'
>
export type ProductCategoriesCatalogListingEntry = ExtractEntryType<
  ProductCategoryEntry,
  'productCategoriesCatalogListing_Entry'
>

export type StandardContentBuilderBlockEntry =
  | PageSectionsCtas2ColumnsBannerFieldsFragment
  | PageSectionsLatestCaseStudiesFieldsFragment
  | PageSectionsCtasSimpleBannerFieldsFragment
  | PageSectionsResponsiveImageBannerFieldsFragment
  | PageSectionsFaqsFieldsFragment
  | PageSectionsCtasEdgeImageFieldsFragment
  | PageSectionsFeaturedCaseStudyFieldsFragment
  | PageSectionsProductListFieldsFragment
  | PageSectionsAlternateContentFieldsFragment
  | PageSectionsOembedVideoFieldsFragment
  | PageSectionsFeaturedPagesFieldsFragment
  | PageSectionsExistingContentModuleFieldsFragment
  | PageSectionsDividerFieldsFragment
  | PageSectionsFormieFormFieldsFragment
  | PageSectionsVideoGridFieldsFragment
  | PageSectionsFeaturedResourcesFieldsFragment
  | PageSectionsImageFieldsFragment
  | PageSectionsRichTextFieldsFragment
  | PageSectionsFeaturedCardsFieldsFragment
  | PageSectionsCtas2ColumnsFieldsFragment
  | PageSectionsLatestNewsFieldsFragment
  | PageSectionsJumpLinkTargetFieldsFragment
  | PageSectionsFormosanMapFieldsFragment
