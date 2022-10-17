<template>
  <div class="canvas">
    <canvas ref="canvas"></canvas>
  </div>
  <div class="btn-wrap">
    <button type="button" ref="startBtn">start</button>
    <button type="button" ref="stopBtn">stop</button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, Ref } from 'vue';

interface BoxType {
  index: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  draw: () => void;
}

const boxes = ref([]) as Ref<BoxType[]>;
const tempX = ref(0);
const tempY = ref(0);
const tempDx = ref(0);
const tempDy = ref(0);
const mousePos = ref({
  x: 0,
  y: 0,
});
const selectedBox = ref();
const canvas = ref() as Ref<HTMLCanvasElement>;
const startBtn = ref() as Ref<HTMLButtonElement>;
const stopBtn = ref() as Ref<HTMLButtonElement>;
const circleIndex = ref(0);

let intervalId: number;

onMounted(() => {
  const context = canvas.value.getContext('2d') as CanvasRenderingContext2D;
  const canvasWrap = canvas.value.parentElement as HTMLElement;

  const canvasSize = () => {
    canvas.value.width = canvasWrap.clientWidth;
    canvas.value.height = 300;
  };
  canvasSize();

  class Box implements BoxType {
    index: number;
    x: number;
    y: number;
    dx: number;
    dy: number;
    radius: number;

    constructor(index: number, x: number, y: number, dx: number, dy: number) {
      this.index = index;
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = 25;
      this.draw();
    }

    draw() {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fillStyle = 'rgba(0, 0, 0, 0.5)';
      context.fill();

      context.beginPath();
      context.font = 'bold 16px sans-serif';
      context.fillStyle = '#fff';
      context.textBaseline = 'middle';
      context.textAlign = 'center';
      context.fillText(this.index.toString(), this.x, this.y);
    }
  }

  const create = (i: number) => {
    tempX.value = Math.random() * (canvas.value.width * 0.8) + 25;
    tempY.value = Math.random() * (canvas.value.height * 0.75) + 25;
    tempDx.value = Math.random() * 4 + 1;
    tempDy.value = Math.random() * 4 + 1;
    boxes.value.push(
      new Box(i, tempX.value, tempY.value, tempDx.value, tempDy.value)
    );
  };

  const animation = () => {
    if (!canvas.value) return;
    context.clearRect(0, 0, canvas.value.width, canvas.value.height);

    let box;
    for (let i = 0; i < boxes.value.length; i++) {
      box = boxes.value[i];
      if (box.x + box.radius > canvas.value.width || box.x - box.radius < 0) {
        box.dx = -box.dx;
      }
      if (box.y + box.radius > canvas.value.height || box.y - box.radius < 0) {
        box.dy = -box.dy;
      }

      box.x += box.dx;
      box.y += box.dy;
      box.draw();
    }
    requestAnimationFrame(animation);
  };

  const render = () => {
    for (circleIndex.value = 0; circleIndex.value < 10; circleIndex.value++) {
      create(circleIndex.value);
    }
    animation();
  };

  const circleCreate = () => {
    intervalId = setInterval(() => {
      if (circleIndex.value === 21) circleIndex.value = 0;
      if (boxes.value.length > 20) {
        boxes.value.splice(0, 1);
      }

      create(circleIndex.value);
      circleIndex.value++;
    }, 1000);
  };

  render();

  canvas.value.addEventListener('click', e => {
    mousePos.value.x = e.offsetX;
    mousePos.value.y = e.offsetY;

    let box;
    for (let i = 0; i < boxes.value.length; i++) {
      box = boxes.value[i];
      if (
        mousePos.value.x > box.x - box.radius &&
        mousePos.value.x < box.x + box.radius &&
        mousePos.value.y > box.y - box.radius &&
        mousePos.value.y < box.y + box.radius
      ) {
        selectedBox.value = box;
        break;
      }
    }

    if (selectedBox.value) {
      const sb: BoxType = selectedBox.value;
      console.log(sb.index);
      selectedBox.value = null;
    }
  });

  startBtn.value.addEventListener('click', circleCreate);
  stopBtn.value.addEventListener('click', () => clearInterval(intervalId));
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style lang="scss" scoped>
.canvas {
  canvas {
    margin: 0 auto;
    background: #e1e1e1;
  }
}

.btn-wrap {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;

  button {
    flex: 1;
    padding: 0.5rem 1rem;
  }
}
</style>
