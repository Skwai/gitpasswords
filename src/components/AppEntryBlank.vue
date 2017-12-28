<template>
  <h3 :class="$style.EntryBlank">
    Select an entry to edit it, or create a  new one
  </h3>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.EntryBlank
  background: transparent
  padding: $spacingBase
  text-align: center
</style>
