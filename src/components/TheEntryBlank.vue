<template>
  <h3 :class="$style.TheEntryBlank">
    Select an entry to edit it, or create a  new one
  </h3>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TheEntryBlank extends Vue {}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.TheEntryBlank
  background: transparent
  padding: $spacingBase
  text-align: center
</style>
