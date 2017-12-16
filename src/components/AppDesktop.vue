<template>
  <div :class="$style.AppDesktop">
    <slot></slot>
  </div>
</template>

<style lang="stylus" module>
@import "../styles/config.styl"

.AppDesktop
  display: none

  @media (min-width: $breakpoint)
    display: block
</style>
