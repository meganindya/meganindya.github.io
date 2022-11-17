<!-- == SCRIPT ============================================================= -->

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { getProjects } from '@/utils';

import ProjectItem from '@/components/ProjectItem.vue';

const projects = ref(getProjects());

const projectsListElem = ref(null);

onMounted(() => {
  function getVisible(element: HTMLElement) {
    const { top, bottom, height } = element.getBoundingClientRect();

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    let visibleHeight = 0;

    // either below or above viewport
    if (top > viewportHeight || bottom < 0) {
      visibleHeight = 0;
    } else {
      // in viewport and stretching above and below viewport
      if (top < 0 && bottom > viewportHeight) {
        visibleHeight = viewportHeight;
      }
      // within viewport
      else if (top >= 0 && bottom <= viewportHeight) {
        visibleHeight = height;
      }
      // top portion showing bottom below viewport
      else if (top > 0 && top < viewportHeight && bottom > viewportHeight) {
        visibleHeight = viewportHeight - top;
      }
      // bottom portion showing top above viewport
      else if (top < 0 && bottom > 0 && bottom < viewportHeight) {
        visibleHeight = bottom;
      }
    }

    return (visibleHeight / viewportHeight) * 100;
  }

  function setOpacities() {
    ([...(projectsListElem.value! as HTMLElement).children] as HTMLElement[]).forEach(
      (item) => (item.style.opacity = '0')
    );

    const visibleItemAmounts = (
      [...(projectsListElem.value! as HTMLElement).children] as HTMLElement[]
    )
      .map((item) => [item, getVisible(item)] as [HTMLElement, number])
      .filter(([_, visibleAmount]) => visibleAmount > 0) as [HTMLElement, number][];

    if (visibleItemAmounts.length === 1) {
      visibleItemAmounts[0][0].style.opacity = '1';
      return;
    }

    if (visibleItemAmounts.length === 0) return;

    const total = visibleItemAmounts.reduce(([_, amountA], [__, amountB]) => [
      null as unknown as HTMLElement,
      amountA + amountB
    ])[1];

    const itemsNormalised = visibleItemAmounts.map(([item, visibleAmount]) => [
      item,
      visibleAmount * (100 / total)
    ]) as [HTMLElement, number][];

    const amountMax = itemsNormalised.reduce(([_, amountA], [__, amountB]) => [
      null as unknown as HTMLElement,
      amountA > amountB ? amountA : amountB
    ])[1];

    const amountMin = itemsNormalised.reduce(([_, amountA], [__, amountB]) => [
      null as unknown as HTMLElement,
      amountA < amountB ? amountA : amountB
    ])[1];

    const minOpacity = 0.0 + (1 - (amountMax - amountMin) / 100) * 1.0;

    itemsNormalised.forEach(([item, amountVisible]) => {
      const opacity =
        minOpacity + ((amountVisible - amountMin) / (amountMax - amountMin)) * (1 - minOpacity);
      item.style.opacity = opacity.toString();
    });
  }

  requestAnimationFrame(() => setOpacities());
  window.addEventListener('scroll', () => setOpacities());
  new ResizeObserver(() => setOpacities()).observe(projectsListElem.value! as HTMLElement);
});
</script>

<!-- == TEMPLATE =========================================================== -->

<template>
  <article id="projects">
    <ul id="project-list" ref="projectsListElem">
      <template
        v-for="({ title, tech, repo, summary, desc, links }, i) in projects"
        :key="`project-${i}`"
      >
        <li>
          <ProjectItem
            :title="title"
            :tech="tech"
            :repo="repo"
            :summary="summary"
            :desc="desc"
            :links="links"
          />
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
