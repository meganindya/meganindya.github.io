<!-- == SCRIPT ============================================================= -->

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { getHighlightHTML } from '@/utils';

const highlightHTML = ref(getHighlightHTML());

const articleRef = ref(null);

onMounted(() => {
  ([...(articleRef.value! as HTMLElement).querySelectorAll('a')] as HTMLAnchorElement[]).forEach(
    (element) => (element.target = '_blank')
  );
});
</script>

<!-- == TEMPLATE =========================================================== -->

<template>
  <article id="highlight" class="markdown-body" v-html="highlightHTML" ref="articleRef"></article>
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
