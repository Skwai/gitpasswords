<template>
  <div :class="$style.Login">
    <div :class="$style.Login__Body">
      <h2>Login</h2>
      <AppLoading v-if="loading" />
      <AppBtn v-else @click="login">Sign in with GitHub</AppBtn>
    </div>
  </div>
</template>

<script>
import AppLoading from './AppLoading'
import AppBtn from './AppBtn'
import AppError from './AppError'

export default {
  components: {
    AppBtn,
    AppLoading,
    AppError
  },

  data () {
    return {
      loading: false,
      error: null
    }
  },

  methods: {
    async login () {
      this.loading = true
      try {
        this.$store.dispatch('login')
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.Login
  modal()

  &__Body
    modalBody()
</style>
