<template>
  <div :class="$style.AppDesktop">
    <slot></slot>
  </div>
</template>

<style lang="stylus" module>
.AppDesktop
  display: none

  @media (min-width: 768px)
    display: block
</style>
