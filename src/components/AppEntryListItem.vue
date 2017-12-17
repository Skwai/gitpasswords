<template>
  <div
    tabindex="1"
    :class="$style.AppEntryListItem"
    @click="selectEntry"
    :selected="selected"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke-linecap="square" stroke-miterlimit="10"><path d="M18 1L9.766 9.234A6.953 6.953 0 0 0 8 9a7 7 0 1 0 7 7c0-.891-.173-1.74-.476-2.524L17 11V8h3l3-3V1h-5z"/><circle data-color="color-2" cx="8" cy="16" r="2"/></g></svg>
    {{entry.title}}
  </div>
</template>

<script>
export default {
  props: {
    entry: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      default: false,
      required: false
    }
  },

  methods: {
    selectEntry () {
      this.$store.dispatch('setActiveEntryID', this.entry.id)
    }
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.AppEntryListItem
  padding: 1rem $spacingBase
  font-weight: 600
  white-space: nowrap
  max-width: 100%
  text-overflow: ellipsis
  cursor: pointer
  transition: background $transitionBase, opacity $transitionBase
  will-change: background, opacity

  + .AppEntryListItem
    margin-top: -1px

  svg
    width: 1.75rem
    height: 1.75rem
    margin-right: $spacingBase
    stroke: currentColor
    opacity: .35

    @media (min-width: $breakpoint)
      display: none

  @media (max-width: 639px)
    border-top: $grayLight solid 1px
    display: flex
    align-items: center

    &:first-child
      border-top: 0

  &[selected]
    color: $primary

  &:hover,
  &:active,
  &:focus
    color: $primary

  &:focus
    outline: 0
  </style>
