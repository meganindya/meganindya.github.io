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

    <div id="profile-resume">
      <a href="/assets/resume-anindya-kundu-nov-2022.pdf" target="_blank">
        <p>
          <span>View Résumé</span>
        </p>
      </a>
    </div>

    <div id="profile-contributions">
      <canvas ref="contributionsElem"></canvas>
    </div>
  </article>
</template>

<!-- == STYLE ============================================================== -->

<style lang="scss">
#profile {
  > *:not(:first-child) {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--c-border-muted);
  }

  #profile-resume {
    display: grid;
    place-items: center;
    width: 100%;

    a {
      p {
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        background: var(--c-accent-emphasis);
        opacity: 0.625;
        transition: background-color 0.5s ease, opacity 0.5s ease;

        span {
          color: var(--c-bg-default);
        }

        &:hover {
          background-color: var(--c-accent-fg);
          opacity: 0.75;
        }
      }
    }
  }

  #profile-contributions {
    display: grid;
    place-items: center;
    width: 100%;

    canvas {
      width: 100%;
    }
  }
}
</style>
