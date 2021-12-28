<script>
import { authComputed } from '@state/helpers'

export default {
  computed: {
    ...authComputed,
  },
  methods: {
    logout() {
      this.$router.push({ path: '/logout' })
    },
    projectCreation() {
      this.$router.push({ path: '/projectCreation' })
    },
  },
}
</script>

<template>
  <div class="header">
    <div class="level-right pull-right">
      <!-- <a @click="logout">Log out</a> -->
      <b-button variant="outline-primary" class="mr-2" @click="projectCreation"
        >Project Creation</b-button
      >

      <b-button variant="outline-primary" @click="logout">Logout</b-button>
    </div>
  </div>
</template>

<style lang="scss">
@import '@design';

.gg-log-out {
  box-sizing: border-box;
  position: relative;
  display: block;
  width: 6px;
  height: 16px;
  border: 2px solid;
  transform: scale(var(--ggs, 1));
  border-right: 0;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  margin-left: 0;
  margin-right: 1rem;
  cursor: pointer;
  margin-top: 0.5rem;
}
.gg-log-out::after,
.gg-log-out::before {
  content: '';
  display: block;
  box-sizing: border-box;
  position: absolute;
}
.gg-log-out::after {
  border-top: 2px solid;
  border-left: 2px solid;
  transform: rotate(-45deg);
  width: 8px;
  height: 8px;
  left: 4px;
  bottom: 2px;
}
.gg-log-out::before {
  border-radius: 3px;
  width: 10px;
  height: 2px;
  background: currentColor;
  left: 5px;
  bottom: 5px;
}

.container {
  padding: 0;
  // margin: 0 0 $size-grid-padding;
  // text-align: center;
  list-style-type: none;
  position: relative;
  top: 14%;

  > li {
    display: inline-block;
    margin-right: $size-grid-padding;
  }
}

.header {
  z-index: 1;
  position: fixed;
  top: 0;
  width: 100%;
  background: #fff;
  margin: 0;
  -webkit-box-shadow: 0 0 5px 0 rgb(0 0 0 / 10%);
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 10%);
  margin-bottom: 1 rem;
  height: 3rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
}
.header .header-content {
  height: 100%;
  padding-left: 3rem;
  padding-right: 1.875rem;
  align-items: center;
  display: flex;
}
.header .navbar {
  padding: 0;
  height: 100%;
  width: 100%;
}
.navbar-expand {
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.navbar {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
</style>
