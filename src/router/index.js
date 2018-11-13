import Vue from 'vue'
import Router from 'vue-router'

import BaseLayout from '@/views/BaseLayout.vue'
import Adventures from '@/views/Adventures.vue'
import AccountSettings from '@/components/AccountSettings.vue'
import AdventureCreateForm from '@/components/AdventureCreateForm'
import Adventure from '@/components/Adventure.vue'
import AdventureSettings from '@/components/AdventureSettings.vue'
import AdventureClueForm from '@/components/AdventureClueForm.vue'
import AdventurePointForm from '@/components/AdventurePointForm.vue'
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
          path: 'account',
          name: 'accountSettings',
          components: {
            default: AccountSettings
          }
        },
        {
          path: 'adventures/new',
          name: 'newAdventure',
          components: {
            default: AdventureCreateForm
          }
        },
        {
          path: 'adventures/:adventureId',
          components: {
            default: Adventure
          },
          children: [
            {
              path: '',
              name: 'adventureMap',
            },
            {
              path: 'settings',
              name: 'adventureSettings',
              components: {
                default: AdventureSettings
              }
            },
            {
              path: 'points/:pointId',
              name: 'adventurePoint',
              components: {
                default: AdventurePointForm
              }
            },
            {
              path: 'points/:pointId/clues/new',
              name: 'newAdventureClue',
              components: {
                default: AdventureClueForm
              }
            },
            {
              path: 'points/:pointId/clues/:clueId',
              name: 'adventureClue',
              components: {
                default: AdventureClueForm
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
