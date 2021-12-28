<template src="./ProjectCreationTemplate.html"> </template>

<script>
import Layout from '@layouts/main.vue'
export default {
  name: 'ProjectCreation',
  components: {
    Layout,
  },
  data() {
    return {
      wings: [],
      activeFlat: '',
    }
  },
  methods: {
    createNewWing() {
      const x = {
        name: '',
        type: '',
        totalFlats: 0,
      }
      this.wings.push(x)
    },
    setFlatType(wing, type) {
      wing.type = type
    },
  },
}
</script>

<style lang="scss" scoped src="./ProjectCreationStyle.scss"></style>
