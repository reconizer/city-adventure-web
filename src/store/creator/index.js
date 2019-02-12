import Vue from 'vue'
import Vuex from 'vuex'
import accountSettings from './accountSettings.module'
import adventure from './adventure.module'
import adventures from './adventures.module'
import analytics from './analytics.module'
import authentication from './authentication.module'
import publishment from './publishment.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    accountSettings,
    adventure,
    adventures,
    analytics,
    authentication,
    publishment
  }
})
