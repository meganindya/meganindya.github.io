<!-- == SCRIPT ============================================================= -->

<script setup lang="ts">
import { ref } from 'vue';

import { getProjects } from '@/utils';

import ProjectItem from '@/components/ProjectItem.vue';

const projects = ref(getProjects());
</script>

<!-- == TEMPLATE =========================================================== -->

<template>
  <article id="projects">
    <ul id="project-list">
      <template v-for="({ title, tech, repo, desc, links }, i) in projects" :key="`project-${i}`">
        <li>
          <ProjectItem :title="title" :tech="tech" :repo="repo" :desc="desc" :links="links" />
        </li>
      </template>
    </ul>
  </article>
</template>

<!-- == STYLE ============================================================== -->

<style lang="scss">
#project-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
