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
  ADVENTURES_REJECTED,
  ADVENTURES_CANCELLED,
  ADVENTURES_UNPUBLISHED
} from '@/config'

let basePublishment = publishmentBuilder(api.admin);

export default {
  namespaced: true,
  state: basePublishment.state,
  mutations: basePublishment.mutations,
  actions: {
    ...basePublishment.actions,

    [REJECT] ({ commit }, { adventureId }) {
      commit(SET_LOADING, true);

      return api.admin.publishment.reject(adventureId)
        .then( response => {
          commit(SET_LOADING, false);
          commit(`adventure/${SET_ADVENTURE_STATUS}`, ADVENTURES_REJECTED, { root: true });
          commit(ADD_MESSAGE, response.data);

          return response;
        })
        .catch( error => commit(SET_ERROR, error));
    },

    [CANCEL] ({ commit }, { adventureId }) {
      commit(SET_LOADING, true);

      return api.admin.publishment.cancel(adventureId)
        .then( response => {
          commit(SET_LOADING, false);
          commit(`adventure/${SET_ADVENTURE_STATUS}`, ADVENTURES_CANCELLED, { root: true });
          commit(ADD_MESSAGE, response.data);

          return response;
        })
        .catch( error => commit(SET_ERROR, error));
    },

    [UNPUBLISH] ({ commit }, { adventureId }) {
      commit(SET_LOADING, true);

      return api.admin.publishment.unpublish(adventureId)
        .then( response => {
          commit(SET_LOADING, false);
          commit(`adventure/${SET_ADVENTURE_STATUS}`, ADVENTURES_UNPUBLISHED, { root: true });
          commit(ADD_MESSAGE, response.data);

          return response;
        })
        .catch( error => commit(SET_ERROR, error));
    }
  }
}
