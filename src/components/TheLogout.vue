<template>
  <AppBtn
    @click="logout"
    color="secondary"
  >Log out</AppBtn>
</template>

<script>
import AppBtn from './AppBtn'

export default {
  components: {
    AppBtn
  },

  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
