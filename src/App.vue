<template>
  <div :class="$style.App">
    <TheError v-if="error" :error="error"></TheError>
    <TheLogin v-if="!username"></TheLogin>
    <TheGists v-else-if="!gistID"></TheGists>
    <TheEntries v-else></TheEntries>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import TheLogin from './components/TheLogin.vue'
import TheGists from './components/TheGists.vue'
import TheEntries from './components/TheEntries.vue'
import TheError from './components/TheError.vue'

export default Vue.extend({
  components: {
    TheLogin,
    TheGists,
    TheEntries,
    TheError
  },

  computed: {
    ...mapGetters(['username', 'gistID', 'token', 'error'])
  },

  methods: {
    bindClickTimeout () {
      document.addEventListener('click', () => this.$store.dispatch('setInactiveTimer'))
    }
  },

  async created () {
    this.bindClickTimeout()

    if (this.token) {
      try {
        await this.$store.dispatch('getUserFromToken', this.token)
      } catch (err) {
        await this.$store.dispatch('logout')
      }
    }
  }
})
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
