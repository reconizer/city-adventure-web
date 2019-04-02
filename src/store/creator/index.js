import Vue from 'vue'
import Vuex from 'vuex'
import accountSettings from './account_settings.module'
import adventure from './adventure.module'
import adventures from './adventures.module'
import analytics from './analytics.module'
import authentication from './authentication.module'
import profileSettings from './profile_settings.module'
import publishment from './publishment.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    accountSettings,
    adventure,
    adventures,
    analytics,
    authentication,
    profileSettings,
    publishment
  }
})
