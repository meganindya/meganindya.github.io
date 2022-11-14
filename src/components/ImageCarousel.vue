<!-- == SCRIPT ============================================================= -->

<script setup lang="ts">
import { ref, toRefs } from 'vue';

const props = defineProps({
  images: Array<string>
});

const { images } = toRefs(props);

const imageItems = ref<Record<string, string>>({});

const imagePromises: Promise<void>[] = [];
(images!.value as string[]).forEach((image) => {
  return new Promise<void>((resolve) => {
    fetch(image)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          imageItems.value[image] = e.target!.result as string;
          resolve();
        };
        reader.readAsDataURL(blob);
      });
  });
});

(async () => {
  await Promise.all(imagePromises);
})();
</script>

<!-- == TEMPLATE =========================================================== -->

<template>
  <ul>
    <template v-for="(image, i) in images" :key="`image-${i}`">
      <li>
        <img :src="imageItems[image]" />
      </li>
    </template>
  </ul>
</template>

<!-- == STYLE ============================================================== -->

<style lang="scss" scoped>
ul {
  display: flex;
  flex-direction: column;
  gap: 4px;

  margin: 0;
  padding: 0;
  list-style: none;

  li {
    margin: 0;
    height: max-content;

    img {
      border-radius: 8px;
    }
  }
}
</style>
