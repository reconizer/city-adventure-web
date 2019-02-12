import Vue from 'vue';
import { i18n } from '@/translations/i18n'

import {
  SET_LOADING, SET_ERROR,
  SET_ADVENTURE, CLEAR_ADVENTURE,
  SET_ADVENTURE_STATUS,

  SET_ADVENTURE_POINTS, CLEAR_ADVENTURE_POINTS, 
  SET_POINT, ADD_POINT, REMOVE_POINT,
  SET_POINTS_ORDER,

  SET_CLUE, ADD_CLUE, REMOVE_CLUE,
} from '@/store/mutation-types';

import {
  LOAD_ADVENTURE, UPDATE_ADVENTURE,
  UPDATE_POINT, CREATE_POINT, DESTROY_POINT,
  UPDATE_POINTS,
  UPDATE_CLUE, CREATE_CLUE, DESTROY_CLUE,
  UPDATE_CLUES,
} from '@/store/action-types';

import {
  ADVENTURES_PUBLISHED,
  ADVENTURES_IN_REVIEW,
  ADVENTURES_PENDING,
  ADVENTURES_REJECTED,
  ADVENTURES_CANCELLED,
  ADVENTURES_UNPUBLISHED
} from '@/config'

export default (api) => {
  return {
    namespaced: true,
    state: {
      item: { status: null },
      points: [],
      history: [],

      loading: false,
      errors: {
        [LOAD_ADVENTURE]: null, [UPDATE_ADVENTURE]: null,

        [UPDATE_POINT]: null, [CREATE_POINT]: null,
        [DESTROY_POINT]: null, [UPDATE_POINTS]: null,

        [UPDATE_CLUE]: null, [CREATE_CLUE]: null,
        [DESTROY_CLUE]: null, [UPDATE_CLUES]: null
      }
    },
    getters: {
      startingPoint: (state) => {
        return state.points[0] || null;
      },
      puzzlePoints: (state) => {
        return state.points.filter((element, index) => {
          return index > 0;
        });
      },

      published: (state) => state.item.status == ADVENTURES_PUBLISHED,
      inReview: (state) => state.item.status == ADVENTURES_IN_REVIEW,
      pending: (state) => state.item.status == ADVENTURES_PENDING,
      rejected: (state) => state.item.status == ADVENTURES_REJECTED,
      cancelled: (state) => state.item.status == ADVENTURES_CANCELLED,
      unpublished: (state) => state.item.status == ADVENTURES_UNPUBLISHED,

      publishedStatusLabel: (state) => {
        switch(state.item.status) {
          default:
          case ADVENTURES_PUBLISHED:
            return i18n.t("adventures.adventure_published");
          case ADVENTURES_IN_REVIEW:
            return i18n.t("adventures.adventure_in_review");
          case ADVENTURES_UNPUBLISHED:
            return i18n.t("adventures.adventure_unpublished");
          case ADVENTURES_REJECTED:
            return i18n.t("adventures.adventure_rejected");
          case ADVENTURES_PENDING:
            return i18n.t("adventures.adventure_pending");
          case ADVENTURES_CANCELLED:
            return i18n.t("adventures.adventure_cancelled");
        }
      },

      editable: (_, getters) => getters.pending
    },
    mutations: {
      /**
       * ADVENTURE
       */
      [SET_ADVENTURE] (state, adventure) {
        state.item = adventure;
      },

      [CLEAR_ADVENTURE] (state) {
        state.item = { };
      },

      [SET_ADVENTURE_POINTS] (state, points) {
        points.forEach((point) => {
          point.clues = point.clues.sort((c1, c2) => c1.order > c2.order);
        });

        state.points = points;
      },

      [CLEAR_ADVENTURE_POINTS] (state) {
        state.points = [];
      },

      /**
       * POINTS
       */
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

      /**
       * CLUES
       */
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

      /**
       * PUBLISHMENT-RELATED
       */
      [SET_ADVENTURE_STATUS] (state, status) {
        state.item.status = status;
      },

      /**
       * GENERAL
       */
      [SET_LOADING] (state, loading) {
        state.loading = loading;
      },

      [SET_ERROR] (state, { key, error }) {
        state.errors[key] = error;
      }
    },
    actions: {
      /**
       * ADVENTURE
       */
      [LOAD_ADVENTURE] ({ commit }, { id }) {
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

            return values;
          })
          .catch( error => {
            commit(SET_ERROR, { key: LOAD_ADVENTURE, error: error.response.data });
            commit(SET_LOADING, false);

            throw error;
          });
      },

      [UPDATE_ADVENTURE] ({ commit, state }, { params }) {
        commit(SET_LOADING, true);
        commit(SET_ERROR, { key: UPDATE_ADVENTURE, error: null });

        return api.adventures.updateAdventure(state.item.id, params)
          .then( response => {
            return api.adventures.loadAdventure(state.item.id)
          }).then( response => {
            commit(SET_ADVENTURE, response.data);

            commit(SET_LOADING, false);

            return response;
          })
          .catch( error => {
            commit(SET_ERROR, { key: UPDATE_ADVENTURE, error: error.response.data })
            commit(SET_LOADING, false);

            throw error;
          });
      },

      /**
       * POINTS
       */
      [CREATE_POINT] ({ commit, state }, { parentId, lat, lng }) {
        commit(SET_LOADING, true);

        return api.adventures.createPoint(state.item.id, parentId, lat, lng)
          .then( response => {
            commit(ADD_POINT, response.data);

            commit(SET_LOADING, false);

            return response;
          })
          .catch( error => {
            commit(SET_ERROR, { key: CREATE_POINT, error: error.response.data });
            commit(SET_LOADING, false);

            throw error;
          });
      },

      [UPDATE_POINT] ({ commit, state }, { pointId, params }) {
        commit(SET_LOADING, true);

        return api.adventures.updatePoint(state.item.id, pointId, params)
          .then( response => {
            return api.adventures.loadPoints(state.item.id);
          }).then( response => {
            commit(SET_ADVENTURE_POINTS, response.data);
            commit(SET_LOADING, false);

            return response;
          })
          .catch( error => {
            commit(SET_ERROR, { key: UPDATE_POINT, error: error.response.data });
            commit(SET_LOADING, false);

            throw error;
          });
      },

      [DESTROY_POINT] ({ commit, state }, { pointId }) {
        commit(SET_LOADING, true);

        return api.adventures.destroyPoint(state.item.id, pointId)
          .then( response => {
            commit(REMOVE_POINT, pointId);

            commit(SET_LOADING, false);

            return response;
          })
          .catch( error => {
            commit(SET_ERROR, { key: DESTROY_POINT, error: error.response.data });
            commit(SET_LOADING, false);

            throw error;
          });
      },

      // Used for re-ordering points
      [UPDATE_POINTS] ({ commit, state }, { payload }) {
        commit(SET_LOADING, true);

        return api.adventures.updatePoints(state.item.id, payload)
          .then( response => {
            commit(SET_POINTS_ORDER, payload);
            commit(SET_LOADING, false);

            return response;
          })
          .catch( error => {
            commit(SET_ERROR, { key: UPDATE_POINTS, error: error.response.data });
            commit(SET_LOADING, false);

            throw error;
          });
      },

      /**
       * CLUES
       */
      [CREATE_CLUE] ({ commit, state }, { pointId, data }) {
        commit(SET_LOADING, true);

        return api.adventures.createClue(state.item.id, pointId, data)
          .then( response => {
            commit(ADD_CLUE, {
              pointId: pointId,
              data: response.data
            });

            commit(SET_LOADING, false);

            return response;
          })
          .catch( error => {
            commit(SET_ERROR, { key: CREATE_CLUE, error: error.response.data });
            commit(SET_LOADING, false);

            throw error;
          });
      },

      [UPDATE_CLUE] ({ commit, state }, { pointId, clueId, data }) {
        commit(SET_LOADING, true);

        return api.adventures.updateClue(state.item.id, pointId, clueId, data)
          .then( response => {
            return api.adventures.loadPoints(state.item.id);
          }).then( response => {
            commit(SET_ADVENTURE_POINTS, response.data);
            commit(SET_LOADING, false);

            return response;
          })
          .catch( error => {
            commit(SET_ERROR, { key: UPDATE_CLUE, error: error.response.data });
            commit(SET_LOADING, false);

            throw error;
          });
      },

      [DESTROY_CLUE] ({ commit, state }, { pointId, clueId }) {
        commit(SET_LOADING, true);

        return api.adventures.destroyClue(state.item.id, pointId, clueId)
          .then( response => {
            commit(REMOVE_CLUE, { pointId, clueId });

            commit(SET_LOADING, false);

            return response;
          })
          .catch( error => {
            commit(SET_ERROR, { key: DESTROY_CLUE, error: error.response.data });
            commit(SET_LOADING, false);

            throw error;
          });
      },

      // Used for re-ordering clues
      [UPDATE_CLUES] ({ commit, state }, { payload }) {
        commit(SET_LOADING, true);

        return api.adventures.updateClues(state.item.id, payload)
          .then( response => {
            //TODO does not require any response?
            //TODO does it require state manipulation?

            commit(SET_LOADING, false);

            return response;
          })
          .catch( error => {
            commit(SET_ERROR, { key: UPDATE_CLUES, error: error.response.data });
            commit(SET_LOADING, false);

            throw error;
          });
      }
    }
  }
}
