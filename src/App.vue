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
    <nav>
      <div id="nav-main" class="container">
        <div id="nav-left">
          <ul id="nav-links">
            <li class="nav-link">
              <a href="/" :class="$route.name === 'profile' ? 'active' : ''">Profile</a>
            </li>
            <li class="nav-link">
              <a href="/projects" :class="$route.name === 'projects' ? 'active' : ''">Projects</a>
            </li>
          </ul>
        </div>

        <div id="nav-right"></div>
      </div>
    </nav>

    <main class="container">
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
    position: relative;
    width: 100%;
    font-weight: normal;

    .container {
      width: 100%;
      max-width: 892px;
      margin: 0 auto;
      padding-right: 2rem;
      padding-left: 2rem;

      @media only screen and (max-width: 891px) {
        padding-right: 1rem;
        padding-left: 1rem;
      }
    }

    #throbber-wrapper {
      display: grid;
      place-items: center;
      height: 100vh;
    }

    a {
      text-decoration: none;
    }

    > * {
      width: 100%;
    }

    nav {
      position: sticky;
      top: 0;
      z-index: 999;

      border-bottom: 1px solid var(--c-border-muted);

      background-color: rgba(var(--c-bg-default), 0.9);
      @supports (backdrop-filter: blur(16px)) or (-webkit-backdrop-filter: blur(16px)) {
        -webkit-backdrop-filter: blur(16px);
        backdrop-filter: blur(16px);
        background-color: rgba(var(--c-bg-default), 0.3);
      }

      #nav-main {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        #nav-left {
          #nav-links {
            display: flex;
            flex-direction: row;
            gap: 1.5rem;

            margin: 0;
            padding: 0;
            list-style: none;

            .nav-link {
              padding: 0.5rem 0;

              a {
                font-size: 0.75rem;
                text-transform: uppercase;
                color: var(--c-fg-muted);
                cursor: pointer;

                &.active {
                  color: var(--c-fg-default);
                }
              }
            }
          }
        }
      }
    }

    main {
      padding-top: 1rem;
      padding-bottom: 3rem;
    }
  }
}
</style>
