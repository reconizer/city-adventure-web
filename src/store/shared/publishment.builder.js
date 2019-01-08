import {
  SET_LOADING, SET_ERROR, SET_ADVENTURE_STATUS,

  CLEAR_PUBLISHMENT_HISTORY, SET_PUBLISHMENT_HISTORY,
  ADD_MESSAGE
} from '@/store/mutation-types';

import {
  LOAD_PUBLISHMENT_HISTORY, CREATE_PUBLISHMENT_MESSAGE,
  REQUEST_REVIEW, PUBLISH, START_EDITING
} from '@/store/action-types';

export default (api) => {
  return {
    namespaced: true,
    state: {
      history: [],

      loading: false,
      error: null
    },
    mutations: {
      /**
       * PUBLISHMENT
       */
      [CLEAR_PUBLISHMENT_HISTORY] (state) {
        state.history = [];
      },

      [SET_PUBLISHMENT_HISTORY] (state, history) {
        state.history = history;
      },

      [ADD_MESSAGE] (state, msg) {
        state.history.push(msg);
      },

      /**
       * GENERAL
       */
      [SET_LOADING] (state, loading) {
        state.loading = loading;
      },

      [SET_ERROR] (state, error) {
        console.log(error);
        state.error = error;
      }
    },
    actions: {
      [LOAD_PUBLISHMENT_HISTORY] ({ commit, state }, { adventureId }) {
        commit(SET_LOADING, true);
        commit(CLEAR_PUBLISHMENT_HISTORY);

        return api.publishment.loadHistory(adventureId)
          .then( response => {
            commit(SET_LOADING, false);
            commit(SET_PUBLISHMENT_HISTORY, response.data);

            return response;
          })
          .catch( error => commit(SET_ERROR, error));
      },

      [CREATE_PUBLISHMENT_MESSAGE] ({ commit, state }, { adventureId, message }) {
        commit(SET_LOADING, true);

        return api.publishment.sendMessage(adventureId, message)
          .then( response => {
            commit(SET_LOADING, false);
            commit(ADD_MESSAGE, response.data);

            return response;
          })
          .catch( error => commit(SET_ERROR, error));
      },

      [REQUEST_REVIEW] ({ commit, state }, { adventureId }) {
        commit(SET_LOADING, true);

        return api.publishment.requestReview(adventureId)
          .then( response => {
            commit(SET_LOADING, false);
            commit(`adventure/${SET_ADVENTURE_STATUS}`, response.data.status);

            return response;
          })
          .catch( error => commit(SET_ERROR, error));
      },

      [PUBLISH] ({ commit, state }, { adventureId }) {
        commit(SET_LOADING, true);

        return api.publishment.publish(adventureId)
          .then( response => {
            commit(SET_LOADING, false);
            commit(`adventure/${SET_ADVENTURE_STATUS}`, response.data.status);

            return response;
          })
          .catch( error => commit(SET_ERROR, error));
      },

      [START_EDITING] ({ commit, state }, { adventureId }) {
        commit(SET_LOADING, true);

        return api.publishment.startEditing(adventureId)
          .then( response => {
            commit(SET_LOADING, false);
            commit(`adventure/${SET_ADVENTURE_STATUS}`, response.data.status);
            
            return response;
          })
          .catch( error => commit(SET_ERROR, error));
      }
    }
  };
}
