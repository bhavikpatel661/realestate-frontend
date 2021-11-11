import ApiService from '@/api/api.service'
const API_URL = process.env.VUE_APP_API_URL

const apiPrefix = `${API_URL}/private/customer`

export const Customers = {
  // get customer grid;
  getCustomers(params) {
    return ApiService.query(`${apiPrefix}/getCustomers`, { params })
  },

  // create new customer
  createCustomer(params) {
    return ApiService.post(`${apiPrefix}/createCustomer`, params)
  },

  // delete a customer
  deleteCustomer(params) {
    return ApiService.delete(`${apiPrefix}/deleteCustomer`, params)
  },

  updateCustomer(params) {
    return ApiService.post(`${apiPrefix}/updateCustomer`, { params })
  },

  getCustomerDetails(customerId) {
    return ApiService.query(`${apiPrefix}/getCustomerDetails`, {
      params: { customerId: customerId },
    })
  },
}
