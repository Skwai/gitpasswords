<template>
  <section
    :class="$style.AppModal"
    @close="close"
  >
    <header :class="$style.AppModal__Title" v-if="title">
      <h3>{{title}}</h3>
    </header>
    <div :class="$style.AppModal__Content">
      <slot></slot>
    </div>
  </section>
</template>

<script lang="ts">
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

  focus () {
    // Find element with `autofocus` attribute, or fall back to the first form/tabindex control.
    let target: HTMLElement = this.$el.querySelector('[autofocus]:not([disabled])') as HTMLElement

    if (!target && this.$el.tabIndex >= 0) {
      target = this.$el
    }

    if (!target) {
      // Note that this is 'any focusable area'. This list is probably not exhaustive, but the
      // alternative involves stepping through and trying to focus everything.
      const opts = ['button', 'input', 'keygen', 'select', 'textarea']
      const query = opts.map((el) => `${el}:not([disabled])`)
      // TODO(samthor): tabindex values that are not numeric are not focusable.
      query.push('[tabindex]:not([disabled]):not([tabindex=""])')  // tabindex != "", not disabled
      target = this.$el.querySelector(query.join(', ')) as HTMLElement
    }

    target && target.focus()
  }

  documentKeypress (ev: KeyboardEvent) {
    if (ev.keyCode === 27) {
      this.close(ev)
    }
  }

  mounted () {
    this.focus()
    document.addEventListener('keydown', this.documentKeypress)
  }

  destroyed () {
    document.removeEventListener('keydown', this.documentKeypress)
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

@keyframes AppModal
  0%
    transform: translate(0, calc(-50% - 3rem))
    opacity: 0
  50%
    opacity: 1
  100%
    opacity: 1
    transform: translate(0, -50%)

.AppModal
  dialog()
  card()
  box-shadow: rgba(0,0,0,.05) 0 0.125rem 0.5rem, rgba($grayLighter, .7) 0 0 0 9999rem
  width: 30rem
  animation: AppModal ease-in-out 0.5s 1 forwards

  &__Title
    margin-bottom: $spacingBase
</style>
