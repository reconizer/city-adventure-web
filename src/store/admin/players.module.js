import api from '@/api';

import {
  LOAD_PLAYER, LOAD_PLAYERS,

  CREATE_PLAYER, DESTROY_PLAYER,
  UPDATE_PLAYER
} from '@/store/action-types'

import {
  SET_PLAYERS, SET_PLAYER,
  REMOVE_PLAYER,

  SET_TOTAL_PAGES,

  SET_LOADING, SET_ERROR
} from '@/store/mutation-types'

export default {
  namespaced: true,
  state: {
    item: null,
    list: [],
    totalPages: 1,

    loading: false,
    errors: {
      [LOAD_PLAYER]: null, [LOAD_PLAYERS]: null,
      [CREATE_PLAYER]: null, [DESTROY_PLAYER]: null,
      [UPDATE_PLAYER]: null
    }
  },
  mutations: {
    [SET_PLAYERS] (state, players) {
      state.list = players;
    },

    [SET_TOTAL_PAGES] (state, totalPages) {
      state.totalPages = totalPages;
    },

    [SET_PLAYER] (state, player) {
      state.item = player;
    },

    [REMOVE_PLAYER] (state, playerId) {
      let index = state.list.findIndex(player => player.id == playerId);

      state.list.splice(index, 1);
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
    [LOAD_PLAYERS] ({ commit }, { page, query }) {
      commit(SET_LOADING, true);
      commit(SET_ERROR, { key: LOAD_PLAYERS, error: null });

      return api.admin.players.loadPlayers(page, query)
        .then( response => {
          commit(SET_PLAYERS, response.data.players);
          commit(SET_TOTAL_PAGES, response.data.total_pages);
          commit(SET_LOADING, false);

          return response;
        })
        .catch( error => {
          commit(SET_ERROR, { key: LOAD_PLAYERS, error: error.response.data });
          commit(SET_LOADING, false);

          throw error;
        });
    },

    [LOAD_PLAYER] ({ commit }, { id }) {
      commit(SET_LOADING, true);
      commit(SET_ERROR, { key: LOAD_PLAYER, error: null });
      commit(SET_PLAYER, null);

      return api.admin.players.loadPlayer(id)
        .then( response => {
          commit(SET_LOADING, false);
          commit(SET_PLAYER, response.data);

          return response;
        })
        .catch( error => {
          commit(SET_ERROR, { key: LOAD_PLAYER, error: error.response.data });
          commit(SET_LOADING, false);

          throw error;
        });
    },

    [CREATE_PLAYER] ({ commit }, { params }) {
      commit(SET_LOADING, true);
      commit(SET_ERROR, { key: CREATE_PLAYER, error: null });

      return api.admin.players.createPlayer(params)
        .then( response => {
          commit(SET_LOADING, false);

          return response;
        })
        .catch( error => {
          commit(SET_ERROR, { key: CREATE_PLAYER, error: error.response.data });
          commit(SET_LOADING, false);

          throw error;
        });
    },

    [DESTROY_PLAYER] ({ commit }, { id }) {
      commit(SET_LOADING, true);
      commit(SET_ERROR, { key: DESTROY_PLAYER, error: null });

      return api.admin.players.destroyPlayer(id)
        .then( response => {
          commit(SET_LOADING, false);
          commit(REMOVE_PLAYER, id);

          return response;
        })
        .catch( error => {
          commit(SET_ERROR, { key: DESTROY_PLAYER, error: error.response.data });
          commit(SET_LOADING, false);

          throw error;
        });
    },

    [UPDATE_PLAYER] ({ commit, state }, { params }) {
      commit(SET_LOADING, true);
      commit(SET_ERROR, { key: UPDATE_PLAYER, error: null });

      return api.admin.players.updatePlayer(state.item.id, params)
        .then( response => {
          commit(SET_LOADING, false);

          return response;
        })
        .catch( error => {
          commit(SET_ERROR, { key: UPDATE_PLAYER, error: error.response.data });
          commit(SET_LOADING, false);

          throw error;
        });
    }
  }
}
