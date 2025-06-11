import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import TestingView from '@/views/TestingView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { 
      requiresInternet: false, // Home page available offline
      cacheForOffline: true
    }
  },
  {
    path: '/testing',
    name: 'testing',
    component: TestingView,
    meta: {
      requiresInternet: true, // Testing feature requires internet
      cacheForOffline: false
    }
  },
  {
    path: '/explore-undertone',
    name: 'explore-undertone',
    component: () => import('@/views/ExploreUndertone.vue'),
    meta: {
      requiresInternet: false, // Static content about undertones
      cacheForOffline: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutUs.vue'),
    meta: {
      requiresInternet: false, // Static content about the team
      cacheForOffline: true
    }
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('@/views/Feedback.vue'),
    meta: {
      requiresInternet: true, // Sending feedback requires internet
      cacheForOffline: false
    }
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
