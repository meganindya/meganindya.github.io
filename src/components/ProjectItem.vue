<!-- == SCRIPT ============================================================= -->

<script setup lang="ts">
import { toRefs } from 'vue';

import ImageCarousel from '@/components/ImageCarousel.vue';

const props = defineProps({
  title: String,
  tech: Array<string>,
  desc: String,
  links: Array<string>
});

const { title, tech, desc, links } = toRefs(props);

function getBadgeURL(name: string) {
  function asURL() {
    let url = '';

    if (name.split('-').length > 0) {
      url += name.split('-').join('');
    }

    while (url.indexOf(' ') !== -1) {
      url = url.replace(/ /, '%20');
    }

    while (url.indexOf('+') !== -1) {
      url = url.replace(/\+/, '%2B');
    }

    return url;
  }

  return `https://img.shields.io/badge/-${asURL()}-000?&logo=${asURL()}`;
}
</script>

<!-- == TEMPLATE =========================================================== -->

<template>
  <div class="project-item markdown-body">
    <h2 v-html="title"></h2>

    <div class="project-item-badge-list">
      <template v-for="(name, i) in tech" :key="`tech-${i}`">
        <img :src="getBadgeURL(name)" :alt="name" />
      </template>
    </div>

    <p v-html="desc"></p>

    <template v-if="links!.length > 0">
      <ImageCarousel :images="links" />
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

  .project-item-badge-list {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;

    margin-bottom: 0.5rem;
  }
}
</style>
