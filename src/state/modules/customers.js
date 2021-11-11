/* eslint-disable handle-callback-err */
import { Customers } from '@/api/customers/customers.api'
import _ from 'lodash'

export const state = {
  customerList: [],
  customerListLoader: false,
  addCustomerLoader: false,
  updateCustomerLoader: false,
  customerDetails: {},
  customerDetailsLoader: false,
}

export const mutations = {
  GET_CUSTOMER_LIST_PRE(state) {
    state.customerListLoader = true
  },
  GET_CUSTOMER_LIST_SUCCESS(state, data) {
    state.customerListLoader = false
    state.customerList = data
  },
  GET_CUSTOMER_LIST_FAILURE(state) {
    state.customerListLoader = false
  },

  CREATE_CUSTOMER_PRE(state) {
    state.addCustomerLoader = true
  },
  CREATE_CUSTOMER_SUCCESS(state) {
    state.addCustomerLoader = false
  },
  CREATE_CUSTOMER_FAILURE(state) {
    state.addCustomerLoader = false
  },
  UPDATE_CUSTOMER_PRE(state) {
    state.updateCustomerLoader = true
  },
  UPDATE_CUSTOMER_SUCCESS(state) {
    state.updateCustomerLoader = false
  },
  UPDATE_CUSTOMER_FAILURE(state) {
    state.updateCustomerLoader = false
  },

  GET_CUSTOMER_DETAILS_PRE(state) {
    state.updateCustomerLoader = true
  },
  GET_CUSTOMER_DETAILS_SUCCESS(state, data) {
    state.updateCustomerLoader = false
    state.customerDetails = data.customer
  },
  GET_CUSTOMER_DETAILS_FAILURE(state) {
    state.updateCustomerLoader = false
  },
}

export const actions = {
  getCustomerList({ commit }, payload) {
    commit(`GET_CUSTOMER_LIST_PRE`)
    return Customers.getCustomers(payload)
      .then(({ data }) => commit(`GET_CUSTOMER_LIST_SUCCESS`, data))
      .catch((error) => {
        commit(`GET_CUSTOMER_LIST_FAILURE`)
      })
  },

  createCustomer({ commit }, payload) {
    commit(`CREATE_CUSTOMER_PRE`)
    return Customers.createCustomer(payload)
      .then(({ data }) => commit(`CREATE_CUSTOMER_SUCCESS`, data))
      .catch((error) => {
        commit(`CREATE_CUSTOMER_FAILURE`)
      })
  },

  updateCustomer({ commit }, payload) {
    commit(`UPDATE_CUSTOMER_PRE`)
    const params = {
      customerId: payload.customerId,
      data: _.get(payload, 'data', {}),
    }
    return Customers.updateCustomer(params)
      .then(({ data }) => commit(`UPDATE_CUSTOMER_SUCCESS`))
      .catch((error) => {
        commit(`UPDATE_CUSTOMER_FAILURE`)
      })
  },
  getCustomerDetails({ commit }, customerId) {
    commit(`GET_CUSTOMER_DETAILS_PRE`)
    return Customers.getCustomerDetails(customerId)
      .then(({ data }) => commit(`GET_CUSTOMER_DETAILS_SUCCESS`, data))
      .catch((error) => {
        commit(`GET_CUSTOMER_DETAILS_FAILURE`)
      })
  },
}

export const getters = {
  getCustomerList: (state) => state.customerList,
  getCustomerListLoader: (state) => state.customerListLoader,
  getCustomerDetails: (state) => state.customerDetails,
}
