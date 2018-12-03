import api from '@/api';

import { SET_ADVENTURES, SET_LOADING, SET_ERROR } from './mutation-types';
import { LOAD_ADVENTURES, CREATE_ADVENTURE } from './action-types';

import router from '@/router'

export default {
  namespaced: true,
  state: {
    list: [],

    loading: false,
    error: null
  },
  mutations: {
    [SET_ADVENTURES] (state, adventures) {
      state.list = adventures;
    },

    [SET_LOADING] (state, loading) {
      state.loading = loading;
    },

    [SET_ERROR] (state, error) {
      state.error = error;
    }
  },
  actions: {
    [LOAD_ADVENTURES] ({ commit }, { page }) {
      commit(SET_LOADING, true);

      api.adventures.loadAdventures(page)
        .then( response => {
          commit(SET_ADVENTURES, response.data);
          commit(SET_LOADING, false);
        })
        .catch( error => {
          commit(SET_ERROR, error);
        });
    },

    [CREATE_ADVENTURE] ({ commit }, { params }) {
      commit(SET_LOADING, true);

      api.adventures.createAdventure(params)
        .then( response => {
          commit(SET_LOADING, false);

          localStorage.setItem(`${response.data.id}-name`, response.data.adventure.name);
          localStorage.setItem(`${response.data.id}-point`, JSON.stringify(response.data.startingPointPosition));

          router.push({
            name: 'adventureMap',
            params: {
              adventureId: response.data.id
            }
          });
        })
        .catch( error => {
          commit(SET_ERROR, error);
        });
    }
  }
}
