import { STORE_USER, REMOVE_USER } from './mutation-types'
import { LOGIN, LOGOUT } from './action-types'

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };

export default {
  namespaced: true,
  state: initialState,
  mutations: {
    [STORE_USER] (state, user) {
      state.status = { loggedIn: true };
      state.user = user;
    },

    [REMOVE_USER] (state) {
      state.status = {};
      state.user = null;
    }
  },
  actions: {
    [LOGIN] ({ dispatch, commit }, { username, password }) {

    },

    [LOGOUT] ({ commit }) {
      commit(REMOVE_USER);
    }
  }
}
