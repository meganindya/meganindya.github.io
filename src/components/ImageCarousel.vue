<!-- == SCRIPT ============================================================= -->

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';

const props = defineProps({
  images: Array<string>
});

const emit = defineEmits(['ready']);

const ready = ref(false);

const { images } = toRefs(props);

const imageItems = ref<Record<string, string>>({});

const imagePromises: Promise<void>[] = [];
(images!.value as string[]).forEach((image) => {
  imagePromises.push(
    new Promise<void>((resolve) => {
      fetch(image)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = e.target!.result as string;

            imageItems.value[image] = img;

            const i = new Image();
            i.onload = () => {
              resolve();
            };
            i.src = img;
          };
          reader.readAsDataURL(blob);
        });
    })
  );
});

(async () => {
  await Promise.all(imagePromises);
  ready.value = true;
  emit('ready');
})();

const imageCarouselProgress = ref(null);
watch([ready, imageCarouselProgress], ([ready, element]) => {
  if (!ready || !element) return;

  images!.value!.forEach((_, i) => {
    const div = document.createElement('div');
    if (i === 0) div.classList.add('active');
    setTimeout(() => {
      (imageCarouselProgress.value as unknown as HTMLDivElement).appendChild(div);
    });
  });
});

const currentImageIndex = ref(-1);

watch(ready, () => {
  currentImageIndex.value = 0;
});

const updateImage = (direction: 'prev' | 'next'): void => {
  const sign = direction === 'prev' ? -1 : 1;

  if (currentImageIndex.value + sign < 0 || currentImageIndex.value + sign >= images!.value!.length)
    return;

  currentImageIndex.value = currentImageIndex.value + sign;

  [...(imageCarouselProgress.value as unknown as HTMLDivElement).children].forEach((item) =>
    item.classList.remove('active')
  );

  [...(imageCarouselProgress.value as unknown as HTMLDivElement).children][
    currentImageIndex.value
  ].classList.add('active');
};
</script>

<!-- == TEMPLATE =========================================================== -->

<template>
  <div class="image-carousel-wrapper" v-if="ready">
    <div class="image-carousel">
      <button
        :class="`image-carousel-btn ${
          currentImageIndex === 0 ? 'image-carousel-btn-disabled' : ''
        } image-carousel-btn-prev`"
        @click="updateImage('prev')"
      >
        &lt;
      </button>

      <div class="image-carousel-box" ref="imageBoxRef">
        <img :src="imageItems[images![currentImageIndex]]" />
      </div>

      <button
        :class="`image-carousel-btn ${
          currentImageIndex === images!.length - 1 ? 'image-carousel-btn-disabled' : ''
        } image-carousel-btn-next`"
        @click="updateImage('next')"
      >
        &gt;
      </button>
    </div>
    <div class="image-carousel-progress" ref="imageCarouselProgress"></div>
  </div>
</template>

<!-- == STYLE ============================================================== -->

<style lang="scss">
.image-carousel-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  box-sizing: border-box;
  width: 100%;

  .image-carousel {
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
    justify-content: space-between;
    align-items: center;

    .image-carousel-btn {
      display: grid;
      place-items: center;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 4px;

      background: none;
      border: unset;
      background-color: var(--c-fg-subtle);
      cursor: pointer;

      &.image-carousel-btn-disabled {
        opacity: 25%;
      }
    }

    .image-carousel-box {
      flex-shrink: 1;
      display: grid;
      place-items: center;

      width: 100%;
      max-width: calc(100% - 4rem);

      img {
        border-radius: 8px;
        max-height: 75vh;
      }
    }
  }

  .image-carousel-progress {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    justify-content: center;
    align-items: center;

    > * {
      width: 0.375rem;
      height: 0.375rem;
      border-radius: 50%;
      background-color: var(--c-fg-subtle);
      transition: transform 0.5s ease;

      &.active {
        transform: scale(1.33);
        background-color: var(--c-fg-default);
      }
    }
  }
}
</style>
