import Vue from 'vue'
import Router from 'vue-router'

import BaseLayout from '@/views/BaseLayout.vue'
import Login from '@/views/Login.vue'

Vue.use(Router)

const router = new Router({
  mode: process.env.NODE_ENV === 'production' ? 'hash' : 'history',
  routes: [
    {
      path: '/',
      component: BaseLayout,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if(authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});

export default router;
