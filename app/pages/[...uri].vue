<script setup lang="ts">
import { withLeadingSlash, withoutTrailingSlash } from 'ufo'
import {
  navigateTo,
  ref,
  useFetch,
  useHead,
  useRoute,
  useSeomatic,
} from '#imports'
import type { RetourRedirect } from '~~/server/integrations/craftcms/routes/types'
import PageByEntryType from '~/components/pages/PageByEntryType.vue'

const route = useRoute()

const uri = Array.isArray(route.params.uri)
  ? route.params.uri.join('/')
  : route.params.uri

const foundRedirect = ref<RetourRedirect | null>(null)

const { data: pageEntry } = await useFetch('/api/v1/pages', {
  method: 'POST',
  body: {
    uri,
  },
})

if (!pageEntry.value) {
  await navigateTo('/404')
}

if (!pageEntry.value) {
  const fromPath = withLeadingSlash(
    withoutTrailingSlash(decodeURIComponent(route.fullPath)),
  )
  console.log('fromPath', fromPath)

  await findRedirect(fromPath)
  console.log('foundRedirect', foundRedirect.value)

  if (!foundRedirect.value) {
    await navigateTo('/404', { redirectCode: 404, replace: true })
  } else {
    await navigateTo(foundRedirect.value.to, {
      redirectCode: foundRedirect.value.status || 301,
      replace: true,
    })
  }
}

async function findRedirect(path: string): Promise<void> {
  try {
    foundRedirect.value = await $fetch('/api/v1/routes/find-redirect', {
      method: 'POST',
      body: {
        route: path,
      },
    })
  } catch (error) {
    console.log('[...uri].vue - findRedirect() - error', error)
  }
}

const { seomaticHeadData } = useSeomatic(pageEntry)
useHead(seomaticHeadData)
</script>

<template>
  <PageByEntryType :entry="pageEntry" />
</template>
