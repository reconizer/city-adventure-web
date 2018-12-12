import Vue from 'vue'
import Router from 'vue-router'

import BaseLayout from '@/views/admin/BaseLayout.vue'
import Login from '@/views/Login.vue'

import Adventures from '@/components/admin/Adventures.vue'

import AdventureList from '@/components/admin/AdventureList.vue'

import {
  ADVENTURES_PUBLISHED,
  ADVENTURES_IN_REVIEW,
  ADVENTURES_UNPUBLISHED
} from '@/config'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: BaseLayout,
      children: [
        {
          path: '',
          redirect: '/adventures'
        },
        {
          path: 'account',
          name: 'accountSettings',
          component: null
        },
        {
          path: 'adventures',
          component: Adventures,
          children: [
            {
              path: '',
              redirect: 'published'
            },
            {
              path: 'published',
              name: 'adventuresPublished',
              component: AdventureList,
              props: {
                listType: ADVENTURES_PUBLISHED
              }
            },
            {
              path: 'in-review',
              name: 'adventuresInReview',
              component: AdventureList,
              props: {
                listType: ADVENTURES_IN_REVIEW
              }
            },
            {
              path: 'unpublished',
              name: 'adventuresUnpublished',
              component: AdventureList,
              props: {
                listType: ADVENTURES_UNPUBLISHED
              }
            }
          ]
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
      redirect: '/adventures'
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
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
