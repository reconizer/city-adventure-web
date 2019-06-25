import api from '@/api'

import publishmentBuilder from '@/store/shared/publishment.builder.js'

import {
  ADD_MESSAGE, SET_ADVENTURE_STATUS,

  SET_LOADING, SET_ERROR
} from '@/store/mutation-types'

import {
  REJECT, CANCEL, UNPUBLISH
} from '@/store/action-types'

import {
  ADVENTURES_REJECTED, ADVENTURES_CANCELLED,
  ADVENTURES_UNPUBLISHED,

  MESSAGE_COMMENT_QA,

  MESSAGE_REJECTED, MESSAGE_ACCEPTED,
  MESSAGE_CANCELLED
} from '@/config'

let basePublishment = publishmentBuilder(api.admin, MESSAGE_COMMENT_QA);

export default {
  namespaced: true,
  state: {
    history: basePublishment.state.history,
    loading: basePublishment.state.loading,

    errors: {
      ...basePublishment.state.errors,

      [REJECT]: null,
      [CANCEL]: null,
      [UNPUBLISH]: null
    }
  },
  mutations: basePublishment.mutations,
  actions: {
    ...basePublishment.actions,

    [REJECT] ({ commit }, { adventureId }) {
      commit(SET_LOADING, true);

      return api.admin.publishment.reject(adventureId)
        .then( response => {
          commit(SET_LOADING, false);

          commit(`adventure/${SET_ADVENTURE_STATUS}`, ADVENTURES_REJECTED, { root: true });

          commit(ADD_MESSAGE, {
            id: +new Date(),
            created_at: (+new Date())/1000|0,
            content: null,
            type: MESSAGE_REJECTED
          });

          return response;
        })
        .catch( error => commit(SET_ERROR, { key: REJECT, error: error }));
    },

    [CANCEL] ({ commit }, { adventureId }) {
      commit(SET_LOADING, true);

      return api.admin.publishment.cancel(adventureId)
        .then( response => {
          commit(SET_LOADING, false);

          commit(`adventure/${SET_ADVENTURE_STATUS}`, ADVENTURES_CANCELLED, { root: true });

          commit(ADD_MESSAGE, {
            id: +new Date(),
            created_at: (+new Date())/1000|0,
            content: null,
            type: MESSAGE_CANCELLED
          });

          return response;
        })
        .catch( error => commit(SET_ERROR, { key: CANCEL, error: error }));
    },

    [UNPUBLISH] ({ commit }, { adventureId }) {
      commit(SET_LOADING, true);

      return api.admin.publishment.unpublish(adventureId)
        .then( response => {
          commit(SET_LOADING, false);

          commit(`adventure/${SET_ADVENTURE_STATUS}`, ADVENTURES_UNPUBLISHED, { root: true });

          commit(ADD_MESSAGE, {
            id: +new Date(),
            created_at: (+new Date())/1000|0,
            content: null,
            type: MESSAGE_ACCEPTED
          });

          return response;
        })
        .catch( error => commit(SET_ERROR, { key: UNPUBLISH, error: error }));
    }
  }
}
