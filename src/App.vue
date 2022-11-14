<!-- == SCRIPT ============================================================= -->

<script setup lang="ts">
import 'github-markdown-css';

import ProfileReadme from '@/components/ProfileReadme.vue';
import ProjectList from '@/components/ProjectList.vue';
</script>

<!-- == TEMPLATE =========================================================== -->

<template>
  <section id="profile">
    <ProfileReadme />
  </section>

  <section id="projects">
    <ProjectList />
  </section>
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
    padding: 0 2rem;
    font-weight: normal;

    a {
      text-decoration: none;
    }

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
    }

    @media only screen and (max-width: 891px) {
      > section {
        padding: 1.5rem 0;
      }
    }
  }
}
</style>
