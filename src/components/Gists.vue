<template>
  <div class="Gists">
    <h2>Select a Gist</h2>
    <Loading v-if="loading" />
    <div
      v-else-if="gists.length"
      v-for="gist in gists"
      class="Gists__Gist"
      :key="gist.id"
    ><Gist :gist="gist" /></div>
    <div v-else>You don't have any Gists</div>
    <Btn @click="createGist">Create New Gist</Btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loading from './Loading'

export default {
  components: {
    Loading
  },

  computed: {
    ...mapGetters(['gists'])
  },

  data () {
    return {
      loading: true
    }
  },

  methods: {
    createGist () {
      this.$store.dispatch('createGist')
    }
  },

  async created () {
    try {
      await this.$store.dispatch('getGists')
    } catch (err) {
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="stylus">
</style>
