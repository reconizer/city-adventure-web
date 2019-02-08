import Vue from 'vue'
import Vuex from 'vuex'

import authentication from './authentication.module'
import adventures from './adventures.module'
import adventure from './adventure.module'
import analytics from './analytics.module'
import publishment from './publishment.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authentication,
    adventures,
    adventure,
    analytics,
    publishment
  }
})
