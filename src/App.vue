<!-- == SCRIPT ============================================================= -->

<script setup lang="ts">
import 'github-markdown-css';

import { ref, watch } from 'vue';

import Throbber from '@/components/ThrobberItem.vue';
import ProfileReadme from '@/components/ProfileReadme.vue';
import ProjectList from '@/components/ProjectList.vue';

const ready = ref(false);
const readyCount = ref(0);

watch(readyCount, (value) => {
  if (value === 2) setTimeout(() => (ready.value = true), 0);
});
</script>

<!-- == TEMPLATE =========================================================== -->

<template>
  <template v-if="!ready">
    <div id="throbber-wrapper">
      <Throbber />
    </div>
  </template>

  <main v-show="ready">
    <section id="profile">
      <ProfileReadme @ready="readyCount++" />
    </section>

    <section id="projects">
      <ProjectList @ready="readyCount++" />
    </section>
  </main>
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
      padding: 0 2rem;

      > section {
        position: relative;
        margin-top: 6rem;
        padding: 2rem 0;

        &:first-child {
          margin-top: 0;
        }

        &::before {
          position: absolute;
        }

        @media only screen and (max-width: 891px) {
          padding: 1.5rem 0;
        }
      }
    }
  }
}
</style>