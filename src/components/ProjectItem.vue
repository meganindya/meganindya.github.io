<!-- == SCRIPT ============================================================= -->

<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from 'vue';

import { useStore } from '@/pinia';
import { getMDToHTML } from '@/utils';

import ImageCarousel from '@/components/ImageCarousel.vue';

const props = defineProps({
  title: String,
  tech: Object,
  repo: String,
  summary: String,
  desc: String,
  links: Array<string>
});

const { title, tech, repo, desc, links } = toRefs(props);

const store = useStore();

const badgeURLs = ref<Record<string, string>>(
  Object.fromEntries(Object.entries(tech!.value!).map(([label, logo]) => [label, logo]))
);

function refreshBadgeURLs(colorMode: 0 | 1) {
  function getBadgeURL(label: string, logo: string) {
    label = encodeURI(label).replaceAll(/\+/g, '%2B').replaceAll(/-/g, '--');
    logo = encodeURI(logo).replaceAll(/\+/g, '%2B');

    const colorBg = colorMode === 0 ? '182C61' : '24292f';

    let url = `https://img.shields.io/badge/-${label}-${colorBg}?logo=${logo}`;

    return colorMode === 0 ? url : url + `&logoColor=f6f8fa`;
  }

  badgeURLs.value = Object.fromEntries(
    Object.entries(tech!.value!).map(([label, logo]) => [label, getBadgeURL(label, logo)])
  );
}

const repoBadgeURL = ref('');

function refreshRepoBadgeURL(colorMode: 0 | 1) {
  if (!repo?.value) return;

  const pieces = repo.value.split('/');
  const repoName = pieces[pieces.length - 1].replaceAll(/-/g, '--');

  const colorBg = colorMode === 0 ? '30363d' : '6e7781';

  repoBadgeURL.value = `https://img.shields.io/badge/GitHub-${repoName}-${colorBg}?&logo=GitHub`;
}

onMounted(() => {
  refreshBadgeURLs(store.getColorMode);
  refreshRepoBadgeURL(store.getColorMode);

  watch(
    () => store.colorMode,
    (value) => {
      refreshBadgeURLs(value as 0 | 1);
      refreshRepoBadgeURL(value as 0 | 1);
    }
  );
});

const showingDescription = ref(false);
</script>

<!-- == TEMPLATE =========================================================== -->

<template>
  <div class="project-item markdown-body">
    <h2 v-html="title"></h2>

    <div class="project-item-info">
      <div class="project-item-badge-list">
        <template v-for="([name, url], i) in Object.entries(badgeURLs)" :key="`tech-${i}`">
          <img :src="url" :alt="name" />
        </template>
      </div>

      <template v-if="repo">
        <a class="project-item-repo" :href="repo" target="_blank">
          <img :src="repoBadgeURL" alt="GitHub Repository" />
        </a>
      </template>
    </div>

    <template v-if="(summary && summary.length > 0) || (desc && desc.length > 0)">
      <div class="project-item-writeup">
        <template v-if="desc && desc.length > 0">
          <ul class="project-item-writeup-btn-list">
            <li
              :class="`project-item-writeup-btn ${
                showingDescription ? '' : 'project-item-writeup-btn-inactive'
              }`"
              @click="showingDescription = false"
            >
              <button>Summary</button>
            </li>
            <li
              :class="`project-item-writeup-btn ${
                !showingDescription ? '' : 'project-item-writeup-btn-inactive'
              }`"
              @click="showingDescription = true"
            >
              <button>Description</button>
            </li>
          </ul>
        </template>

        <template v-if="!showingDescription && summary!.length > 0">
          <div class="project-item-summary" v-html="getMDToHTML(summary!)"></div>
        </template>

        <template v-if="desc && desc.length > 0 && showingDescription">
          <div class="project-item-desc" v-html="getMDToHTML(desc!)"></div>
        </template>
      </div>
    </template>

    <template v-if="links!.length > 0">
      <div class="project-item-image-carousel-wrapper">
        <ImageCarousel :images="links" />
      </div>
    </template>
  </div>
</template>

<!-- == STYLE ============================================================== -->

<style lang="scss">
.project-item {
  width: 100%;
  padding: 1rem;

  border-radius: 8px;
  background-color: var(--c-bg-subtle);

  .project-item-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    column-gap: 1rem;
    row-gap: 0.5rem;

    .project-item-badge-list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.5rem;

      img {
        height: 20px;
      }
    }

    .project-item-repo {
      height: 20px;
    }
  }

  .project-item-writeup {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    width: 100%;
    margin-top: 0.5rem;

    .project-item-writeup-btn-list {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
      margin: 0;
      padding: 0;
      list-style: none;

      .project-item-writeup-btn {
        margin: 0;
        padding: 0;

        button {
          padding: 0;
          border: unset;
          outline: none;
          background: none;
          color: var(--c-accent-fg);
          cursor: pointer;
          transition: color 0.25s ease;
        }

        &.project-item-writeup-btn-inactive {
          button {
            color: var(--c-fg-muted);
            cursor: unset;
          }
        }
      }
    }

    .project-item-summary,
    .project-item-desc {
      width: 100%;
      text-align: justify;

      :last-child {
        margin-bottom: 0;
      }
    }
  }

  .project-item-image-carousel-wrapper {
    margin-top: 0.75rem;
  }
}
</style>
