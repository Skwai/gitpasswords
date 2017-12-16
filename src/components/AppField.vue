<template>
  <div :class="$style.AppField">
    <label :class="$style.AppField__Label" :for="inputID">{{label}}</Label>
    <textarea v-if="type === 'textarea'"
      :class="$style.AppField__Input"
      :value="value"
      :required="required"
      @input="$emit('input', $event.target.value)"
      rows="5"
      cols="20"
      :id="inputID"
    ></textarea>
    <input
      v-else
      :type="type"
      :class="$style.AppField__Input"
      :value="value"
      :required="required"
      @input="$emit('input', $event.target.value)"
      :id="inputID"
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
      type: Boolean,
      default: false
    },
    value: {
      required: true,
      default: null
    }
  },

  computed: {
    inputID () {
      return `${this._uid}__Input`
    }
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.AppField
  margin: spacingBase 0
  position: relative
  text-align: left

  &__Label
    display: block
    margin: 0 0 0.35rem
    font-weight: 500

  &__Input
    input()
</style>
