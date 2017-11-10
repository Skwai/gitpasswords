<template>
  <div id="App" :class="$style.App">
    <Login v-if="!username" />
    <Gists v-else-if="!gistId" />
    <Entries v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Login from './components/Login'

export default {
  components: {
    Login
  },

  computed: {
    ...mapGetters(['username'])
  }
}
</script>

<style lang="stylus" module>
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
