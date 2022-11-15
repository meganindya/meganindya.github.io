<!-- == SCRIPT ============================================================= -->

<script setup lang="ts">
import { ref, watch } from 'vue';

import { getProjects } from '@/utils';

import ProjectItem from '@/components/ProjectItem.vue';

const emit = defineEmits(['ready']);

const projects = ref(getProjects());

const ready = ref(false);
const readyCount = ref(0);

watch(readyCount, (value) => {
  if (value === projects.value.length) {
    ready.value = true;
    emit('ready');
  }
});
</script>

<!-- == TEMPLATE =========================================================== -->

<template>
  <div class="markdown-body">
    <h1>Notable Projects</h1>
    <p></p>
  </div>

  <ul id="project-list">
    <template v-for="({ title, desc, images }, i) in projects" :key="`project-${i}`">
      <li>
        <ProjectItem :title="title" :desc="desc" :images="images" @ready="readyCount++" />
      </li>
    </template>
  </ul>
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
