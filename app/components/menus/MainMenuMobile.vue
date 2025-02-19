<script lang="ts" setup>
import { ref } from '#imports'
import type { MenuNodeItem } from '#shared/types'
import { withLeadingSlash } from 'ufo'

interface Props {
  currentDivision: string
  currentMenu: Array<MenuNodeItem>
}

const props = defineProps<Props>()

const openedMenus = ref<Array<string>>([])

function toggleMenu(id?: string | null): void {
  if (!id) return

  const index = openedMenus.value.indexOf(id)
  if (index === -1) {
    openedMenus.value.push(id)
  } else {
    openedMenus.value.splice(index, 1)
  }
}

function isMenuOpen(id?: string | null): boolean {
  if (!id) return false

  return openedMenus.value.includes(id)
}
</script>

<template>
  <div class="main-nav !block h-full w-full bg-gray-1 p-6">
    <div class="mb-4 text-lg font-normal text-neutral-text-gray">
      {{ props.currentDivision }}
    </div>
    <ul class="!mx-0 flex-col !items-start">
      <li
        v-for="(node, index) in props.currentMenu"
        :key="index"
        :class="node.children ? 'has-children' : ''"
      >
        <div class="flex flex-row items-center justify-between">
          <NuxtLink
            class="my-4 block text-lg !font-light !text-primary"
            :to="withLeadingSlash(node.nodeUri ?? '')"
            >{{ node.title }}</NuxtLink
          >
          <NuxtImg
            v-if="node.children?.length != 0"
            :class="{
              'rotate-180': isMenuOpen(node.id),
            }"
            class="h-5 w-5 transform cursor-pointer transition-transform duration-200"
            alt="Chevron"
            src="/svg/mainnav-chevron-blue.svg"
            @click="toggleMenu(node.id)"
          />
        </div>
        <ul v-show="node.children && isMenuOpen(node.id)" class="z-10">
          <li v-for="(item, cIndex) in node.children" :key="cIndex">
            <div class="flex flex-row items-center justify-between">
              <NuxtLink
                class="my-4 block text-base !font-light font-light text-gray-600 hover:text-gray-900"
                :href="withLeadingSlash(item.nodeUri ?? '')"
                :target="item?.newWindow ? '_blank' : '_self'"
                >{{ item.title }}</NuxtLink
              >
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
