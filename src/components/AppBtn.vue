<template>
  <button
    :class="$style.AppBtn"
    :type="type"
    :color="color"
    :disabled="disabled || loading"
    :loading="loading"
    @click="click"
  >
    <span :class="$style.AppBtn__Label"><slot></slot></span>
    <span v-if="loading" :class="$style.AppBtn__Loading"><AppSpinner></AppSpinner></span>
  </button>
</template>

<script>
import AppSpinner from './AppSpinner'

export default {
  components: {
    AppSpinner
  },

  props: {
    type: {
      type: String,
      default: 'button'
    },
    color: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    click (ev) {
      if (this.$listeners.click) {
        this.$listeners.click()
      }
      return ev
    }
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.AppBtn
  padding: 0.875rem 2rem
  color: #fff
  background: primary
  border-radius: 3px
  border: 0
  textCaps()
  cursor: pointer
  position: relative
  transition: box-shadow 0.2s
  will-change: box-shadow
  display: inline-flex
  align-items: center
  justify-content: center
  white-space: nowrap

  &:hover,
  &:focus,
  &:active
    box-shadow: rgba(0,0,0,.1) 0 2px 8px

  &:focus
    outline: 0

  &__Label
    [loading] &
      opacity: 0

    svg
      height: 1.5em
      width: 1.5em
      fill: currentColor
      vertical-align: middle

  &__Loading
    position: absolute
    left: 50%
    top: 50%
    width: 2rem
    height: 2rem
    transform: translate(-50%, -50%)

  &[disabled]
    opacity: .5
    cursor: not-allowed

  &[color="secondary"]
    background: grayLight
    color: grayDark

  &[color="muted"]
    background: rgba(grayLight, 0.15)
    color: inherit
</style>
