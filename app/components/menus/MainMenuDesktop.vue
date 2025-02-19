<script lang="ts" setup>
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/vue'
import { withLeadingSlash } from 'ufo'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/20/solid'
import { ref } from '#imports'
import type { MenuNodeItem } from '#shared/types'

interface Props {
  mainMenu: Array<MenuNodeItem>
}

const props = defineProps<Props>()

const isPopoverOpen = ref(false)

function openPopover(event: MouseEvent, isOpened: boolean) {
  if (isOpened) {
    return
  }

  const _target = event.target
  if (_target instanceof HTMLElement && !isOpened) {
    _target.click()
  }
}

function closePopover() {
  isPopoverOpen.value = false
}

function hasChildren(node?: MenuNodeItem | null): boolean {
  if (!node) {
    return false
  }

  return Array.isArray(node.children) && node.children?.length > 0
}
</script>

<template>
  <nav
    class="z-20 flex items-center justify-between space-x-8"
    aria-label="Global"
  >
    <PopoverGroup class="hidden lg:flex lg:gap-x-12">
      <ul class="-ml-5 -mr-5 flex items-center">
        <li
          v-for="(item, index) in props.mainMenu"
          :key="index"
          class="ml-5 mr-5 flex items-center hover:text-primary"
        >
          <NuxtLink
            v-if="item.children?.length === 0"
            class="pb-3 pt-3 font-sans text-sm font-normal"
            :href="withLeadingSlash(item.nodeUri ?? '')"
            :target="item.newWindow ? '_blank' : '_self'"
            >{{ item.title }}</NuxtLink
          >
          <div v-else-if="item.children?.length ?? 0 > 0">
            <div v-if="item.children && hasChildren(item.children?.[0])">
              <Popover v-slot="{ open, close }">
                <PopoverButton
                  :href="withLeadingSlash(item.nodeUri ?? '')"
                  class="mr-1 flex items-center pb-3 pt-3 font-sans text-sm font-normal focus:outline-none"
                  :target="item.newWindow ? '_blank' : '_self'"
                  @mouseenter="(e) => openPopover(e, open)"
                >
                  {{ item.title }}

                  <ChevronUpIcon
                    v-if="open"
                    class="h-5 w-5 flex-none"
                    aria-hidden="true"
                  />

                  <ChevronDownIcon
                    v-else
                    class="h-5 w-5 flex-none"
                    aria-hidden="true"
                  />
                </PopoverButton>

                <Transition
                  enter-active-class="transition ease-out duration-200"
                  enter-from-class="opacity-0 -translate-y-1"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition ease-in duration-200"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 -translate-y-1"
                >
                  <PopoverPanel
                    class="nav-ribbon-wrapper absolute left-0 w-full origin-top-left transform bg-white px-6 shadow-[0px_12px_10px_2px_rgba(0,0,0,0.3)]"
                    @mouseleave="() => close()"
                  >
                    <div
                      class="mx-auto my-[56px] flex h-full w-full max-w-container-header flex-wrap gap-[69px]"
                    >
                      <div
                        v-for="(cItem, cIndex) in item.children"
                        :key="cIndex"
                        class="space-y-[22px]"
                      >
                        <NuxtLink
                          v-if="cItem.nodeUri"
                          :href="withLeadingSlash(cItem.nodeUri ?? '')"
                          :target="cItem.newWindow ? '_blank' : '_self'"
                          class="text-lg font-semibold text-black hover:underline"
                          >{{ cItem.title }}</NuxtLink
                        >
                        <span v-else class="text-lg font-semibold">
                          {{ cItem.title }}
                        </span>
                        <div
                          class="flex flex-wrap justify-between gap-[10px] text-xs"
                        >
                          <NuxtLink
                            v-for="(child, childIndex) in cItem.children"
                            :key="childIndex"
                            :to="withLeadingSlash(child?.nodeUri ?? '')"
                            :target="child?.newWindow ? '_blank' : '_self'"
                            class="group w-[197px] space-y-[8px]"
                          >
                            <div
                              class="font-semibold text-primary group-hover:underline"
                            >
                              {{ child?.title }}
                            </div>
                            <div v-if="child?.excerptText" class="text-black">
                              {{ child?.excerptText }}
                            </div>
                          </NuxtLink>
                        </div>
                      </div>
                    </div>
                  </PopoverPanel>
                </Transition>
              </Popover>
            </div>
            <Popover v-else v-slot="{ open, close }">
              <PopoverButton
                class="flex items-center justify-center font-sans font-normal focus:outline-none"
                @mouseenter="(e) => openPopover(e, open)"
                @mouseleave="() => closePopover()"
              >
                <NuxtLink
                  :to="withLeadingSlash(item.nodeUri ?? '')"
                  :target="item.newWindow ? '_blank' : '_self'"
                  class="mr-1 pb-3 pt-3 font-sans text-sm font-normal"
                >
                  {{ item.title }}
                </NuxtLink>

                <ChevronUpIcon
                  v-if="open"
                  class="h-5 w-5 flex-none"
                  aria-hidden="true"
                />

                <ChevronDownIcon
                  v-else
                  class="h-5 w-5 flex-none"
                  aria-hidden="true"
                />
              </PopoverButton>

              <Transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 -translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-200"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-1"
              >
                <PopoverPanel @mouseleave="() => close()">
                  <ul
                    class="absolute min-w-[13rem] origin-top-left bg-white bg-opacity-100 py-2 leading-5 text-[#2A2B2E] text-opacity-100 shadow-[0px_12px_10px_2px_rgba(0,0,0,0.3)]"
                  >
                    <li
                      v-for="(cItem, cIndex) in item.children"
                      :key="cIndex"
                      class="px-4 py-2"
                    >
                      <NuxtLink
                        :to="withLeadingSlash(cItem.nodeUri ?? '')"
                        :target="cItem?.newWindow ? '_blank' : '_self'"
                        class="text-sm hover:text-primary"
                      >
                        {{ cItem.title }}
                      </NuxtLink>
                    </li>
                  </ul>
                </PopoverPanel>
              </Transition>
            </Popover>
          </div>
        </li>
      </ul>
    </PopoverGroup>
  </nav>
</template>
