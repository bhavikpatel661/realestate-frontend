<script>
import Layout from '@layouts/main.vue'
import { authMethods } from '@/state/helpers'
import ListCustomer from './list-customer/listCustomer.vue'

export default {
  page: {
    title: 'Customer',
  },
  components: { Layout, ListCustomer },
  data() {
    return {
      customerStageFilter: 'lead',
      customerNameFilter: '',
    }
  },
  watch: {
    data(newValue, oldValue) {},
    customerNameFilter(newValue) {
      this.getCustomers()
    },
  },
  methods: {
    ...authMethods,
    addCustomer() {
      this.$router.push('/home/customer')
    },
    logout() {
      this.logOut()
    },
    // to set the active customer
    searchByCustomerType(type) {
      this.customerStageFilter = type
      this.getCustomers()
    },
    getCustomers() {
      const filter = {
        name: this.customerNameFilter,
        stage: this.customerStageFilter,
      }
      this.$store.dispatch('customers/getCustomerList', filter)
    },
  },
}
</script>

<template>
  <Layout>
    <b-container>
      <b-row>
        <b-col class="col-lg-3">
          <b-form-group label="Customer Type:" label-for="customerType">
            <b-button
              class="customer-type"
              :variant="
                customerStageFilter === 'lead' ? 'primary' : 'outline-primary'
              "
              @click="searchByCustomerType('lead')"
              >Lead</b-button
            >
            <b-button
              class="customer-type"
              :variant="
                customerStageFilter === 'customer'
                  ? 'primary'
                  : 'outline-primary'
              "
              @click="searchByCustomerType('customer')"
              >Customer</b-button
            >
          </b-form-group>
        </b-col>

        <b-col class="col-lg-3">
          <b-form-group label="Customer Name:" label-for="customerName">
            <b-input
              id="customer"
              v-model="customerNameFilter"
              type="text"
              placeholder="Enter name"
            />
          </b-form-group>
        </b-col>

        <b-col class="col-lg-6">
          <b-button
            variant="outline-primary"
            class="pull-right mt-4"
            @click="addCustomer"
            >Add Customer</b-button
          >
        </b-col>
      </b-row>
      <b-row>
        <ListCustomer></ListCustomer>
      </b-row>
    </b-container>
  </Layout>
</template>

<style scoped>
.form-inline {
  margin-bottom: 1% !important;
}
.customer-type {
  margin-right: 2%;
}
</style>
