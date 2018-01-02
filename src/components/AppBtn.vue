<template>
  <button
    :class="$style.AppBtn"
    :type="type"
    :color="color"
    :size="size"
    :disabled="disabled || loading"
    :loading="loading"
    v-on="$listeners"
  >
    <span :class="$style.AppBtn__Label"><slot></slot></span>
    <span v-if="loading" :class="$style.AppBtn__Loading">
      <AppSpinner></AppSpinner>
    </span>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import AppSpinner from './AppSpinner.vue'

@Component({
  components: {
    AppSpinner
  }
})
export default class AppBtn extends Vue {
  @Prop({ default: 'button', required: false })
  type: string

  @Prop({ default: null, required: false })
  color: string|null

  @Prop({ default: null, required: false })
  size: string|null

  @Prop({ default: false, required: false })
  disabled: boolean

  @Prop({ default: false, required: false })
  loading: boolean
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.AppBtn
  padding: 0.875rem $spacingBase
  color: #fff
  background: $primary
  border-radius: 3px
  border: 0
  textCaps()
  cursor: pointer
  position: relative
  display: inline-flex
  align-items: center
  justify-content: center
  white-space: nowrap

  &::before
    content: ""
    left: 0
    top: 0
    width: 100%
    height: 100%
    position: absolute
    background: rgba(0,0,0,.05)
    opacity: 0
    transition: opacity $transitionBase
    will-change: opacity

  &:hover,
  &:focus,
  &:active
    &:not(:disabled)
      &::before
        opacity: 1

  &:focus
    outline: 0

  &__Label
    position: relative
    z-index: 2

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
    background: $grayLight
    color: $grayDark
</style>
