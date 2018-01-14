<template>
  <main :class="$style.App">
    {{error}}
    <TheError v-if="error" :error="error"></TheError>
    <TheLogin v-if="!username"></TheLogin>
    <GistList v-else-if="!gistID"></GistList>
    <TheEntries v-else></TheEntries>
    <component :is="modal"></component>
  </main>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import TheLogin from './components/TheLogin.vue'
import GistList from './components/GistList.vue'
import TheEntries from './components/TheEntries.vue'
import TheError from './components/TheError.vue'
import hub from './services/hub'

@Component({
  components: {
    TheLogin,
    TheEntries,
    TheError,
    GistList
  }
})
export default class App extends Vue {
  modal: any = null

  @Getter username: string
  @Getter gistID: string
  @Getter token: string
  @Getter error: string

  @Action setInactiveTimer: () => void
  @Action getUserFromToken: (token: string) => void
  @Action logout: () => void

  bindClickTimeout (): void {
    document.addEventListener('click', this.setInactiveTimer)
  }

  showModal (component: any): void {
    this.modal = component
  }

  hideModal (): void {
    this.modal = null
  }

  async created (): Promise<void> {
    hub.$on('showModal', this.showModal)
    hub.$on('hideModal', this.hideModal)
    this.bindClickTimeout()

    if (this.token) {
      try {
        await this.getUserFromToken(this.token)
      } catch (err) {
        this.logout()
      }
    }
  }
}
</script>

<style lang="stylus" module>
@import "./styles/config.styl"

html
  font-size: 14px

body
  margin: 0
  background: $grayLighter

h2
  margin: 0 0 1.5rem
  line-height: 1.1

p
  line-height: 1.5

input,
textarea,
button
  font-size: 1rem
  font-family: inherit
  color: inherit

svg:not(:root)
  overflow: hidden

.App
  font-size: 1rem
  font-family: $sansFont
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: $grayDark

  &, *
    box-sizing: border-box
</style>
