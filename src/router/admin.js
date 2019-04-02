import Vue from 'vue'
import Router from 'vue-router'

import BaseLayout from '@/views/admin/BaseLayout.vue'
import Login from '@/views/Login.vue'

/**
 * ADVENTURES MANAGEMENT
 */
import Adventures from '@/components/admin/Adventures.vue'

import AdventureList from '@/components/admin/AdventureList.vue'

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

import AdventurePublishing from '@/components/admin/AdventurePublishing.vue'

/**
 * USER MANAGEMENT
 */
import Users from '@/components/admin/users/Users.vue'

import PlayerList from '@/components/admin/users/PlayerList.vue'
import PlayerCreateForm from '@/components/admin/users/PlayerCreateForm.vue'
import PlayerEditForm from '@/components/admin/users/PlayerEditForm.vue'

import {
  ADVENTURES_PUBLISHED,
  ADVENTURES_IN_REVIEW,
  ADVENTURES_UNPUBLISHED,
  ADVENTURES_REJECTED,
  ADVENTURES_CANCELLED,
  ADVENTURES_PENDING
} from '@/config'

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
          redirect: '/adventures'
        },
        {
          path: 'account',
          name: 'accountSettings',
          component: null
        },
        {
          path: 'users',
          component: Users,
          children: [
            {
              path: '',
              name: 'users',
              redirect: 'players'
            },

            {
              path: 'players',
              name: 'players',
              component: PlayerList
            },
            {
              path: 'authors',
              name: 'authors',
              component: null
            },
          ]
        },
        {
          path: 'users/players/new',
          name: 'newPlayer',
          component: PlayerCreateForm
        },
        {
          path: 'users/players/:playerId',
          name: 'player',
          component: PlayerEditForm
        },

        {
          path: 'users/authors/new',
          name: 'newAuthor',
          component: null
        },
        {
          path: 'users/authors/:authorId',
          name: 'author',
          component: null
        },
        {
          path: 'adventures',
          component: Adventures,
          children: [
            {
              path: '',
              name: 'home',
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
            },
            {
              path: 'rejected',
              name: 'adventuresRejected',
              component: AdventureList,
              props: {
                listType: ADVENTURES_REJECTED
              }
            },
            { path: 'cancelled',
              name: 'adventuresCancelled',
              component: AdventureList,
              props: {
                listType: ADVENTURES_CANCELLED
              }
            },
            { path: 'pending',
              name: 'adventuresPending',
              component: AdventureList,
              props: {
                listType: ADVENTURES_PENDING
              }
            }
          ]
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
      redirect: '/adventures'
    }
  ],
  scrollBehavior (to, from, _) {
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
