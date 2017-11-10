<template>
  <button
    :class="$style.Btn"
    :type="type"
  ><slot /></button>
</template>

<script>
export default {
  props: ['type']
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.Btn
  padding: 0.875rem 2rem
  color: #fff
  background: primary
  border-radius: 3px
  font-size: inherit
  border: 0
  textCaps()
</style>
