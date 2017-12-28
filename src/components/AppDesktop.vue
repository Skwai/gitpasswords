<template>
  <div :class="$style.AppDesktop">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppDesktop extends Vue {}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.AppDesktop
  display: none

  @media (min-width: $tablet)
    display: block
</style>
