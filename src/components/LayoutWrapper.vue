<template>
  <main class="wrap">
    <slot></slot>
  </main>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.wrap {
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1.6rem;
}
</style>
