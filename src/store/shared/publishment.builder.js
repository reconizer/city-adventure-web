import {
  SET_LOADING, SET_ERROR, SET_ADVENTURE_STATUS,

  CLEAR_PUBLISHMENT_HISTORY, ADD_PUBLISHMENT_HISTORY,
  ADD_MESSAGE
} from '@/store/mutation-types';

import {
  LOAD_PUBLISHMENT_HISTORY, CREATE_PUBLISHMENT_MESSAGE,
  REQUEST_REVIEW, PUBLISH, START_EDITING
} from '@/store/action-types';

import {
  ADVENTURES_PENDING,
  ADVENTURES_IN_REVIEW,
  ADVENTURES_PUBLISHED
} from '@/config'

export default (api) => {
  return {
    namespaced: true,
    state: {
      history: [],

      loading: false,
      errors: {
        [LOAD_PUBLISHMENT_HISTORY]: null,
        [CREATE_PUBLISHMENT_MESSAGE]: null,

        [REQUEST_REVIEW]: null,
        [PUBLISH]: null,
        [START_EDITING]: null
      }
    },
    mutations: {
      /**
       * PUBLISHMENT
       */
      [CLEAR_PUBLISHMENT_HISTORY] (state) {
        state.history = [];
      },

      [ADD_PUBLISHMENT_HISTORY] (state, history) {
        state.history.unshift(...history);
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

      [SET_ERROR] (state, { key, error }) {
        state.errors[key] = error;
      }
    },
    actions: {
      [LOAD_PUBLISHMENT_HISTORY] ({ commit }, { page, timestamp, adventureId }) {
        commit(SET_LOADING, true);

        if(page == 1) {
          commit(CLEAR_PUBLISHMENT_HISTORY);
        }

        return api.publishment.loadHistory(adventureId, timestamp, page)
          .then( response => {
            commit(SET_LOADING, false);
            commit(ADD_PUBLISHMENT_HISTORY, response.data);

            return response;
          })
          .catch( error => commit(SET_ERROR, { key: LOAD_PUBLISHMENT_HISTORY, error: error }));
      },

      [CREATE_PUBLISHMENT_MESSAGE] ({ commit }, { adventureId, message }) {
        commit(SET_LOADING, true);

        return api.publishment.sendMessage(adventureId, message)
          .then( response => {
            commit(SET_LOADING, false);
            commit(ADD_MESSAGE, response.data);

            return response;
          })
          .catch( error => commit(SET_ERROR, { key: CREATE_PUBLISHMENT_MESSAGE, error: error }));
      },

      [REQUEST_REVIEW] ({ commit }, { adventureId }) {
        commit(SET_LOADING, true);

        return api.publishment.requestReview(adventureId)
          .then( response => {
            commit(SET_LOADING, false);
            commit(`adventure/${SET_ADVENTURE_STATUS}`, ADVENTURES_IN_REVIEW, { root: true });
            commit(ADD_MESSAGE, response.data);

            return response;
          })
          .catch( error => commit(SET_ERROR, { key: REQUEST_REVIEW, error: error }));
      },

      [PUBLISH] ({ commit }, { adventureId }) {
        commit(SET_LOADING, true);

        return api.publishment.publish(adventureId)
          .then( response => {
            commit(SET_LOADING, false);
            commit(`adventure/${SET_ADVENTURE_STATUS}`, ADVENTURES_PUBLISHED, { root: true });
            commit(ADD_MESSAGE, response.data);

            return response;
          })
          .catch( error => commit(SET_ERROR, { key: PUBLISH, error: error }));
      },

      [START_EDITING] ({ commit }, { adventureId }) {
        commit(SET_LOADING, true);

        return api.publishment.startEditing(adventureId)
          .then( response => {
            commit(SET_LOADING, false);
            commit(`adventure/${SET_ADVENTURE_STATUS}`, ADVENTURES_PENDING, { root: true });
            commit(ADD_MESSAGE, response.data);
            
            return response;
          })
          .catch( error => commit(SET_ERROR, { key: START_EDITING, error: error }));
      }
    }
  };
}
