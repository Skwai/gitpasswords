<template>
  <h4 :class="$style.AppError">{{message}}</h4>
</template>

<script>
export default {
  props: {
    message: {
      required: true,
      type: String
    }
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.AppError
  color: #d00
</style>
