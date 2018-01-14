<template>
  <div :class="$style.GistList">
    <div :class="$style.GistList__Body">
      <h2>Select a Gist</h2>
      <AppLoading v-if="loading"></AppLoading>
      <div :class="$style.GistList__Wrap" v-else>
        <div v-if="!gists.length" :class="$style.GistList__Empty">You don't have any Gists, yet</div>
        <div
          v-for="gist in gists"
          :class="$style.GistList__Gist"
          :key="gist.id"
        >
          <GistListItem
            :gist="gist"
            :loading="selectedGistID === gist.id"
            @click="selectGist"
          ></GistListItem>
        </div>
        <form @submit.prevent="createGist" :class="$style.GistList__New">
          <input type="text" placeholder="New Gist Name" v-model="filename">
          <AppBtn
            type="submit"
            title="Create a new Gist"
            :loading="creating"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
          </AppBtn>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import AppBtn from './AppBtn.vue'
import GistListItem from './GistListItem.vue'
import AppLoading from './AppLoading.vue'
import SecretFormModal from './SecretFormModal.vue'
import NewSecretFormModal from './NewSecretFormModal.vue'
import { showModal } from '../services/hub'

@Component({
  components: {
    AppBtn,
    GistListItem,
    AppLoading,
    SecretFormModal,
    NewSecretFormModal
  }
})
export default class GistList extends Vue {
  filename: string = null
  loading: boolean = true
  selectedGistID: string = null
  creating: boolean = false
  secret: string = null

  @Getter gists: GitPasswords.GithubGist[]

  @Action('selectGist') selectGistAction: ({ gistID, secret, filename }: { gistID: string, secret: string, filename: string }) => void
  @Action('getGists') getGistsAction: () => Promise<void>
  @Action('createGist') createGistAction: ({ secret, filename }: { secret: string, filename: string }) => Promise<void>
  @Action('showError') showErrorAction: (message: string) => void

  requestSecret (message: string): string {
    return prompt(message)
  }

  async selectGist (gistID: string, filename: string): Promise<void> {
    let secret: string

    try {
      secret = await showModal(SecretFormModal)
    } catch (err) {
      return
    }

    if (secret === null || this.selectedGistID) {
      return
    }

    this.selectedGistID = gistID

    try {
      await this.selectGistAction({ gistID, secret, filename })
    } catch (err) {
      this.showErrorAction('The secret key you entered is not valid')
    } finally {
      this.selectedGistID = null
    }
  }

  async createGist (): Promise<void> {
    let secret: string

    try {
      secret = await showModal(NewSecretFormModal)
    } catch (err) {
      return
    }

    if (secret === null) {
      this.showErrorAction('Your secret key cannot be blank')
      return
    }

    this.creating = true

    try {
      await this.createGistAction({ secret, filename: this.filename })
    } catch (err) {
      this.showErrorAction('There was a problem creating your new Gist')
    } finally {
      this.creating = false
    }
  }

  async created (): Promise<void> {
    try {
      await this.getGistsAction()
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.GistList
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
