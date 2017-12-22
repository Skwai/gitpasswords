<template>
  <div :class="$style.TheGists">
    <div :class="$style.TheGists__Body">
      <h2>Select a Gist</h2>
      <AppLoading v-if="loading"></AppLoading>
      <div :class="$style.TheGists__Wrap" v-else>
        <div v-if="!gists.length" :class="$style.TheGists__Empty">You don't have any Gists, yet</div>
        <div
          v-for="gist in gists"
          :class="$style.TheGists__Gist"
          :key="gist.id"
        >
          <AppGist
            :gist="gist"
            :loading="selectedGistID === gist.id"
            @click="selectGist"
          ></AppGist>
        </div>
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
      selectedGistID: null,
      creating: false
    }
  },

  methods: {
    requestSecret (message) {
      return prompt(message)
    },

    async selectGist (gistID, filename) {
      const secret = this.requestSecret('Enter your secret key to decrypt your passwords')
      if (secret === null || this.selectedGistID) {
        return
      }
      this.selectedGistID = gistID
      try {
        await this.$store.dispatch('selectGist', { gistID, secret, filename })
      } catch (err) {
        this.$store.dispatch('showError', 'The secret key you entered is not valid')
      } finally {
        this.selectedGistID = null
      }
    },

    createGist () {
      if (this.creating) {
        return
      }
      const secret = this.requestSecret('Enter a secret key to encrypt your passwords. It is vital that it is secure')
      if (this.secret === null) {
        this.$store.dispatch('showError', 'Your secret key cannot be blank')
        return
      }
      this.creating = true
      try {
        this.$store.dispatch('createGist', { filename: this.filename, secret })
      } catch (err) {
        this.$store.dispatch('showError', 'There was a problem creating your new Gist')
      } finally {
        this.creating = false
      }
    }
  },

  async created () {
    try {
      await this.$store.dispatch('getGists')
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

  &__Empty
    text-align: center
    padding: $spacingBase

  &__Gist
    background: #fff

    &:not(:first-child)
      border-top: $grayLight solid 1px

  &__New
    display: flex
    border-top: $grayLight solid 1px
    padding: $spacingBase

    input
      input()
      border-right: 0

    button
      border-radius: 0 3px 3px 0

  &__Wrap
    card()
    padding: 0
</style>
