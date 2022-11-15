<!-- == SCRIPT ============================================================= -->

<script setup lang="ts">
import { toRefs } from 'vue';

import ImageCarousel from '@/components/ImageCarousel.vue';

const props = defineProps({
  title: String,
  desc: String,
  images: Array<string>
});

const { title, desc, images } = toRefs(props);
</script>

<!-- == TEMPLATE =========================================================== -->

<template>
  <div class="project-item markdown-body">
    <h2 v-html="title"></h2>
    <p v-html="desc"></p>

    <template v-if="images!.length > 0">
      <ImageCarousel :images="images" />
    </template>
  </div>
</template>

<!-- == STYLE ============================================================== -->

<style lang="scss">
.project-item {
  width: 100%;
  padding: 1rem;

  border-radius: 8px;
  background-color: var(--c-bg-subtle);
}
</style>
