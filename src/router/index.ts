import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NotFound from '../views/NotFound.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MainPage',
    component: () => import('../views/MainPage.vue'),
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: () => import('../views/AboutPage.vue'),
  },
  {
    path: '/canvas',
    name: 'CanvasPage',
    component: () => import('../views/CanvasPage.vue'),
  },
  {
    path: '/composition',
    name: 'CompositionTestPage',
    component: () => import('../views/CompositionTestPage.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
