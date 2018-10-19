import Vue from 'vue'
import Router from 'vue-router'

import BaseLayout from '@/views/BaseLayout.vue'
import Adventures from '@/views/Adventures.vue'
import Adventure from '@/views/Adventure.vue'
import Login from '@/views/Login.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: BaseLayout,
      children: [
        {
          path: '',
          name: 'home',
          components: {
            default: Adventures
          }
        },
        {
          path: ':adventureId',
          name: 'adventure',
          components: {
            default: Adventure
          }
        }
      ]
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
