<template>
  <!-- ref, reactive -->
  <section class="section">
    <h1 class="section-title">ref, reactive</h1>
    <p>ref count: {{ count }}</p>
    <p>reactive double: {{ count2.double }}</p>
    <p>vuex: {{ xCount }}</p>
    <div>
      <button @click="add">add</button>
    </div>
    <p>{{ inputTest }}</p>
    <div>
      <input type="text" class="input" v-model="inputTest" />
    </div>
  </section>

  <!-- refs, props -->
  <section class="section">
    <h1 class="section-title">refs</h1>
    <div
      class="bg-div"
      ref="divRef"
      :style="`background: yellow; height: ${divHeight}px`"
    >
      <PropTest
        :divHeight="divHeight"
        @divHeightIncrease="divRefHeightIncrease"
      >
        props:
      </PropTest>
      <p>x: {{ mousePosition.x }}, y: {{ mousePosition.y }}</p>
    </div>
    <button type="button" @click="divRefHeightIncrease">height + 100</button>
    &nbsp;
    <button type="button" @click="divRefHeightDecrease">height - 100</button>
  </section>
</template>

<script lang="ts" setup>
import {
  ref,
  reactive,
  watch,
  computed,
  // toRefs, // toRef는 하나만 뽑아서 사용할 때
  onMounted,
  watchEffect,
  onUnmounted,
} from 'vue';
import { useStore } from 'vuex';
import PropTest from '@/components/PropTest.vue';

interface DoubleCount {
  number: number;
  double: number;
}

const store = useStore();
const count = ref(0); // 원시값도 가능
const count2: DoubleCount = reactive({
  number: 0,
  double: computed(() => count2.number * 2),
}); // 객체나 배열을 사용할 때는 reactive를 사용해야 함
const inputTest = ref('');
const divRef = ref();
const divHeight = ref(100);
const transitioning = ref(false);
const mousePosition = reactive({
  x: 0,
  y: 0,
});
// vuex
const xCount = computed(() => store.state.xCount);

const add = () => {
  count.value++;
  count2.number++;
  store.commit('increase'); // vuex
};

const divRefHeightIncrease = () => {
  if (transitioning.value) return;
  transitioning.value = true;
  divHeight.value = divRef.value.offsetHeight + 100;
  divRef.value.addEventListener('transitionend', () => {
    transitioning.value = false;
  });
};

const divRefHeightDecrease = () => {
  if (divHeight.value === 100 || transitioning.value) return;
  transitioning.value = true;
  divHeight.value = divRef.value.offsetHeight - 100;
  divRef.value.addEventListener('transitionend', () => {
    transitioning.value = false;
  });
};

watch([count, count2], ([newVal, newVal2], [oldVal, oldVal2]) => {
  console.log('count changed', newVal, oldVal, newVal2.double, oldVal2.double);
});

watchEffect(() => {
  // console.log(inputTest.value);
  // console.log('inputTest changed', inputTest.value);
});

const mouseMove = (e: MouseEvent) => {
  mousePosition.x = e.offsetX;
  mousePosition.y = e.offsetY;
  // console.log(mousePosition);
};

onMounted(() => {
  console.log('mounted:' + divRef.value);
  document.addEventListener('mousemove', mouseMove);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', mouseMove);
});
</script>

<style lang="scss" scoped>
.section {
  margin-bottom: 2.4rem;

  &-title {
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 1.6rem;
  }
}
.input {
  border: 1px solid #ddd;
}
.bg-div {
  transition: height 0.3s;
}
</style>
