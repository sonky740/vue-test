<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/canvas">Canvas</router-link>
    <router-link to="/composition">Composition</router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'MainNav',
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  padding: 30px;
  justify-content: center;

  a {
    position: relative;
    font-size: 1.6rem;
    font-weight: bold;
    color: #2c3e50;

    + a {
      margin-left: 1.6rem;

      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: -0.8rem;
        width: 0.1rem;
        height: 1.6rem;
        background: #222;
        transform: translateY(-50%);
      }
    }

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
