<!-- == SCRIPT ============================================================= -->

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/pinia';

import { init } from './utils';

import Throbber from '@/components/ThrobberItem.vue';
import ToggleSwitch from '@/components/ToggleSwitch.vue';
import IconItem from '@/components/IconItem.vue';

const ready = ref(false);

const initStatus = ref<[number, number]>([0, 0]);

(async () => {
  await init((loadStatus, loadedStatus) => (initStatus.value = [loadStatus, loadedStatus]));
  setTimeout(() => (ready.value = true), 100);
})();

const store = useStore();

{
  const colorScheme = localStorage.getItem('site-color-scheme') as 'dark' | 'light';

  store.setColorMode(
    colorScheme
      ? colorScheme === 'dark'
        ? 0
        : 1
      : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 0
      : 1
  );

  watch(
    () => store.colorMode,
    (value) => store.setColorMode(value as 0 | 1)
  );

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    store.setColorMode(event.matches ? 0 : 1);
  });
}

{
  const route = useRoute();
  watch(route, () => {
    setTimeout(() => {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  });
}

const scrollPos = ref(0);
window.addEventListener('scroll', () => {
  requestAnimationFrame(() => {
    const element = document.getElementById('app')!;

    const { top, height } = element.getBoundingClientRect();

    const heightApp = height;
    const heightView = window.innerHeight;
    scrollPos.value = Math.min(Math.max(((0 - top) / (heightApp - heightView)) * 100, 0), 100);
  });
});
</script>

<!-- == TEMPLATE =========================================================== -->

<template>
  <template v-if="!ready">
    <div id="throbber-wrapper">
      <div id="throbber-inner-wrapper">
        <Throbber />
        <div id="progress-bar">
          <div
            v-if="initStatus[1] > 0"
            id="progress-bar-progress"
            :style="`width: ${(initStatus[0] / initStatus[1]) * 100}%`"
          ></div>
        </div>
      </div>
    </div>
  </template>

  <template v-else>
    <nav>
      <div id="scroll-pos">
        <div id="scroll-pos-indicator" :style="`width: ${scrollPos}%`"></div>
      </div>

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
          <ToggleSwitch
            labelLeft="🌚"
            labelRight="🌝"
            :init="store.getColorMode"
            @update:init="(value) => store.setColorMode(value)"
          />
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

      #throbber-inner-wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;

        #progress-bar {
          position: absolute;
          z-index: -1;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          width: 15rem;
          height: 4rem;
          border: 1px solid var(--c-border-default);
          border-radius: 0.5rem;

          #progress-bar-progress {
            width: 0;
            height: 100%;
            border-radius: 0.5rem;
            background-color: var(--c-accent-emphasis);
            opacity: 0.25;
          }
        }
      }
    }

    a {
      text-decoration: none;
    }

    > * {
      width: 100%;
    }

    #scroll-pos {
      position: absolute;
      top: 0;
      width: 100%;

      #scroll-pos-indicator {
        height: 2px;
        background-color: var(--c-accent-emphasis);
      }
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
