<template>
  <div :class="$style.AppField">
    <label :class="$style.AppField__Label" :for="inputID">{{label}}</Label>
    <div :class="$style.AppField__Wrap">
      <textarea v-if="type === 'textarea'"
        :class="$style.AppField__Input"
        :value="value"
        :required="required"
        :disabled="disabled"
        @input="$emit('input', $event.target.value)"
        rows="5"
        cols="20"
        :id="inputID"
        :autocomplete="autocomplete"
        :autocapitalize="autocapitalize"
        :autocorrect="autocorrect"
        :spellcheck="spellcheck"
      ></textarea>
      <input
        v-else
        :type="type"
        :class="$style.AppField__Input"
        :value="value"
        :required="required"
        :disabled="disabled"
        @input="$emit('input', $event.target.value)"
        :id="inputID"
        :autocomplete="autocomplete"
        :autocapitalize="autocapitalize"
        :autocorrect="autocorrect"
        :spellcheck="spellcheck"
      >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
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
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      required: false,
      default: 'on'
    },
    autocapitalize: {
      type: String,
      required: false,
      default: 'on'
    },
    autocorrect: {
      type: String,
      required: false,
      default: 'on'
    },
    spellcheck: {
      type: String,
      required: false,
      default: 'on'
    }
  },

  computed: {
    inputID (): string {
      return `${this._uid}__Input`
    }
  }
})
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.AppField
  margin: $spacingBase 0
  position: relative
  text-align: left

  &__Wrap
    display: flex

    button
      border-top-left-radius: 0
      border-bottom-left-radius: 0

  &__Label
    display: block
    margin: 0 0 0.35rem
    font-weight: 500
    opacity: .5

  &__Input
    input()
    flex: 1
</style>
