<script>
import Layout from '@layouts/main.vue'

export default {
  page: {
    title: '404',
    meta: [{ name: 'description', content: '404' }],
  },
  components: { Layout },
  props: {
    resource: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <Layout>
    <div class="authincation h-100">
      <div class="container h-100">
        <div class="row justify-content-center h-100 align-items-center">
          <div class="col-md-7">
            <div class="form-input-content text-center error-page">
              <h1 class="error-text fw-bold">404</h1>
              <h4
                ><i class="fa fa-exclamation-triangle text-warning"></i> The
                page you were looking for is not found!</h4
              >
              <p
                >You may have mistyped the address or the page may have
                moved.</p
              >
              <div>
                <a class="btn btn-primary" href="./index.html">Back to Home</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style lang="scss">
.title {
  text-align: center;
}
.error-page .error-text {
  font-size: 9.375rem;
  line-height: 1;
}
.error-page h4,
.error-page .h4 {
  font-size: 2.5rem;
  margin-bottom: 0.3125rem;
}
.error-page p {
  font-size: 1rem;
}
</style>
