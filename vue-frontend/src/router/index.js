import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import TestingView from '@/views/TestingView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/testing',
    name: 'testing',
    component: TestingView
  },
  {
    path: '/explore-undertone',
    name: 'explore-undertone',
    component: () => import('@/views/ExploreUndertone.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutUs.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactUs.vue')
  },
  // Redirect all unmatched routes to home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // Always scroll to top when navigating
    return { top: 0 };
  }
});

export default router;
