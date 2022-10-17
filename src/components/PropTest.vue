<template>
  <div>
    <slot></slot>
    {{ props.divHeight }}
    <button type="button" @click="heightIncrease">height + 100</button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['divHeightIncrease']);
const props = defineProps({
  divHeight: {
    type: Number,
    required: true,
  },
});

const heightIncrease = () => {
  emit('divHeightIncrease');
};
</script>

<style lang="scss" scoped>
button {
  margin-left: 0.8rem;
}
</style>
