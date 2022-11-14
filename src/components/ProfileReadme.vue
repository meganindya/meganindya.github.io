<!-- == SCRIPT ============================================================= -->

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { getProfileHTML } from '@/utils';

const profileHTML = ref<string | undefined>(undefined);

onMounted(() => {
  (async () => {
    profileHTML.value = await getProfileHTML();
  })();
});
</script>

<!-- == TEMPLATE =========================================================== -->

<template>
  <template v-if="profileHTML !== undefined">
    <div class="markdown-body" v-html="profileHTML"></div>
  </template>
</template>

<!-- == STYLE ============================================================== -->

<style lang="scss"></style>
