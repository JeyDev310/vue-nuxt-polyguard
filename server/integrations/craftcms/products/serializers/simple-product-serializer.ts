import type { GetSimpleProductProductQuery } from '~~/server/codegen'

export function serializeSimpleProductResponse(
  response: GetSimpleProductProductQuery,
) {
  if (!response?.product) {
    return null
  }

  if (response.product.__typename !== 'simpleProduct_Product') {
    return null
  }

  return {
    ...response.product,
    productFeaturesBenefits: (response.product.productFeaturesBenefits || [])
      .filter((pfb) => pfb !== null && pfb !== undefined)
      .filter((pfb) => pfb.__typename === 'blocksFeatureIcon_Entry')
      .map((pfb) => ({
        ...pfb,
        icon: (pfb.featureIcon || [])
          .filter((i) => i !== null && i !== undefined)
          .filter((i) => i.__typename === 'media_Asset'),
      })),
    featuredProductResources: (response.product.featuredProductResources || [])
      .filter((fpr) => fpr !== null && fpr !== undefined)
      .filter(
        (fpr) =>
          fpr.__typename === 'resourcesFileDownload_Entry' ||
          fpr.__typename === 'resourcesPageLink_Entry',
      )
      .map((fpr) => {
        if (fpr.__typename === 'resourcesFileDownload_Entry') {
          return {
            ...fpr,
            resourceAssets: (fpr.resourceAssets || [])
              .filter((ra) => ra !== null && ra !== undefined)
              .filter((ra) => ra.__typename === 'resources_Asset'),
          }
        } else {
          return {
            ...fpr,
            resourceLink: (fpr.resourceLink || []).filter(
              (rl) => rl !== null && rl !== undefined,
            ),
          }
        }
      }),
    productDetails: (response.product.productDetails || [])
      .filter((pd) => pd !== null && pd !== undefined)
      .filter(
        (pd) =>
          pd.__typename === 'productDetailsResources_Entry' ||
          pd.__typename === 'productDetailsRichText_Entry',
      )
      .map((pd) => {
        if (pd.__typename === 'productDetailsRichText_Entry') {
          return pd
        } else {
          return {
            ...pd,
            featuredResources: (pd.featuredResources || [])
              .filter((fr) => fr !== null && fr !== undefined)
              .filter((fr) => fr.__typename === 'resourcesFileDownload_Entry')
              .map((fr) => ({
                ...fr,
                resourceAssets: (fr.resourceAssets || [])
                  .filter((ra) => ra !== null && ra !== undefined)
                  .filter((ra) => ra.__typename === 'resources_Asset'),
              })),
          }
        }
      }),
    commerceCompanionProducts: (
      response.product.commerceCompanionProducts || []
    )
      .filter((cn) => cn !== null && cn !== undefined)
      .filter((cn) => cn.__typename === 'simpleProduct_Product')
      .map((cn) => ({
        ...cn,
        productFeaturedImage: (cn.productFeaturedImage || [])
          .filter((pfi) => pfi !== null && pfi !== undefined)
          .filter((pfi) => pfi.__typename === 'products_Asset')
          .map((pfi) => ({
            ...pfi,
            imageTransforms: (pfi.imageTransforms || [])
              .filter((pfit) => pfit !== null && pfit !== undefined)
              .filter((pfit) => pfit.__typename === 'imagerx'),
          })),
      })),
  }
}
