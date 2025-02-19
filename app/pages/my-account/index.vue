<script lang="ts" setup>
import { type BreadcrumbItem, definePageMeta } from '#imports'

import CustomerAccountInformation from '~/components/customer/AccountInformation.vue'
import MyAccountSidebar from '~/components/customer/MyAccountSidebar.vue'
import MainContainer from '~/components/layout/MainContainer.vue'
import BreadcrumbsSection from '~/components/common/BreadcrumbsSection.vue'

definePageMeta({
  middleware: ['customers-only'],
})

const breadcrumbs: Array<BreadcrumbItem> = [
  {
    name: 'Home',
    href: '/',
    current: false,
  },
  {
    name: 'My Account',
    href: '/my-account',
    current: true,
  },
]
</script>

<template>
  <main class="pt-32 lg:pt-40">
    <BreadcrumbsSection :breadcrumbs="breadcrumbs" />
    <MainContainer>
      <div class="flex min-h-[70vh] flex-col md:flex-row">
        <div
          class="w-full bg-gradient-to-r from-white to-gray-200 py-28 pl-10 pr-5 md:w-1/4"
        >
          <MyAccountSidebar />
        </div>
        <div
          class="flex w-full items-start justify-center bg-white px-10 py-28 md:w-3/4"
        >
          <ClientOnly>
            <CustomerAccountInformation />
          </ClientOnly>
        </div>
      </div>
    </MainContainer>
  </main>
</template>
