<!-- == SCRIPT ============================================================= -->

<script setup lang="ts">
import { onMounted, ref, toRefs } from 'vue';

import IconItem from '@/components/IconItem.vue';

const props = defineProps({
  images: Array<string>
});

const { images } = toRefs(props);

const imageCarouselProgress = ref(null);

onMounted(() => {
  images!.value!.forEach((_, i) => {
    const div = document.createElement('div');
    if (i === 0) div.classList.add('active');
    setTimeout(() => {
      (imageCarouselProgress.value as unknown as HTMLDivElement).appendChild(div);
    });
  });
});

const currentImageIndex = ref(0);

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
  <div class="image-carousel-wrapper">
    <div class="image-carousel">
      <button
        :class="`image-carousel-btn ${
          currentImageIndex === 0 ? 'image-carousel-btn-disabled' : ''
        } image-carousel-btn-prev`"
        @click="updateImage('prev')"
      >
        <IconItem name="arrow-left" />
      </button>

      <div class="image-carousel-box" ref="imageBoxRef">
        <img :src="images![currentImageIndex]" />
      </div>

      <button
        :class="`image-carousel-btn ${
          currentImageIndex === images!.length - 1 ? 'image-carousel-btn-disabled' : ''
        } image-carousel-btn-next`"
        @click="updateImage('next')"
      >
        <IconItem name="arrow-right" />
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
      padding: 4px;

      background: none;
      border: unset;
      cursor: pointer;

      .icon {
        svg {
          path {
            fill: var(--c-accent-fg);
          }
        }
      }

      &.image-carousel-btn-disabled {
        .icon {
          svg {
            path {
              fill: var(--c-neutral-muted);
            }
          }
        }
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
