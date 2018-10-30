import api from '@/api';
import Vue from 'vue';

import {
  SET_LOADING, SET_ERROR,
  SET_ADVENTURE, CLEAR_ADVENTURE,
  SET_ADVENTURE_POINTS, CLEAR_ADVENTURE_POINTS, 
  SET_POINT, ADD_POINT
} from './mutation-types';

import {
  LOAD_ADVENTURE, UPDATE_POINT,
  UPDATE_CLUES, CREATE_POINT
} from './action-types';

export default {
  namespaced: true,
  state: {
    item: { },
    points: [],

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

    [ADD_POINT] (state, point) {
      state.points.push(point);
    },

    [SET_POINT] (state, { id, data }) {
      let index = state.points.findIndex(item => item.id == id);

      Vue.set(state.points, index, data);
    },

    [SET_LOADING] (state, loading) {
      state.loading = loading;
    },

    [SET_ERROR] (state, error) {
      state.error = error;
    }
  },
  actions: {
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
        .catch( error => commit(SET_ERROR, error));
    },

    [UPDATE_POINT] ({ commit }, { adventureId, pointId, params }) {
      commit(SET_LOADING, true);

      api.adventures.updatePoint(adventureId, pointId, params)
        .then( response => {
          commit(SET_POINT, { id: pointId, data: response.data });

          commit(SET_LOADING, false);
        })
        .catch( error => commit(SET_ERROR, error));
    },

    [UPDATE_CLUES] ({ commit }, { payload }) {
      commit(SET_LOADING, true);

      api.adventures.updateClues(payload)
        .then( response => {
          //TODO does not require any response?
          //TODO does it require state manipulation?

          commit(SET_LOADING, false);
        })
        .catch( error => commit(SET_ERROR, error));
    },

    [CREATE_POINT] ({ commit }, { adventureId, parentId, lat, lng }) {
      commit(SET_LOADING, true);

      api.adventures.createPoint(adventureId, parentId, lat, lng)
        .then( response => {
          commit(ADD_POINT, response.data);

          commit(SET_LOADING, false);
        })
        .catch( error => commit(SET_ERROR, error));
    }
  }
}
