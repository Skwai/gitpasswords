<template>
  <AppBtn
    @click="logout"
    color="secondary"
  >Log out</AppBtn>
</template>

<script lang="ts">
import Vue from 'vue'
import AppBtn from './AppBtn'

export default Vue.extend({
  components: {
    AppBtn
  },

  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
})
</script>
