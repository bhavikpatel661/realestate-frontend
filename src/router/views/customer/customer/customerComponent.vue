<template src="./customerTemplate.html"> </template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import Layout from '@layouts/main.vue'

export default {
  name: 'Customer',
  components: {
    Layout,
  },
  data() {
    return {
      customerId: -1,
      customerForm: {
        name: '',
        date: '',
        email: '',
        contact: '',
        address: '',
        budget: '',
        occupation: '',
        requirement: '',
        references: '',
      },
      show: true,
    }
  },
  computed: {
    ...mapGetters({ getCustomerDetails: 'customers/getCustomerDetails' }),
  },
  watch: {
    getCustomerDetails: {
      handler: function(newValue, oldValue) {
        this.customerForm = newValue
        this.customerForm.date = newValue.createdAt
        console.log(this.customerForm)
      },
    },
  },
  mounted() {
    this.customerId = _.get(this.$route.query, 'customerId', -1)
    if (this.customerId !== -1) {
      this.$store.dispatch('customers/getCustomerDetails', this.customerId)
    }
  },
  methods: {
    onSubmit(event, booking) {
      event.preventDefault()
      const compInstance = this

      _.forEach(this.customerForm, function(value, key) {
        compInstance.customerForm[key] = _.trim(value)
      })
      // if the customer is already created then udpate else save.
      if (this.customerId !== -1) {
        const data = {
          customerId: this.customerId,
          data: this.customerForm,
        }
        this.$store.dispatch('customers/updateCustomer', data)
      } else {
        this.$store
          .dispatch('customers/createCustomer', this.customerForm)
          .then((data) => {
            if (booking) {
              compInstance.$router.push(
                `/home/customer/booking/${data.customer.id}`
              )
            } else {
              compInstance.$router.push('/home')
            }
          })
      }
    },
    book(event) {
      this.onSubmit(event, true)
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>

<style lang="scss" scoped src="./customerStyle.scss"></style>
