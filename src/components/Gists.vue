<template>
  <div class="Gists">
    <div class="Gists__Gist" v-for="gist in gists" :key="gist.id">
      <Gist :gist="gist">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  ...mapGetters(['gists'])
}
</script>

<style lang="stylus">
</style>
