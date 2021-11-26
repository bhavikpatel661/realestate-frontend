<template src="./listCustomerTemplate.html"> </template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import Timeline from '../timeline/timeline'
export default {
  name: 'ListCustomer',
  components: {
    Timeline,
  },
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
      selectedCustomer: -1,
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
    viewTimeline(customerId) {
      this.selectedCustomer = customerId
      _.forEach(this.arrCustomers, function(item) {
        if (item.id === customerId) {
          item._rowVariant = 'info'
        } else {
          item._rowVariant = ''
        }
      })

      // deep clone to trigger the change
      this.arrCustomers = _.cloneDeep(this.arrCustomers)
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
