<template>
  <h4 :class="$style.TheError" role="alert">{{error}}</h4>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action } from 'vuex-class'

const ERROR_DURATION = 3000

@Component
export default class TheError extends Vue {
  @Prop({ required: true })
  error: string

  @Action('hideError') hideErrorAction

  mounted (): void {
    setTimeout(() => this.hideErrorAction(ERROR_DURATION))
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

@keyframes TheError
  0%
    color: rgba(#fff, 0)
    transform: scale(1, 0)
  50%
    color: rgba(#fff, 0)
    transform: scale(1, 1)
  100%
    color: rgba(#fff, 1)

.TheError
  margin: 0
  background: $red
  color: #fff
  padding: $spacingBase
  text-align: center
  animation: TheError 0.5s ease
  transform-origin: center top
  position: fixed
  left: 0
  top: 0
  width: 100vw
  box-shadow: rgba(0,0,0,.1) 0 2px 5px
  z-index: $zindexTop
</style>
