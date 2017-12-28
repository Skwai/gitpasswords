<template>
  <div :class="$style.AppLoading">
    <AppSpinner></AppSpinner>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppSpinner from './AppSpinner.vue'

export default Vue.extend({
  components: {
    AppSpinner
  }
})
</script>

<style lang="stylus" module>
@require "../styles/config"

.AppLoading
  size = 3rem
  max-width: size
  max-height: size
  display: flex
  align-items: center
  justify-content: center
  margin: $spacingBase auto
</style>
