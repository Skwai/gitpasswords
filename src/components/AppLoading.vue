<template>
  <div :class="$style.AppLoading">
    <AppSpinner></AppSpinner>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppSpinner from './AppSpinner.vue'

@Component({
  components: {
    AppSpinner
  }
})
export default class AppLoading extends Vue {}
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
