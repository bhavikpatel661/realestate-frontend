<template src="./customerTemplate.html"> </template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
export default {
  name: 'Customer',
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
    onSubmit(event) {
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
            compInstance.$router.push('/home')
          })
      }
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
