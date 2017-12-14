<template>
  <div :class="$style.TheGists">
    <h2>Select a Gist</h2>
    <AppLoading v-if="loading" />
    <div
      v-else-if="gists.length"
      v-for="gist in gists"
      :class="$style.TheGists__Gist"
      :key="gist.id"
    >
      <AppGist
        :gist="gist"
        @click="selectGist"
      ></AppGist>
    </div>
    <div v-else>You don't have any Gists</div>
    <form @submit.prevent="createGist">
      <input type="text" placeholder="New Gist Name" v-model="filename">
      <AppBtn type="submit">Create New Gist</AppBtn>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppLoading from './AppLoading'
import AppBtn from './AppBtn'
import AppGist from './AppGist'

export default {
  components: {
    AppLoading,
    AppBtn,
    AppGist
  },

  computed: {
    ...mapGetters(['gists'])
  },

  data () {
    return {
      filename: '',
      loading: true,
      creating: false
    }
  },

  methods: {
    requestSecret () {
      return prompt('Enter a secret key')
    },

    async selectGist (gistID, filename) {
      const secret = this.requestSecret()
      await this.$store.dispatch('selectGist', { gistID, secret, filename })
    },

    createGist () {
      this.creating = true
      const secret = this.requestSecret()
      try {
        this.$store.dispatch('createGist', { filename: this.filename, secret })
      } catch (err) {
        console.error(err)
      } finally {
        this.creating = false
      }
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

<style lang="stylus" module>
.TheGists
  background: #fff

  &__Gist
    background: #fff
</style>
