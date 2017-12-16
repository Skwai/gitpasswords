<template>
  <div :class="$style.TheLogout">
    <AppBtn
      @click="logout"
      color="muted"
    >Log out</AppBtn>
  </div>
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

<style lang="stylus" module>
.TheLogout
  margin-top: auto
</style>
