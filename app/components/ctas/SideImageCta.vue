<script setup lang="ts"></script>

<template>
  <div class="mb-6 overflow-hidden rounded-3xl bg-[#348EF2]">
    <div class="relative px-3 pt-12 text-left sm:px-12 sm:pb-12">
      <div
        class="absolute right-0 top-0 z-0 hidden h-full overflow-hidden sm:block"
      >
        <NuxtImg
          class="h-full w-[400px] opacity-50"
          src="/images/Arhcitectual-cta.png"
          alt=""
        />
        <div
          class="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-[#348EF2] to-transparent"
        ></div>
      </div>
      <div class="z-10">
        <div
          class="relative max-w-2xl font-montserrat text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        >
          Lorem ipsum dolor sit.
        </div>
        <div
          class="relative mt-8 max-w-xl font-inter text-lg leading-8 text-white"
        >
          Pellentesque pharetra facilisis odio donec.
        </div>
        <p class="prose relative mt-3 max-w-xl text-base font-light text-white">
          Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim
          id veniam aliqua proident excepteur commodo do ea.
        </p>
        <div class="relative mt-5 flex items-center gap-x-6">
          <NuxtLink
            to="#"
            class="flex w-full items-center justify-center rounded-full bg-white px-3.5 py-2.5 text-sm font-semibold text-[#348EF2] no-underline shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
            >Call to action</NuxtLink
          >
        </div>
      </div>
    </div>

    <div class="relative h-[297px] overflow-hidden sm:hidden">
      <NuxtImg
        class="absolute left-0 top-0 h-full w-full"
        src="/images/Arhcitectual-cta.png"
        alt=""
      />
      <div
        class="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-[#348EF2] to-transparent"
      ></div>
    </div>
  </div>
</template>
