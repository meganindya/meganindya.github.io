<!-- == SCRIPT ============================================================= -->

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { init } from './utils';

import Throbber from '@/components/ThrobberItem.vue';
import ToggleSwitch from '@/components/ToggleSwitch.vue';
import IconItem from '@/components/IconItem.vue';

const ready = ref(false);

(async () => {
  await init();
  setTimeout(() => (ready.value = true), 100);
})();

const colorMode = ref<0 | 1>(0);

{
  const setColorMode = (value: 0 | 1): void => {
    document.documentElement.setAttribute('color-scheme', value === 0 ? 'dark' : 'light');
    localStorage.setItem('site-color-scheme', colorMode.value === 0 ? 'dark' : 'light');
  };

  const colorScheme = localStorage.getItem('site-color-scheme') as 'dark' | 'light';

  colorMode.value = colorScheme
    ? colorScheme === 'dark'
      ? 0
      : 1
    : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 0
    : 1;

  setColorMode(colorMode.value);

  watch(colorMode, (value) => setColorMode(value));

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    colorMode.value = event.matches ? 0 : 1;
  });
}

{
  const route = useRoute();
  watch(route, () => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  });
}
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
              <RouterLink to="/" :class="$route.name === 'profile' ? 'active' : ''">
                Profile
              </RouterLink>
            </li>
            <li class="nav-link">
              <RouterLink to="/projects" :class="$route.name === 'projects' ? 'active' : ''">
                Projects
              </RouterLink>
            </li>
            <li class="nav-link">
              <RouterLink to="/highlight" :class="$route.name === 'highlight' ? 'active' : ''">
                Highlight
              </RouterLink>
            </li>
          </ul>
        </div>

        <div id="nav-right">
          <ToggleSwitch labelLeft="🌚" labelRight="🌝" v-model:init="colorMode" />
        </div>
      </div>
    </nav>

    <main class="container">
      <RouterView />
    </main>

    <footer class="container">
      <ul id="footer-links">
        <li class="footer-link">
          <a href="https://linkedin.com/in/meganindya/" target="_blank">
            <IconItem name="linkedin" />
          </a>
        </li>
        <li class="footer-link">
          <a href="https://github.com/meganindya" target="_blank">
            <IconItem name="github" />
          </a>
        </li>
        <li class="footer-link">
          <a href="mailto:anindyaak007@gmail.com" target="_blank">
            <IconItem name="gmail" />
          </a>
        </li>
      </ul>
    </footer>
  </template>
</template>

<!-- == STYLE ============================================================== -->

<style lang="scss">
@import '@/scss/colors.scss';
@import '@/scss/markdown.scss';

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
  transition: color 0.25s ease, background-color 0.1s ease;

  .markdown-body {
    transition: color 0.25s ease, background-color 0.1s ease;
  }

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

            @media only screen and (max-width: 891px) {
              gap: 1rem;
            }

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

    footer {
      display: grid;
      place-items: center;
      padding-top: 2rem;
      padding-bottom: 2rem;
      border-top: 1px solid var(--c-border-muted);

      #footer-links {
        display: flex;
        flex-direction: row;
        gap: 2rem;
        place-items: center;

        margin: 0;
        padding: 0;
        list-style: none;

        .footer-link {
          display: grid;
          place-items: center;
          padding: 0.5rem;
          border-radius: 8px;
          background-color: var(--c-bg-subtle);
          cursor: pointer;
          transition: background-color 0.5s ease;

          a {
            width: 1.5rem;
            height: 1.5rem;

            .icon {
              width: 1.5rem;
              height: 1.5rem;

              svg {
                path {
                  fill: var(--c-fg-muted);
                  transition: fill 0.5s ease;
                }
              }
            }
          }

          &:hover {
            background-color: var(--c-neutral-muted);

            a {
              .icon {
                svg {
                  path {
                    fill: var(--c-fg-default);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
