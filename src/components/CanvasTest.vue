<template>
  <div class="canvas">
    <canvas ref="canvas" width="600" height="400"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface BoxType {
  index: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
}

export default defineComponent({
  name: 'CanvasTest',
  data() {
    return {
      boxes: [] as any[],
      tempX: 0,
      tempY: 0,
      tempDx: 0,
      tempDy: 0,
      mousePos: {
        x: 0,
        y: 0,
      },
      selectedBox: null,
    };
  },
  mounted() {
    const canvas = this.$refs.canvas as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

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
      this.tempX = Math.random() * (canvas.width * 0.8) + 25;
      this.tempY = Math.random() * (canvas.height * 0.75) + 25;
      this.tempDx = Math.random() * 4 + 1;
      this.tempDy = Math.random() * 4 + 1;
      this.boxes.push(
        new Box(i, this.tempX, this.tempY, this.tempDx, this.tempDy)
      );
    };

    const animation = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      let box;
      for (let i = 0; i < this.boxes.length; i++) {
        box = this.boxes[i];
        if (box.x + box.radius > canvas.width || box.x - box.radius < 0) {
          box.dx = -box.dx;
        }
        if (box.y + box.radius > canvas.height || box.y - box.radius < 0) {
          box.dy = -box.dy;
        }

        box.x += box.dx;
        box.y += box.dy;
        box.draw();
      }
      requestAnimationFrame(animation);
    };

    const render = () => {
      let i = 0;
      for (i = 0; i < 10; i++) {
        create(i);
      }

      setInterval(() => {
        if (i === 21) i = 0;
        if (this.boxes.length > 20) {
          this.boxes.splice(0, 1);
        }

        create(i);
        i++;
      }, 1000);
      animation();
    };
    render();

    canvas.addEventListener('click', e => {
      this.mousePos.x = e.offsetX;
      this.mousePos.y = e.offsetY;

      let box;
      for (let i = 0; i < this.boxes.length; i++) {
        box = this.boxes[i];
        if (
          this.mousePos.x > box.x - box.radius &&
          this.mousePos.x < box.x + box.radius &&
          this.mousePos.y > box.y - box.radius &&
          this.mousePos.y < box.y + box.radius
        ) {
          this.selectedBox = box; // 겹친 박스중에 마지막으로 클릭된 box
        }
      }

      if (this.selectedBox) {
        const sb: BoxType = this.selectedBox;
        console.log(sb.index);
        this.selectedBox = null;
      }
    });
  },
});
</script>

<style lang="scss" scoped>
.canvas {
  canvas {
    margin: 0 auto;
    background: #e1e1e1;
  }
}
</style>
