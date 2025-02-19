<script setup lang="ts">
interface Props {
  bigFont?: boolean
  videoAssetId: number | string
  thumbnail: Record<string, unknown>
  title: string
  embeddedAsset?: {
    title?: string | null
    images?: Array<string | null> | null
    iframeSrc?: string | null
  } | null
}

const props = withDefaults(defineProps<Props>(), {
  bigFont: false,
  thumbnail: () => ({}),
  embeddedAsset: undefined,
})

const queryParams = {
  modestbranding: 1,
  controls: 0,
  playsinline: 1,
  showinfo: 0,
  rel: 0,
  iv_load_policy: 3,
  enablejsapi: 1,
  aspect_ratio: 1.54,
}

const getIframeCode = computed(() =>
  buildIframeSrc(props.embeddedAsset?.iframeSrc ?? '', queryParams),
)

function buildIframeSrc(baseSrc: string, params: object) {
  const url = new URL(baseSrc)
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })
  return url.toString()
}
</script>

<template>
  <div
    class="video-card oembed--control-lg oembed--controls-hide block w-full space-y-3 sm:cursor-pointer"
  >
    <div class="relative block aspect-[1.54] overflow-hidden rounded-lg">
      <div
        class="oembed--video__videowrap absolute inset-0 m-auto h-full w-full"
      >
        <div class="plyr__video-embed" data-plyr-video>
          <iframe
            :src="getIframeCode"
            :title="props.embeddedAsset?.title ?? ''"
            frameborder="0"
            allowfullscreen
            allow="autoplay"
            allowtransparency
            loading="lazy"
          ></iframe>
        </div>
        <!-- Custom Video thumbnail -->
        <div class="oembed__customthumbnail">
          <img
            v-if="props.thumbnail?.url"
            :data-src="props.thumbnail?.url"
            class="lazyload lazyload-fade h-full w-full object-cover"
            alt=""
          />
          <img
            v-else
            :data-src="props.embeddedAsset?.images?.[0] ?? ''"
            :src="props.embeddedAsset?.images?.[0] ?? ''"
            class="lazyload lazyload-fade h-full w-full object-cover"
            alt=""
          />
          <!-- Overlay -->
          <div class="oembed__customthumbnail-overlay" />
          <!-- Title/Control -->
          <div
            class="absolute bottom-3 left-3 line-clamp-2 text-white"
            :class="{ 'md:bottom-9 md:left-6 md:text-2xl': props.bigFont }"
          >
            {{ props.title }}
          </div>
          <div
            class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center space-x-2"
          >
            <div class="text-primary">
              <svg
                width="56"
                height="56"
                class="fill-current"
                viewBox="0 0 56 56"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  transform="translate(-404.000000, -1635.000000) translate(344.000000, 1416.000000) translate(60.000000, 219.000000)"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <circle fill="currentColor" cx="28" cy="28" r="28" />
                  <path
                    fill="#FFF"
                    transform="translate(29.000000, 28.500000) rotate(-270.000000) translate(-29.000000, -28.500000)"
                    d="M29 22.5 36.5 34.5 21.5 34.5z"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
        <!-- End Custom Video thumbnail -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.oembed {
  @apply block w-full space-y-3 sm:cursor-pointer;

  /* Title */
  &__title {
    @apply text-sm sm:hidden;
  }

  /* Custom video thumbnail */
  &__customthumbnail {
    @apply pointer-events-none absolute inset-0 h-full w-full transition-all duration-500;

    &-overlay {
      @apply absolute inset-0 h-full w-full bg-gradient-to-tr from-black opacity-75;
    }
  }

  /* Hide all controls when player is stopped */
  &--controls-hide {
    /* Big center control */
    .plyr--full-ui.plyr--video.plyr--stopped .plyr__control--overlaid {
      @apply opacity-0;
    }

    .plyr--full-ui.plyr--video.plyr--stopped .plyr__controls {
      @apply translate-y-full;
    }
  }

  /* This is added when Custom Video thumbnail is defined */
  [data-plyr-video].plyr--playing ~ .oembed__customthumbnail,
  [data-plyr-video].plyr--paused:not(.plyr--stopped),
  ~ .oembed__customthumbnail {
    @apply invisible opacity-0;
  }
}
.video-card {
  .plyr__video-embed {
    aspect-ratio: 1.54 !important;
  }
}
</style>
