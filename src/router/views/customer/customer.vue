<script>
import { authMethods, authComputed } from '@/state/helpers'
import ListCustomer from './list-customer/listCustomer.vue'

export default {
  page: {
    title: 'Customer',
  },
  components: { ListCustomer },
  data() {
    return {
      customerStageFilter: 'lead',
      customerNameFilter: '',
    }
  },
  computed: {
    ...authComputed,
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
  <b-container class="h-100 mt-6">
    <div class="card">
      <div class="card-body align-items-center justify-content-between">
        <div class="card-content">
          <b-row>
            <b-col class="col-lg-3">
              <b-form-group label="Customer Type:" label-for="customerType">
                <b-button
                  class="customer-type"
                  :variant="
                    customerStageFilter === 'lead'
                      ? 'primary'
                      : 'outline-primary'
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
        </div>
      </div>
    </div>
  </b-container>
</template>

<style scoped>
.form-inline {
  margin-bottom: 1% !important;
}
.customer-type {
  margin-right: 2%;
}
</style>
