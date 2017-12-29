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
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AppField extends Vue {
  @Prop()
  label: string

  @Prop({ default: 'text' })
  type: string

  @Prop({ default: false })
  required: boolean

  @Prop({ default: null })
  value: string|number|null

  @Prop({ default: false })
  disabled: boolean

  @Prop({ default: 'on' })
  autocomplete: string

  @Prop({ default: 'on' })
  autocapitalize: string

  @Prop({ default: 'on' })
  autocorrect: string

  @Prop({ default: 'on' })
  spellcheck: string

  get uid (): string {
    return Math.random().toString(16).substr(2)
  }

  get inputID (): string {
    return `${this.uid}__Input`
  }
}
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
