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
    <header class="markdown-body">
      <h1>Notable Projects</h1>
      <p></p>
    </header>

    <ul id="project-list">
      <template v-for="({ title, desc, images }, i) in projects" :key="`project-${i}`">
        <li>
          <ProjectItem :title="title" :desc="desc" :images="images" />
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
