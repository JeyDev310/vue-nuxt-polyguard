<script setup lang="ts">
interface SidebarLinks {
  attributes: {
    href: string | null | undefined
  }
  label: string | null | undefined
  active: boolean
}
interface Props {
  sidebarTitle?: string | null
  sidebarLinks?: SidebarLinks[] | null
}
const props = withDefaults(defineProps<Props>(), {
  sidebarTitle: '',
  sidebarLinks: () => [],
})
</script>

<template>
  <div>
    <div class="my-16 px-6 lg:my-24">
      <div class="mx-auto max-w-container">
        <div class="flex flex-col gap-y-20">
          <div>
            <div
              class="flex flex-col space-y-10 md:flex-row md:justify-between md:space-y-0"
            >
              <!-- Sidebar -->
              <div class="w-full md:w-3/12">
                <slot name="sidebar">
                  <div
                    v-if="props?.sidebarTitle"
                    class="font-heading font-bold text-tertiary-darkest"
                  >
                    {{ props?.sidebarTitle }}
                  </div>

                  <hr
                    v-if="props?.sidebarTitle"
                    class="mb-4 mt-3 w-full border-t-2 border-tertiary-light/30"
                  />

                  <ul
                    v-if="props?.sidebarLinks"
                    class="generic-sidebar-list space-y-3.5"
                  >
                    <li
                      v-for="(link, index) in props?.sidebarLinks"
                      :key="link?.label || index"
                      :class="{
                        'generic-sidebar-list__link': true,
                        'generic-sidebar-list__link--current': link?.active,
                      }"
                    >
                      <NuxtLink :to="link?.attributes.href || undefined">
                        {{ link?.label }}
                      </NuxtLink>
                    </li>
                  </ul>
                </slot>
              </div>

              <!-- Main Content -->
              <div class="w-full md:w-8/12">
                <section>
                  <slot name="innerContent">
                    <!-- Default content slot -->
                  </slot>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
