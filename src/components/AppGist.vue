<template>
  <div
    tabindex="1"
    :class="$style.AppGist"
    @click="$listeners.click(gist.id, filename)"
  >
    <div :class="$style.AppGist__Loading" v-if="loading">
      <AppSpinner></AppSpinner>
    </div>
    <svg v-else :class="$style.AppGist__Icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g class="nc-icon-wrapper" fill="none" stroke-linecap="square" stroke-miterlimit="10"><path d="M2.5 1.5h20v22h-20z"/><path data-color="color-2" d="M7.5 7.5h10m-10 5h10m-10 5h4"/></g></svg>
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
  padding: 1rem spacingBase
  margin: 0 (-1 * spacingBase)
  transition: 0.2s
  border-top: grayLight solid 1px
  display: flex
  align-items: center

  &:hover,
  &:focus,
  &:active
    background: grayLighter

  &:focus
    outline: 0

  &__Filename
    font-weight: 600

  &__Updated
    margin-left: auto
    opacity: .5
    fontSmall()

  &__Loading,
  &__Icon
    width: 2rem
    height: 2rem
    margin-right: spacingBase

  &__Icon
    stroke: currentColor
    opacity: .35
</style>
