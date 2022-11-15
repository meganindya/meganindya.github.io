<!-- == SCRIPT ============================================================= -->

<script setup lang="ts">
import { ref } from 'vue';

import { getHighlightHTML } from '@/utils';

const highlightHTML = ref(getHighlightHTML());
</script>

<!-- == TEMPLATE =========================================================== -->

<template>
  <article id="highlight" class="markdown-body" v-html="highlightHTML"></article>
</template>

<!-- == STYLE ============================================================== -->

<style lang="scss">
#highlight {
  p {
    text-align: justify;

    img {
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
