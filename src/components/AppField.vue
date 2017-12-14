<template>
  <div :class="$style.FormField">
    <label :class="$style.FormField__Label">{{label}}</Label>
    <input
      :type="type"
      :class="$style.FormField__Input"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  props: {
    label: {
      required: true,
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    required: {
      type: Boolean
    },
    value: {
      required: true
    }
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.FormField
  margin: spacingBase
  position: relative
  text-align: left

  &__Label
    display: block
    margin: 0 0 0.35rem
    font-weight: 500

  &__Input
    border: colorLight solid 1px
    box-shadow: none
    padding: 0.75rem
    width: 100%
    font-size: inherit

    &:focus
      box-shadow: none
      outline: 0

</style>
