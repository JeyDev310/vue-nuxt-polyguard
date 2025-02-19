<script setup lang="ts">
const technicalDetailsContent = [
  {
    title: 'Blandit accumsan',
    content:
      'Lorem ipsum dolor sit amet consectetur. Vitae lectus cursus suscipit eu porttitor tortor cras. Vitae porttitor ligula tempus platea. Aliquet ut aliquet id eu morbi semper.',
  },
  {
    title: 'Lorem ipsum dolor',
    content:
      'Posuere consectetur sociis lacus duis sed sed blandit accumsan. Sit eu non purus orci gravida nunc consectetur nulla. Semper at nulla egestas mattis vitae gravida. Id gravida velit elit fringilla. Pharetra netus ut est neque vivamus sit interdum elementum.',
  },
  {
    title: 'Terdum elementum',
    content:
      'Porttitor tortor cras. Vitae porttitor ligula tempus platea. Aliquet ut aliquet id eu morbi semper.',
  },
  {
    title: 'Lorem ipsum dolor',
    content:
      'Sit eu non purus orci gravida nunc consectetur nulla. Semper at nulla egestas mattis vitae gravida. Id gravida velit elit fringilla. Pharetra netus ut est neque vivamus sit interdum elementum.',
  },
  {
    title: 'Pharetra netus ut est neque vivamus',
    content: '46.1 cm (18.1 inches)',
  },
]
</script>

<template>
  <section id="Technical details" class="my-4">
    <MainContainer>
      <h2>Technical details</h2>
      <div class="mx-auto my-6 w-full">
        <div
          v-for="(item, index) in technicalDetailsContent"
          :key="index"
          :class="index % 2 === 0 ? 'bg-blue-100' : 'bg-white'"
          class="flex p-4"
        >
          <h3 class="mx-6 w-1/3 text-left text-lg font-bold">
            {{ item.title }}
          </h3>
          <p class="w-2/3 text-gray-700">{{ item.content }}</p>
        </div>
      </div>
    </MainContainer>
  </section>
</template>
