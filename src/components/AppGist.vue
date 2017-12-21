<template>
  <div
    tabindex="1"
    :class="$style.AppGist"
    @click="$listeners.click(gist.id, filename)"
  >
    <div :class="$style.AppGist__Loading" v-if="loading">
      <AppSpinner></AppSpinner>
    </div>
    <small :class="$style.AppGist__Privacy">{{gist.public ? 'public' : 'private'}}</small>
    <div :class="$style.AppGist__Filename">{{filename}}</div>
    <div :class="$style.AppGist__Updated">{{updated}}</div>
  </div>
</template>

<script>
import AppSpinner from './AppSpinner'

export default {
  components: {
    AppSpinner
  },

  props: {
    gist: {
      type: Object,
      required: true
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    filename () {
      return Object.keys(this.gist.files).shift()
    },

    updated () {
      return new Date(this.gist.updated_at).toLocaleDateString()
    }
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.AppGist
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
