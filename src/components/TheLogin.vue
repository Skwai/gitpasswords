<template>
  <div :class="$style.Login">
    <div :class="$style.Login__Body">
      <h2>GitWords</h2>
      <p>Store your passwords in an encrypted Github Gist</p>
      <div :class="$style.Login__Btn">
        <AppBtn
          @click="login"
          :loading="loading"
        >Sign in with GitHub</AppBtn>
      </div>
    </div>
    <AppFooter></AppFooter>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppFooter from './AppFooter.vue'
import AppLoading from './AppLoading.vue'
import AppBtn from './AppBtn.vue'

export default Vue.extend({
  components: {
    AppBtn,
    AppFooter,
    AppLoading
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
        this.$store.dispatch('showError', err.message)
      } finally {
        this.loading = false
      }
    }
  }
})
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.Login
  modal()
  text-align: center

  &__Body
    modalBody()

  &__Btn
    margin-top: $spacingBase
</style>
