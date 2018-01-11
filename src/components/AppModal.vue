<template>
  <dialog :class="$style.AppModal" @close="close">
    <header :class="$style.AppModal__Title" v-if="title">
      <h3>{{title}}</h3>
    </header>
    <div :class="$style.AppModal__Content">
      <slot></slot>
    </div>
  </dialog>
</template>

<script lang="ts">
import 'dialog-polyfill'
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

const ESCAPE_KEYCODE = 32

@Component
export default class AppModal extends Vue {
  @Prop({ required: true })
  title: string

  @Prop({ default: false, required: true })
  open: boolean

  close (ev: Event) {
    this.$emit('close', ev)
  }

  get inDOM () {
    return document.body.contains(this.$el)
  }

  mounted (): void {
    if (this.open && this.inDOM) {
      (this.$el as HTMLDialogElement).showModal()
    }
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

@keyframes AppModal
  0%
    transform: translateY(-3rem)
    opacity: 0
  50%
    opacity: 1
  100%
    opacity: 1
    transform: translateY(0)

.AppModal
  card()
  box-shadow: rgba(0,0,0,.05) 0 0.125rem 0.5rem
  max-width: 100vw
  width: 30rem
  opacity: 0

  &[open]
    animation: AppModal ease-in-out 0.5s 1 forwards

  &::backdrop
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: rgba($grayLighter, .7)

  &__Title
    margin-bottom: $spacingBase

  &__Content
    padding: $spacer
</style>
