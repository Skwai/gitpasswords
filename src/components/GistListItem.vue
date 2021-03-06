<template>
  <div
    tabindex="1"
    :class="$style.GistListItem"
    @click="$listeners.click(gist.id, filename)"
  >
    <div :class="$style.GistListItem__Loading" v-if="loading">
      <AppSpinner></AppSpinner>
    </div>
    <small :class="$style.GistListItem__Privacy">{{gist.public ? 'public' : 'private'}}</small>
    <div :class="$style.GistListItem__Filename">{{filename}}</div>
    <div :class="$style.GistListItem__Updated">{{updatedAt}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import AppSpinner from './AppSpinner.vue'

@Component({
  components: {
    AppSpinner
  }
})
export default class GistListItem extends Vue {
  @Prop({ required: true })
  gist: GitPasswords.GithubGist

  @Prop({ default: false, required: false })
  loading: boolean

  get filename (): string {
    return Object.keys(this.gist.files).shift() || null
  }

  get updatedAt (): string {
    if (this.gist && this.gist.updated_at) {
      return new Date(this.gist.updated_at).toLocaleDateString()
    }
    return null
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.GistListItem
  cursor: pointer
  padding: 1rem $spacingBase
  transition: $transitionBase
  display: flex
  align-items: center

  &:hover,
  &:focus,
  &:active
    background: $grayLighter

  &:focus
    outline: 0

  &__Filename
    font-weight: 600

  &__Updated
    margin-left: auto
    opacity: .5
    fontSmall()

  &__Loading
    width: 2rem
    height: 2rem
    margin-right: 1rem

  &__Privacy
    textCaps()
    font-size: 0.75rem
    padding: 4px 6px
    background: $grayLighter
    border-radius: 3px
    margin-right: 1rem
    min-width: 6.5em
    text-align: center
</style>
