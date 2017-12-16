<template>
  <div :class="$style.AppMobile">
    <slot></slot>
  </div>
</template>

<style lang="stylus" module>
.AppMobile
  display: inherit

  @media (min-width: $breakpoint)
    display: none
</style>
