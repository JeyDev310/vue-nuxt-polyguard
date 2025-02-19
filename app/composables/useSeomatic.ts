import type { Ref, ComputedRef } from 'vue'
import { computed } from '#imports'
import { z } from 'zod'

const MetaTagSchema = z.object({
  content: z.string(),
  hid: z.string(),
  name: z.string(),
})

type MetaTag = z.infer<typeof MetaTagSchema>

const SeomaticSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  excerptText: z.string().nullable().optional(),

  seomatic: z
    .object({
      metaJsonLdContainer: z.string().optional(),
      metaLinkContainer: z.string().optional(),
      metaScriptContainer: z.string().optional(),
      metaTagContainer: z.string().optional(),
      metaTitleContainer: z.string().optional(),
    })
    .optional(),
})

interface UseSeomatic {
  metaTitle: ComputedRef<string>
  metaDescription: ComputedRef<string>
  metaLinks: ComputedRef<string>
  metaTags: ComputedRef<MetaTag[]>
  metaJsonLd: ComputedRef<string>
  seomaticHeadData: ComputedRef<{
    title: string
    script: { type: string; children: string }[]
    meta: MetaTag[]
  }>
}

export function useSeomatic(entry: Ref): UseSeomatic {
  if (!entry.value) {
    return {
      metaTitle: computed(() => ''),
      metaDescription: computed(() => ''),
      metaLinks: computed(() => ''),
      metaTags: computed(() => []),
      metaJsonLd: computed(() => ''),
      seomaticHeadData: computed(() => ({
        title: '',
        script: [],
        meta: [],
      })),
    }
  }

  const parsedEntry = SeomaticSchema.parse(entry.value)

  const metaTitle = computed<string>(() => {
    try {
      return (
        JSON.parse(parsedEntry.seomatic?.metaTitleContainer ?? '{}')?.title
          ?.title ||
        parsedEntry.title ||
        ''
      )
    } catch {
      return ''
    }
  })

  const metaDescription = computed<string>(() => {
    try {
      return (
        metaTags.value.find((metaTag) => metaTag.name === 'description')
          ?.content ||
        parsedEntry.description ||
        parsedEntry.excerptText ||
        ''
      )
    } catch {
      return ''
    }
  })

  const metaJsonLd = computed<string>(() => {
    try {
      return JSON.parse(parsedEntry.seomatic?.metaJsonLdContainer ?? '{}')
    } catch {
      return ''
    }
  })

  const metaLinks = computed<string>(() => {
    try {
      return JSON.parse(parsedEntry.seomatic?.metaJsonLdContainer ?? '{}')
    } catch {
      return ''
    }
  })

  const metaTags = computed<MetaTag[]>(() => {
    try {
      const _metaTags = JSON.parse(
        parsedEntry.seomatic?.metaTagContainer ?? '{}',
      )
      return Object.entries(_metaTags)
        .filter(([key, value]) => key && value)
        .filter(
          ([_, value]) => typeof value === 'object' && !Array.isArray(value),
        )
        .map(([key, value]) => {
          const typedValue = value as { content: string }
          return MetaTagSchema.parse({
            hid: key,
            name: key,
            content: typedValue.content,
          })
        })
        .filter((meta) => meta.content !== undefined)
    } catch {
      return []
    }
  })

  const seomaticHeadData = computed<{
    title: string
    script: { type: string; children: string }[]
    meta: MetaTag[]
  }>(() => {
    return {
      title: metaTitle.value,
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(metaJsonLd.value),
        },
      ],
      meta: [...metaTags.value],
    }
  })

  return {
    metaTitle,
    metaDescription,
    metaLinks,
    metaTags,
    metaJsonLd,
    seomaticHeadData,
  }
}
