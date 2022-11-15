<!-- ======== SCRIPT ======================================================= -->

<script setup lang="ts">
import { onMounted, onUpdated, ref, toRefs } from 'vue';

const props = defineProps({
  labelLeft: String,
  labelRight: String,
  init: Number // 0 is left; 1 is right
});

const emit = defineEmits(['update:init']);

const { labelLeft, labelRight, init } = toRefs(props);

const refToggleKnob = ref(null);

function setValue(value: number) {
  const elemToggleKnob = refToggleKnob.value as unknown as HTMLElement;
  setTimeout(() => {
    elemToggleKnob.classList.remove('widget-toggle-knob-left');
    elemToggleKnob.classList.remove('widget-toggle-knob-right');
    elemToggleKnob.classList.add(
      value === 0 ? 'widget-toggle-knob-left' : 'widget-toggle-knob-right'
    );
  });
}

function toggleKnob() {
  const elemToggleKnob = refToggleKnob.value as unknown as HTMLElement;

  const setPositionTo = elemToggleKnob.classList.contains('widget-toggle-knob-left') ? 1 : 0;

  setValue(setPositionTo);

  emit('update:init', setPositionTo);
}

onMounted(() => setValue(init!.value!));

onUpdated(() => setValue(init!.value!));
</script>

<!-- ======== TEMPLATE ===================================================== -->

<template>
  <div class="widget-toggle-wrapper">
    <template v-if="labelLeft">
      <label class="widget-toggle-label widget-toggle-label-left">
        {{ labelLeft }}
      </label>
    </template>

    <div class="widget-toggle" @click="toggleKnob">
      <div class="widget-toggle-knob" ref="refToggleKnob"></div>
    </div>

    <template v-if="labelRight">
      <label class="widget-toggle-label widget-toggle-label-right">
        {{ labelRight }}
      </label>
    </template>
  </div>
</template>

<!-- ======== STYLE ======================================================== -->

<style lang="scss">
.widget-toggle-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  background-color: var(--c-neutral-muted);

  .widget-toggle-label {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    margin-top: 1px;

    .widget-toggle-label-left {
      text-align: right;
    }

    .widget-toggle-label-right {
      text-align: left;
    }
  }

  .widget-toggle {
    box-sizing: border-box;
    width: 32px;
    height: 18px;

    padding: 2px;
    border: 1px solid var(--c-fg-default);
    border-radius: 20px;
    box-shadow: inset 0 0 1px 1px (--c-fg-muted);

    .widget-toggle-knob {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: var(--c-accent-fg);
      transition: all 0.25s ease;
      cursor: pointer;

      &.widget-toggle-knob-left {
        margin-left: 0;
      }

      &.widget-toggle-knob-right {
        margin-left: 14px;
      }
    }
  }
}
</style>
