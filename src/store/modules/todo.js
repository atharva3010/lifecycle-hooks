import { httpClient } from '@/services/httpClient.js';

// State
const state = {
  loading: false,
  todos: []
};

// Getters
const getters = {
  get_loading: state => state.loading,
  get_todos: state => state.todos
};

// Actions
const actions = {
  fetchTodos({ commit }) {
    commit('CHANGE_LOADING', true);
    return new Promise((resolve, reject) => {
      httpClient.get(`todos`).then(
        response => {
          commit('SET_TODOS', response.data);
          commit('CHANGE_LOADING', false);
          resolve(response.data);
        },
        error => {
          commit('CHANGE_LOADING', false);
          reject(error);
        }
      );
    });
  }
};

// Mutations
const mutations = {
  CHANGE_LOADING(state, payload) {
    state.loading = payload;
  },
  SET_TODOS(state, payload) {
    state.todos = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
