import api from '@/api';

import { SET_ADVENTURES, CLEAR_NEW_ADVENTURE,
         SET_LOADING, SET_ERROR,
         SET_ADVENTURE, CLEAR_ADVENTURE,
         SET_ADVENTURE_POINTS, CLEAR_ADVENTURE_POINTS
       } from './mutation-types';
import { LOAD_ADVENTURES, LOAD_ADVENTURE } from './action-types';

export default {
  namespaced: true,
  state: {
    list: [],
    item: { },
    points: [],

    newAdventure: { },

    loading: false,
    error: null
  },
  getters: {
    startingPoint: (state) => {
      return state.points[0];
    },
    puzzlePoints: (state) => {
      return state.points.filter((element, index) => {
        return index > 0;
      });
    }
  },
  mutations: {
    [SET_ADVENTURES] (state, adventures) {
      state.list = adventures;
    },

    [SET_ADVENTURE] (state, adventure) {
      state.item = adventure;
    },

    [CLEAR_ADVENTURE] (state) {
      state.adventre = { };
    },

    [SET_ADVENTURE_POINTS] (state, points) {
      state.points = points;
    },

    [CLEAR_ADVENTURE_POINTS] (state) {
      state.points = [];
    },

    [CLEAR_NEW_ADVENTURE] (state) {
      state.newAdventure = { };
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
    [LOAD_ADVENTURE] ({ commit }, { id }) {
      commit(CLEAR_ADVENTURE);
      commit(CLEAR_ADVENTURE_POINTS);

      commit(SET_LOADING, true);

      api.adventures.loadAdventure(id)
        .then( response => {
          commit(SET_ADVENTURE, response.data);

          return api.adventures.loadPoints(id);
        })
        .then( response => {
          commit(SET_ADVENTURE_POINTS, response.data);

          commit(SET_LOADING, false);
        })
        .catch( error => {
          commit(SET_ERROR, error);
        });
    }
  }
}
