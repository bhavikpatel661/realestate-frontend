<template src="./BookingTemplate.html"> </template>

<script>
import Layout from '@layouts/main.vue'
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'BookingComponent',
  components: {
    Layout,
  },
  data() {
    return {
      customerId: -1,
      projectName: [{ value: 'Test', text: 'Test' }],
      wing: [{ value: 'A', text: 'A' }],
      customerDetails: {},
      bookingForm: {
        pan: '',
        aadhar: '',
        residence: '',
        projectName: 'A',
        flat: null,
        wing: 'A',
        totalAmount: null,
      },
    }
  },
  computed: {
    ...mapGetters({ getCustomerDetails: 'customers/getCustomerDetails' }),
  },
  watch: {
    getCustomerDetails: {
      handler: function(newValue, oldValue) {
        this.customerDetails = newValue
        console.log(this.customerDetails)
      },
    },
  },
  mounted() {
    this.customerId = _.get(this.$route.params, 'customerId', -1)
    if (this.customerId !== -1) {
      this.$store.dispatch('customers/getCustomerDetails', this.customerId)
    }
  },
  methods: {
    formatAadhar() {
      this.bookingForm.aadhar = this.bookingForm.aadhar
        .replace(/\D/g, '')
        .split(/(?:([\d]{4}))/g)
        .filter((s) => s.length > 0)
        .join('-')
    },
    saveBooking() {},
  },
}
</script>

<style lang="scss" scoped src="./BookingStyle.scss">
@import '@design';
</style>
