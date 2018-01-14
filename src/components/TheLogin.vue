<template>
  <div :class="$style.TheLogin">
    <div :class="$style.TheLogin__Body">
      <h2>GitWords</h2>
      <p>Store your passwords in an encrypted Github Gist</p>
      <div :class="$style.TheLogin__Btn">
        <AppBtn
          @click="login"
          :loading="loading"
        >Sign in with GitHub</AppBtn>
      </div>
    </div>
    <TheFooter></TheFooter>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import TheFooter from './TheFooter.vue'
import AppLoading from './AppLoading.vue'
import AppBtn from './AppBtn.vue'

@Component({
  components: {
    AppBtn,
    TheFooter,
    AppLoading
  }
})
export default class TheLogin extends Vue {
  loading: boolean = false
  error: string = null

  @Action('login') loginAction: () => Promise<void>
  @Action('showError') showErrorAction: (message: string) => void

  async login (): Promise<void> {
    this.loading = true

    try {
      await this.loginAction()
    } catch (err) {
      this.showErrorAction(err.message)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.TheLogin
  modal()
  text-align: center

  &__Body
    modalBody()

  &__Btn
    margin-top: $spacingBase
</style>
