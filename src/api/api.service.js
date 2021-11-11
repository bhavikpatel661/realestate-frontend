/**
 * Main API service file.
 * Wraps the axios to add the required headers;
 */
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

export const ApiService = {
  getToken() {
    return JSON.parse(window.localStorage.getItem('auth.currentUser')).token
  },
  init() {
    Vue.use(VueAxios, axios)
    // eslint-disable-next-line
    Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL
  },

  setHeader(fileUploadFlag) {
    Vue.axios.defaults.headers.common.Authorization = `Bearer ${this.getToken()}`
    if (fileUploadFlag) {
      Vue.axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
    }
  },

  handleError(error) {
    if (this.getToken() && error.response.status === 401) {
      sessionStorage.clear()
      localStorage.clear()
      window.location.href = '/login'
    }
  },

  getInterceptor() {
    Vue.axios.interceptors.response.use(
      (response) => {
        // console.log('in response', response)
      },
      // eslint-disable-next-line handle-callback-err
      (error) => {
        // console.log('in error')
      }
    )
  },

  query(resource, params) {
    this.setHeader()
    return Vue.axios.get(resource, params).catch((error) => {
      this.handleError(error)
      return Promise.reject(error.response)
    })
  },

  post(resource, params, headerFlag, fileUploadFlag) {
    if (!headerFlag) {
      if (fileUploadFlag) {
        this.setHeader(true)
      } else {
        this.setHeader(false)
      }
    }

    return Vue.axios.post(`${resource}`, params).catch((error) => {
      this.handleError(error)
      return Promise.reject(error.response)
      // throw new Error(`${error.response.data}`);
    })
  },

  update(slug, params) {
    this.setHeader()

    return Vue.axios.put(`${slug}`, params).catch((error) => {
      this.handleError(error)
      return Promise.reject(error.response)
    })
  },

  put(resource, params) {
    this.setHeader()

    return Vue.axios.put(`${resource}`, params).catch((error) => {
      this.handleError(error)
      return Promise.reject(error.response)
    })
  },

  delete(resource, params) {
    this.setHeader()

    return Vue.axios.delete(resource, params).catch((error) => {
      this.handleError(error)
      return Promise.reject(error.response)
    })
  },
}

export default ApiService
