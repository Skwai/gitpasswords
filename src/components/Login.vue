<template>
  <div :class="$style.Login">
    <div :class="$style.Login__Body">
      <h2>Login</h2>
      <Loading v-if="loading" />
      <template v-else>
        <button @click.prevent="login">Sign in with GitHub</button>
      </template>
    </div>
  </div>
</template>

<script>
import FormField from './FormField'
import Loading from './Loading'
import Btn from './Btn'
import Error from './Error'

export default {
  components: {
    FormField,
    Btn,
    Loading,
    Error
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

  &__Body
    modalBody()
</style>
