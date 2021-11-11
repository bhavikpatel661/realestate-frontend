<template src="./listCustomerTemplate.html"> </template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ListCustomer',
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      arrCustomers: [],
      sortBy: 'id',
      sortDesc: false,
      fields: [
        { key: 'id', sortable: true },
        { key: 'name', sortable: true },
        { key: 'email', sortable: true },
        { key: 'stage', sortable: true },
        { key: 'action', sortable: false },
      ],
      dynamicFields: [],
    }
  },
  computed: {
    ...mapGetters({ getCustomerList: 'customers/getCustomerList' }),
    rows() {
      return this.arrCustomers.length
    },
  },
  watch: {
    getCustomerList: {
      handler: function(newValue) {
        this.arrCustomers = newValue.customers
      },
    },
  },
  mounted() {
    this.$store.dispatch('customers/getCustomerList')
    this.dynamicFields.push({
      key: 'action',
      label: 'Dynamic Label',
      action: 'test',
    })
  },
  methods: {
    changeCustomerType(customerId) {
      const hasConfirmed = confirm(
        'Are you sure you want to convert to customer.'
      )
      if (hasConfirmed) {
        const data = {
          customerId: customerId,
          data: {
            stage: 'customer',
          },
        }
        const componentInstance = this
        this.$store
          .dispatch('customers/updateCustomer', data)
          .then((resp) =>
            componentInstance.$store.dispatch('customers/getCustomerList')
          )
      }
    },
    editCustomer(customerId) {
      this.$router.push({
        path: '/home/customer',
        query: { customerId: customerId },
      })
    },
  },
}
</script>

<style lang="scss" src="./listCustomerStyle.scss">
@import '@design';
.sr-only {
  display: none;
}
</style>
