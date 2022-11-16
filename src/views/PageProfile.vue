<!-- == SCRIPT ============================================================= -->

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import { useStore } from '@/pinia';

import { getProfileHTML, drawContributions } from '@/utils';

const profileHTML = ref(getProfileHTML());

const contributionsElem = ref(null);

const store = useStore();

onMounted(() => {
  function drawCanvas() {
    const theme = store.getColorMode === 0 ? 'dark' : 'light';

    requestAnimationFrame(() =>
      drawContributions(contributionsElem.value! as HTMLCanvasElement, theme ? theme : 'light')
    );
  }

  drawCanvas();

  watch(
    () => store.colorMode,
    () => drawCanvas()
  );
});
</script>

<!-- == TEMPLATE =========================================================== -->

<template>
  <article id="profile">
    <template v-if="profileHTML !== undefined">
      <div class="markdown-body" v-html="profileHTML"></div>
    </template>

    <div id="profile-contributions">
      <canvas ref="contributionsElem"></canvas>
    </div>
  </article>
</template>

<!-- == STYLE ============================================================== -->

<style lang="scss">
#profile-contributions {
  display: grid;
  place-items: center;
  width: 100%;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid var(--c-border-muted);

  canvas {
    width: 100%;
  }
}
</style>
