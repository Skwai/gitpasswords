<template>
  <div :class="$style.App">
    <TheLogin v-if="!username"></TheLogin>
    <TheGists v-else-if="!gistID"></TheGists>
    <TheEntries v-else></TheEntries>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TheLogin from '@/components/TheLogin'
import TheGists from '@/components/TheGists'
import TheEntries from '@/components/TheEntries'

export default {
  components: {
    TheLogin,
    TheGists,
    TheEntries
  },

  computed: {
    ...mapGetters(['username', 'gistID', 'token'])
  },

  async created () {
    if (this.token) {
      try {
        await this.$store.dispatch('getUserFromToken', this.token)
      } catch (err) {
        await this.$store.dispatch('logout')
      }
    }
  }
}
</script>

<style lang="stylus" module>
@import "./styles/config.styl"

html
  font-size: calc(7px + 1vmin)

body
  margin: 0

h2
  margin: 0 0 1.5rem
  line-height: 1.1

input,
textarea,
button
  font-size: 1rem
  font-family: inherit

svg:not(:root)
  overflow: hidden

.App
  font-size: 1rem
  font-family: sansFont
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: grayDark
  background: grayLighter

  &, *
    box-sizing: border-box
</style>
