<template>
  <h4 :class="$style.Error">{{message}}</h4>
</template>

<script>
export default {
  props: ['message']
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.Error
  color: #d00
</style>
