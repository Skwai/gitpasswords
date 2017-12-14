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
    ...mapGetters(['username', 'gistID'])
  }
}
</script>

<style lang="stylus" module>
html
  font-size: calc(7px + 1vmin)

body
  margin: 0

.App
  font-size: 1rem
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50

  *
    box-sizing: border-box
</style>
