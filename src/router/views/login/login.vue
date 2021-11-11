<template src="./loginTemplate.html"> </template>

<script>
import { authMethods } from '@state/helpers'

export default {
  page: {
    title: 'Log in',
  },
  data() {
    return {
      password: '',
      email: '',
    }
  },
  computed: {},
  methods: {
    ...authMethods,
    // Try to log the user in with the username
    // and password they provided.
    login() {
      return this.logIn({
        username: this.email,
        password: this.password,
      })
        .then((token) => {
          // Redirect to the originally requested page, or to the home page
          this.$router.push(this.$route.query.redirectFrom || { name: 'home' })
        })
        .catch((error) => {
          this.tryingToLogIn = false
          this.authError = error
        })
    },
    created() {},
  },
}
</script>

<style lang="scss" src="./loginStyle.scss"></style>
