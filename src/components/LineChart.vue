<template>
  <div class="line-chart">
    <div ref="valuesEl" class="line-chart-values"></div>
    <canvas ref="canvas" width="500" height="250"></canvas>
    <div ref="weeksEl" class="line-chart-weeks"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';

const valuesEl = ref() as Ref<HTMLDivElement>;
const weeksEl = ref() as Ref<HTMLDivElement>;
const canvas = ref() as Ref<HTMLCanvasElement>;

onMounted(() => {
  const context = canvas.value.getContext('2d') as CanvasRenderingContext2D;

  const cw = canvas.value.width;
  const ch = canvas.value.height;

  const w = [0, cw / 5, 2 * (cw / 5), 3 * (cw / 5), 4 * (cw / 5), 5 * (cw / 5)];

  const h = [
    ch,
    ch - ch / 5,
    ch - 2 * (ch / 5),
    ch - 3 * (ch / 5),
    ch - 4 * (ch / 5),
    ch - 5 * (ch / 5),
  ];

  const weeks = ['week1', 'week2', 'week3', 'week4'];
  const values = [100, 200, 300, 400, 500];

  for (let i = 0; i < weeks.length; i++) {
    const week = document.createElement('span');
    const text = document.createTextNode(weeks[i]);
    week.appendChild(text);
    weeksEl.value.appendChild(week);
  }

  for (let i = values.length - 1; i >= 0; i--) {
    const value = document.createElement('span');
    const text = document.createTextNode(values[i].toString());
    value.appendChild(text);
    valuesEl.value.appendChild(value);
  }

  context.beginPath();

  for (var i = 0; i < w.length; i++) {
    context.moveTo(0, context);
    context.strokeStyle = '#000';
    context.lineWidth = 1;
    context.lineTo(w[i], h[Math.floor(Math.random() * 4 + 1)]);
    console.log(w[i], h[Math.floor(Math.random() * 4 + 1)]);
    context.stroke();
  }

  // vertical lines
  function gridV() {
    for (var i = 1; i < w.length - 1; i++) {
      context.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      context.lineWidth = 1;
      context.moveTo(w[i], 0);
      context.lineTo(w[i], ch);
    }
    context.stroke();
  }

  // horizontal lines
  function gridH() {
    for (var i = 1; i < h.length - 1; i++) {
      context.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      context.lineWidth = 1;
      context.moveTo(0, h[i]);
      context.lineTo(cw, h[i]);
    }
    context.stroke();
  }

  gridV();
  gridH();
});
</script>

<style lang="scss">
.line-chart {
  position: relative;

  &-values {
    position: absolute;
    top: 0;
    left: -2.6rem;
    margin-top: -0.2rem;

    > span {
      position: relative;
      display: block;
      color: #000;
      font-size: 1.6rem;
      height: 5rem;

      &:after {
        content: '';
        position: absolute;
        width: 0.4rem;
        height: 0.4rem;
        background: #000;
        border-radius: 50%;
      }
    }
  }

  &-weeks {
    margin-left: 10rem;

    > span {
      display: inline-block;
      width: 10rem;
      color: #000;
      font-size: 1.6rem;

      &:before {
        content: '';
        position: absolute;
        bottom: 2rem;
        width: 0.4rem;
        height: 0.4rem;
        background: #000;
        border-radius: 50%;
      }
    }
  }

  canvas {
    border: solid;
    border-width: 0 0 2px 2px;
    border-color: #000;
  }
}
</style>
