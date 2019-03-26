import Vue from 'vue'
import Router from 'vue-router'

import BaseLayout from '@/views/creator/BaseLayout.vue'
import Adventures from '@/views/creator/Adventures.vue'
import AdventureCreateForm from '@/components/shared/AdventureCreateForm'

import Settings from '@/components/creator/Settings.vue'
import AccountSettings from '@/components/creator/AccountSettings.vue'
import ProfileSettings from '@/components/creator/ProfileSettings.vue'

import Adventure from '@/components/shared/Adventure.vue'
import AdventureSettings from '@/views/AdventureSettings.vue'
import AdventureSettingsForm from '@/components/shared/AdventureSettingsForm.vue'
import AdventureClueCreateForm from '@/components/shared/AdventureClueCreateForm.vue'
import AdventureClueEditForm from '@/components/shared/AdventureClueEditForm.vue'
import AdventurePointForm from '@/components/shared/AdventurePointForm.vue'

import AdventureAnalytics from '@/views/AdventureAnalytics.vue'
import AdventureAnalyticsOverview from '@/components/shared/AdventureAnalyticsOverview.vue'
import AdventureAnalyticsUserCompletion from '@/components/shared/AdventureAnalyticsUserCompletion.vue'
import AdventureAnalyticsUserProgress from '@/components/shared/AdventureAnalyticsUserProgress.vue'

import AdventurePublishing from '@/components/creator/AdventurePublishing.vue'

import Login from '@/views/Login.vue'

Vue.use(Router)

const router = new Router({
  mode: process.env.NODE_ENV === 'production' ? 'history' : 'hash',
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
          path: 'settings',
          component: Settings,
          children: [
            {
              path: '',
              name: 'profileSettings',
              component: ProfileSettings
            },
            {
              path: 'account',
              name: 'accountSettings',
              component: AccountSettings
            }
          ]
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
                  name: 'adventurePublishing',
                  component: AdventurePublishing
                },
                {
                  path: 'analytics',
                  component: AdventureAnalytics,
                  children: [
                    {
                      path: '',
                      name: 'adventureAnalytics',
                      component: AdventureAnalyticsOverview
                    },
                    {
                      path: 'completion',
                      name: 'adventureAnalyticsCompletion',
                      component: AdventureAnalyticsUserCompletion
                    },
                    {
                      path: 'progression',
                      name: 'adventureAnalyticsProgression',
                      component: AdventureAnalyticsUserProgress
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
              component: AdventureClueCreateForm
            },
            {
              path: 'points/:pointId/clues/:clueId',
              name: 'adventureClue',
              component: AdventureClueEditForm
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
