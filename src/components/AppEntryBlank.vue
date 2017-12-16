<template>
  <h3 :class="$style.EntryBlank">
    Select an entry on the left, or create a  new one
  </h3>
</template>

<script>
export default {
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.EntryBlank
  background: transparent
  padding: spacingBase
  text-align: center
</style>
