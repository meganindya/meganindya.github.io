<!-- == SCRIPT ============================================================= -->

<script setup lang="ts">
import 'github-markdown-css';

import { ref } from 'vue';

import { init } from './utils';

import Throbber from '@/components/ThrobberItem.vue';

const ready = ref(false);

(async () => {
  await init();
  setTimeout(() => (ready.value = true), 100);
})();
</script>

<!-- == TEMPLATE =========================================================== -->

<template>
  <template v-if="!ready">
    <div id="throbber-wrapper">
      <Throbber />
    </div>
  </template>

  <template v-else>
    <nav></nav>

    <main>
      <RouterView />
    </main>

    <footer></footer>
  </template>
</template>

<!-- == STYLE ============================================================== -->

<style lang="scss">
@import '@/scss/colors.scss';

*,
*::before,
*::after {
  box-sizing: border-box;
  position: relative;
  font-weight: normal;
}

body {
  min-height: 100vh;
  margin: 0;

  line-height: 1.6;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: var(--c-fg-default);
  background-color: var(--c-bg-default);
  //   transition: color 0.5s, background-color 0.5s;

  #app {
    width: 100%;
    max-width: 892px;
    margin: 0 auto;
    font-weight: normal;

    #throbber-wrapper {
      display: grid;
      place-items: center;
      height: 100vh;
    }

    a {
      text-decoration: none;
    }

    main {
      padding: 2rem;

      @media only screen and (max-width: 891px) {
        padding: 1.5rem 1rem;
      }
    }
  }
}
</style>
