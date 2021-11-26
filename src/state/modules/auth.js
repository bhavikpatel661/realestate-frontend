import axios from 'axios'
const API_URL = process.env.VUE_APP_API_URL
export const state = {
  currentUser: getSavedState('auth.currentUser'),
}

export const mutations = {
  SET_CURRENT_USER(state, newValue) {
    state.currentUser = newValue
    saveState('auth.currentUser', newValue)
    setDefaultAuthHeaders(state)
  },
}

export const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.currentUser
  },
}

export const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  init({ state, dispatch }) {
    setDefaultAuthHeaders(state)
    dispatch('validate')
  },

  // Logs in the current user.
  logIn({ commit, dispatch, getters }, { username, password } = {}) {
    if (getters.loggedIn) return dispatch('validate')

    return axios
      .post(`${API_URL}/public/login`, { email: username, password: password })
      .then((response) => {
        const user = response.data
        commit('SET_CURRENT_USER', user)
        return user
      })
  },

  // Logs out the current user.
  logOut({ commit, dispatch }) {
    console.log('logour is calld')
    commit('SET_CURRENT_USER', null)
  },

  // Validates the current user's token and refreshes it
  // with new data from the API.
  validate({ commit, state }) {
    if (!state.currentUser) return Promise.resolve(null)

    return axios
      .post(`${API_URL}/public/validate`, { token: state.currentUser })
      .then((response) => {
        return state.currentUser
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          commit('SET_CURRENT_USER', null)
        } else {
        }
        return null
      })
  },
}

// ===
// Private helpers
// ===

function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state))
}

function setDefaultAuthHeaders(state) {
  axios.defaults.headers.Authorization = state.currentUser
    ? 'Bearer ' + state.currentUser.token
    : ''
}
