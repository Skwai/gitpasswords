<template>
  <div :class="$style.AppLoading">
    <AppSpinner></AppSpinner>
  </div>
</template>

<script>
import AppSpinner from './AppSpinner'

export default {
  components: {
    AppSpinner
  }
}
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
  color: grayDark
  margin: spacingBase auto
</style>
