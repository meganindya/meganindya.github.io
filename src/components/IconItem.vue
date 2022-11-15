<!-- ======== SCRIPT ======================================================= -->

<script setup lang="ts">
import { onMounted, onUpdated, ref, toRefs } from 'vue';

const props = defineProps({
  name: String
});

const { name } = toRefs(props);

const container = ref(null);

function loadSVG() {
  fetch(`/assets/icons/${name!.value}.svg`)
    .then((res) => res.text())
    .then((res) => {
      if (container.value) {
        (container.value as HTMLElement).innerHTML = res;
      }
    });
}

onMounted(() => loadSVG());
onUpdated(() => loadSVG());
</script>

<!-- ======== TEMPLATE ===================================================== -->

<template>
  <div class="icon" ref="container"></div>
</template>

<!-- ======== STYLE ======================================================== -->

<style lang="scss">
.icon {
  flex-shrink: 0;
  width: 100%;
  height: 100%;

  svg {
    width: inherit;
    height: inherit;
  }
}
</style>
