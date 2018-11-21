import Vue from 'vue'
import Router from 'vue-router'

import BaseLayout from '@/views/BaseLayout.vue'
import Adventures from '@/views/Adventures.vue'
import AdventureCreateForm from '@/components/AdventureCreateForm'

import AccountSettings from '@/components/AccountSettings.vue'

import Adventure from '@/components/Adventure.vue'
import AdventureSettings from '@/views/AdventureSettings.vue'
import AdventureSettingsForm from '@/components/AdventureSettingsForm.vue'
import AdventureClueForm from '@/components/AdventureClueForm.vue'
import AdventurePointForm from '@/components/AdventurePointForm.vue'

import AdventureAnalytics from '@/views/AdventureAnalytics.vue'

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
          component: Adventures
        },
        {
          path: 'account',
          name: 'accountSettings',
          component: AccountSettings
        },
        {
          path: 'adventures/new',
          name: 'newAdventure',
          component: AdventureCreateForm
        },
        {
          path: 'adventures/:adventureId',
          component: Adventure,
          children: [
            {
              path: '',
              name: 'adventureMap',
            },
            {
              path: 'settings',
              component: AdventureSettings,
              children: [
                {
                  path: '',
                  name: 'adventureSettings',
                  component: AdventureSettingsForm
                },
                {
                  path: 'publishing',
                  name: 'adventurePublishing'
                },
                {
                  path: 'analytics',
                  component: AdventureAnalytics,
                  children: [
                    {
                      path: '',
                      name: 'adventureAnalytics'
                    },
                    {
                      path: 'progression',
                      name: 'adventureAnalyticsProgression'
                    },
                    {
                      path: 'monetization',
                      name: 'adventureAnalyticsMonetization'
                    }
                  ]
                },
                {
                  path: 'testing',
                  name: 'adventureTesting'
                }
              ]
            },
            {
              path: 'points/:pointId',
              name: 'adventurePoint',
              component: AdventurePointForm
            },
            {
              path: 'points/:pointId/clues/new',
              name: 'newAdventureClue',
              component: AdventureClueForm
            },
            {
              path: 'points/:pointId/clues/:clueId',
              name: 'adventureClue',
              component: AdventureClueForm
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
