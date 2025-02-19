<script setup lang="ts">
import type {
  CaseStudyCategoriesDefault_Entry,
  Media_Asset,
} from '~~/server/codegen'

interface Props {
  title?: string | null
  excerpt?: string | null
  url?: string | null
  image?: Media_Asset | null | undefined
  linkText?: string | null
  category?: CaseStudyCategoriesDefault_Entry | null
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
  except: '',
  url: '',
  excerpt: '',
  image: undefined,
  category: undefined,
  linkText: '',
})
</script>

<template>
  <div class="article-card">
    <figure v-if="image" class="article-card__figure">
      <NuxtImg
        class="lazyload lazyload-fade h-[270px] w-full object-cover"
        :src="props.image?.url || undefined"
        :srcset="props.image?.srcset"
        :width="500"
        :height="270"
        :alt="props.image?.alt || props.image?.title || undefined"
        loading="lazy"
      />
    </figure>

    <div class="article-card__body">
      <div class="article-card__copywrap">
        <div class="space-y-1">
          <ul
            v-if="props.category"
            class="flex items-center font-heading text-xs font-medium"
          >
            <li
              class="flex items-center after:mx-2 after:block after:h-1 after:w-1 after:rounded-full after:bg-primary after:content-[''] last:after:hidden"
            >
              <NuxtLink
                v-if="props.category.slug"
                :to="`/blog/category/${props.category.slug}`"
              >
                {{ props.category.title }}
              </NuxtLink>
            </li>
          </ul>

          <NuxtLink
            :to="props.url || undefined"
            :title="props.title"
            class="block"
          >
            <h4 class="article-card__primarytext">{{ props.title }}</h4>
          </NuxtLink>
        </div>

        <NuxtLink
          v-if="props.excerpt"
          :to="props.url || undefined"
          :title="props.title"
          class="block"
        >
          <p v-html="props.excerpt"></p>
        </NuxtLink>
      </div>

      <NuxtLink
        :to="props.url || undefined"
        :title="props.title"
        class="article-card__morewrap"
      >
        <div class="more-link translate-x-[3px] transform">
          <div>{{ props.linkText }}</div>
          <svg
            width="14"
            height="9"
            class="transition-transform duration-200 ease-in-out"
            viewBox="0 0 14 9"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.84314575,0 L13.767767,3.9375 C14.077411,4.24816017 14.077411,4.75183983 13.767767,5.0625 L9.84314575,9 L8.72182541,7.875 L11.292,5.295 L0,5.29549513 L0,3.70450487 L11.292,3.704 L8.72182541,1.125 L9.84314575,0 Z"
              transform="translate(-617.000000, -2504.000000) translate(541.000000, 2144.000000) translate(0.000000, 357.000000) translate(76.000000, 3.000000)"
              fill="#111214"
              fill-rule="evenodd"
            />
          </svg>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
