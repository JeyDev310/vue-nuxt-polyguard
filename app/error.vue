<script setup lang="ts">
import type { NuxtError } from '#app'
import Footer from './components/layout/Footer.vue'
import Header from './components/layout/Header.vue'

interface Props {
  error: NuxtError
}

const props = defineProps<Props>()
</script>

<template>
  <NuxtLoadingIndicator
    color="repeating-linear-gradient(to right, #f6f6f6 0%, #348df2 100%)"
    error-color="#ce0d2e"
    :height="5"
  />
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <Header />
    <div>
      <main>
        <section class="bg-white dark:bg-gray-900">
          <div
            class="mx-auto flex min-h-[60vh] max-w-screen-xl flex-col justify-center px-4 py-8 align-middle lg:px-6 lg:py-16"
          >
            <div class="mx-auto max-w-screen-sm text-center">
              <h1
                class="text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl"
              >
                {{ props.error.statusCode }}
              </h1>
              <p
                class="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white"
              >
                {{ props.error.name }}
              </p>
              <p
                class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400"
              >
                {{ props.error.message }}
              </p>

              <NuxtError :error="props.error" />
              <NuxtLink
                href="/"
                class="hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 my-4 inline-flex rounded-full bg-primary px-8 py-2.5 text-center text-sm text-white focus:outline-none focus:ring-4"
                >Back to Homepage</NuxtLink
              >
            </div>
          </div>
        </section>
      </main>
    </div>
    <Footer />
  </NuxtLayout>
</template>
