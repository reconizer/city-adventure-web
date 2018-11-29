import api from '@/api';
import Vue from 'vue';

import router from '@/router';

import {
  SET_LOADING, SET_ERROR,
  SET_ADVENTURE, CLEAR_ADVENTURE,
  SET_ADVENTURE_POINTS, CLEAR_ADVENTURE_POINTS, 
  SET_POINT, ADD_POINT, REMOVE_POINT,
  SET_CLUE, ADD_CLUE, REMOVE_CLUE,
  SET_POINTS, SET_POINTS_ORDER
} from './mutation-types';


import {
  LOAD_ADVENTURE, UPDATE_ADVENTURE,
  UPDATE_POINT, CREATE_POINT, DESTROY_POINT,
  UPDATE_POINTS,
  UPDATE_CLUE, CREATE_CLUE, DESTROY_CLUE,
  UPDATE_CLUES
} from './action-types';

export default {
  namespaced: true,
  state: {
    item: { points: [] },
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
      state.item = { };
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

      let params = Object.assign({ }, state.points[index], data);

      Vue.set(state.points, index, params);
    },

    [REMOVE_POINT] (state, pointId) {
      let index = state.points.findIndex(point => point.id == pointId);

      let child = state.points.find(point => point.parent_id == pointId);

      if(child) {
        let point = state.points[index];

        child.parent_id = point.parent_id;

        Vue.set(state.points, index + 1, child);
      }

      state.points.splice(index, 1);
    },

    [ADD_CLUE] (state, { pointId, data }) {
      let index = state.points.findIndex(item => item.id == pointId);
      let pointData = state.points[index]

      pointData.clues.push(data);

      Vue.set(state.points, index, pointData);
    },

    [SET_CLUE] (state, { pointId, clueId, data }) {
      let pointIndex = state.points.findIndex(item => item.id == pointId);
      let pointData = state.points[pointIndex];

      let index = pointData.clues.findIndex(item => item.id == clueId);

      Vue.set(state.points[pointIndex].clues, index, data)
    },

    [REMOVE_CLUE] (state, { pointId, clueId }) {
      let point = state.points.find(point => point.id == pointId);

      let index = point.clues.findIndex(clue => clue.id == clueId);

      point.clues.splice(index, 1);
    },

    [SET_POINTS] (state, values) {
      state.points = values;
    },

    [SET_POINTS_ORDER] (state, values) {
      let newPoints = [];

      for(let i = 0; i < values.length; i++) {
        let index = state.points.findIndex(point => point.id == values[i].id);

        let pointData = state.points[index];

        pointData.parent_id = values[i].parent_id;

        newPoints.push(pointData);
      }

      state.points = [state.points[0], ...newPoints];
    },

    [SET_LOADING] (state, loading) {
      state.loading = loading;
    },

    [SET_ERROR] (state, error) {
      console.log(error);
      state.error = error;
    }
  },
  actions: {
    [LOAD_ADVENTURE] ({ commit, state }, { id }) {
      commit(CLEAR_ADVENTURE);
      commit(CLEAR_ADVENTURE_POINTS);

      commit(SET_LOADING, true);

      return Promise.all([
        api.adventures.loadAdventure(id),
        api.adventures.loadPoints(id)
      ]).then( (values) => {
          commit(SET_ADVENTURE, values[0].data);
          commit(SET_ADVENTURE_POINTS, values[1].data);

          commit(SET_LOADING, false);

          if(router.currentRoute.params.pointId) {
            let pointId = router.currentRoute.params.pointId;

            let point = state.points.find(point => point.id == pointId);

            if(point) {
              if(router.currentRoute.params.clueId) {
                let clue = point.clues.find(clue => clue.id == router.currentRoute.params.clueId);

                if(!clue) {
                  router.replace({ name: 'adventureMap', params: { adventureId: state.item.id } });
                }
              }
            } else {
              router.replace({ name: 'adventureMap', params: { adventureId: state.item.id } });
            }
          }
        })
        .catch( error => {
          commit(SET_ERROR, error)

          router.replace({ name: 'home' });
        });
    },

    [UPDATE_ADVENTURE] ({ commit }, { adventureId, params }) {
      commit(SET_LOADING, true);

      api.adventures.updateAdventure(adventureId, params)
        .then( response => {
          commit(SET_ADVENTURE, response.data);

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

    [UPDATE_POINTS] ({ commit }, { payload }) {
      commit(SET_LOADING, true);

      api.adventures.updatePoints(payload)
        .then( response => {
          //TODO does not require any response?
          //TODO does it require state manipulation?

          commit(SET_POINTS_ORDER, payload);
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
    },

    [DESTROY_POINT] ({ commit, state }, { pointId }) {
      commit(SET_LOADING, true);

      api.adventures.destroyPoint(pointId)
        .then( response => {
          commit(REMOVE_POINT, pointId);

          commit(SET_LOADING, false);

          // If we remove a point which has currently opened form - go to map
          if(router.currentRoute.name == "adventurePoint" && router.currentRoute.params.pointId == pointId) {
            setTimeout(() => {
              router.replace({ name: 'adventureMap', params: { adventureId: state.item.id } });
            }, 0);
          }
        })
        .catch( error => commit(SET_ERROR, error));
    },

    [CREATE_CLUE] ({ commit, state }, { pointId, data }) {
      commit(SET_LOADING, true);

      api.adventures.createClue(pointId, data)
        .then( response => {
          commit(ADD_CLUE, {
            pointId: pointId,
            data: response.data
          });

          commit(SET_LOADING, false);

          setTimeout(() => {
            router.replace({
              name: 'adventureClue',
              params: {
                adventureId: state.item.id,
                pointId: pointId,
                clueId: response.data.id
              }
            });
          }, 0);

        })
        .catch( error => commit(SET_ERROR, error));
    },

    [UPDATE_CLUE] ({ commit }, { pointId, clueId, data }) {
      commit(SET_LOADING, true);

      api.adventures.updateClue(pointId, clueId, data)
        .then( response => {
          commit(SET_CLUE, {
            pointId: pointId,
            clueId: clueId,
            data: response.data
          })

          commit(SET_LOADING, false);
        })
        .catch( error => commit(SET_ERROR, error));
    },

    [DESTROY_CLUE] ({ commit, state }, { pointId, clueId }) {
      commit(SET_LOADING, true);

      api.adventures.destroyClue(clueId)
        .then( response => {
          commit(REMOVE_CLUE, { pointId, clueId });

          commit(SET_LOADING, false);

          setTimeout(() => {
            router.replace({
              name: 'adventureMap',
              params: {
                adventureId: state.item.id,
              }
            });
          }, 0);
        })
        .catch( error => commit(SET_ERROR, error));
    }
  }
}
