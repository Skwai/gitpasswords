<template>
  <div :class="$style.TheGists">
    <div :class="$style.TheGists__Body">
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
      <form @submit.prevent="createGist" :class="$style.TheGists__New">
        <input type="text" placeholder="New Gist Name" v-model="filename">
        <AppBtn
          type="submit"
          title="Create a new Gist"
          :loading="creating"
        ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></AppBtn>
      </form>
    </div>
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
      if (this.creating) return
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
@import "../styles/config.styl"

.TheGists
  modal()

  h2
    text-align: center
    margin-top: 0

  &__Body
    modalBody()

  &__Gist
    background: #fff

  &__New
    display: flex
    margin: 0 (-1 * spacingBase)
    border-top: grayLight solid 1px
    padding: spacingBase spacingBase 0

    input
      input()
      border-right: 0

    button
      border-radius: 0 3px 3px 0
</style>
