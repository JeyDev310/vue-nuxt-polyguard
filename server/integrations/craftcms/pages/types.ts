import type { assetType } from '~~/server/integrations/craftcms/singles/types'

export interface ProductCardType {
  id?: string | null
  typeHandle?: string
  title?: string | null
  description?: string | null
  slug?: string | null
  uri?: string | null
  productTypeHandle?: string | null
  defaultPrice?: number | null
  defaultPriceAsCurrency?: string | null
  productFeaturedImage: Array<assetType>
  cardLink?: string | null
  sku?: string
  productBrand?: Array<{
    title?: string | null
    url?: string | null
  }>
  variants?:
    | Array<{
        title?: string | null
        id?: string | null
        isDefault: boolean | null
      }>
    | undefined
}
