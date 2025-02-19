<script setup lang="ts">
import { useFetch, useHead, useSeomatic } from '#imports'
import PageByEntryType from '~/components/pages/PageByEntryType.vue'

const { data: pageEntry } = await useFetch('/api/v1/pages', {
  method: 'POST',
  body: {
    uri: 'products',
  },
})

const { seomaticHeadData } = useSeomatic(pageEntry)
useHead(seomaticHeadData)
</script>

<template>
  <PageByEntryType :entry="pageEntry" />
</template>
