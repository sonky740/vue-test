<template>
  <div>
    <slot></slot>
    {{ divHeight }}
    <button type="button" @click="heightIncrease">height + 100</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PropTest',
  props: {
    divHeight: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
    const heightIncrease = () => {
      context.emit('divHeightIncrease');
    };

    return {
      heightIncrease,
    };
  },
});
</script>

<style lang="scss" scoped>
button {
  margin-left: 0.8rem;
}
</style>
