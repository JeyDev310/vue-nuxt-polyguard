<script lang="ts" setup>
import MainContainer from '~/components/layout/MainContainer.vue'
</script>

<template>
  <div class="border-b border-gray-200 bg-white py-14">
    <MainContainer>
      <form
        action="/search"
        method="get"
        class="mx-auto max-w-information-container-header"
      >
        <div class="relative flex items-center space-x-3">
          <div class="relative flex flex-1">
            <input
              id="header-search-input"
              name="query"
              aria-label="Search"
              type="search"
              placeholder="Start typing..."
              class="font-regular h-12 w-full rounded-full border-0 bg-gray-1 px-8 py-3 text-base font-light text-black placeholder-tertiary focus:border-white focus:ring-0"
            />
            <button
              type="submit"
              class="absolute right-0 top-0 h-12 w-48 rounded-full bg-primary font-newNavMenu text-base font-normal text-white"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </MainContainer>
  </div>
</template>
