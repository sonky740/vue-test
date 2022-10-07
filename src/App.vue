<template>
  <MainNav />
  <LayoutWrapper>
    <router-view />
  </LayoutWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainNav from '@/components/MainNav.vue';
import LayoutWrapper from '@/components/LayoutWrapper.vue';

export default defineComponent({
  components: {
    MainNav,
    LayoutWrapper,
  },
});
</script>

<style lang="scss">
nav {
  padding: 3rem;

  a {
    font-weight: 700;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
