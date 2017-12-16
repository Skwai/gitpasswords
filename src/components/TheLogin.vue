<template>
  <div :class="$style.Login">
    <div :class="$style.Login__Body">
      <h2>Git Passwords</h2>
      <AppBtn
        @click="login"
        :loading="loading"
      >Sign in with GitHub</AppBtn>
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
        await this.$store.dispatch('login')
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
  text-align: center

  h2
    margin-top: 0

  &__Body
    modalBody()
</style>
