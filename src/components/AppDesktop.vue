<template>
  <div :class="$style.AppDesktop">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.AppDesktop
  display: none

  @media (min-width: $tablet)
    display: block
</style>
