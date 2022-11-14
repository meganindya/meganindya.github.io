<!-- == SCRIPT ============================================================= -->

<script setup lang="ts">
import ProfileReadme from '@/components/ProfileReadme.vue';
</script>

<!-- == TEMPLATE =========================================================== -->

<template>
  <section id="profile">
    <ProfileReadme />
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

  color: var(--color-text);
  background-color: var(--color-background);
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
      padding: 2rem 0;
    }

    @media only screen and (max-width: 891px) {
      > section {
        padding: 1.5rem 0;
      }
    }
  }
}
</style>
