import api from '@/api'
import Vue from 'vue'

import router from '@/router'

import {
  SET_LOADING, SET_ERROR
} from './mutation-types'

import {
} from './action-types'

export default {
  namespaced: true,
  state: {
    overview: {
      purchases: {},
      impressions: {},
      ratings: {},
      rankings: {}
    },
    userProgress: {
    },
    monetization: {
    }
  },
  mutations: {
  },
  actions: {
  }
}
