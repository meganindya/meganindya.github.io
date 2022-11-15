<!-- == SCRIPT ============================================================= -->

<script setup lang="ts">
import { ref } from 'vue';

import { getHighlightHTML } from '@/utils';

const highlightHTML = ref(getHighlightHTML());
</script>

<!-- == TEMPLATE =========================================================== -->

<template>
  <article id="profile" class="markdown-body" v-html="highlightHTML"></article>
</template>

<!-- == STYLE ============================================================== -->

<style lang="scss"></style>
