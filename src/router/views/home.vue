<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main.vue'
import Customer from './customer/customer.vue'

export default {
  page: {
    title: 'Home',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Customer, Layout },
}
</script>

<template>
  <Layout>
    <Customer></Customer>
  </Layout>
</template>
