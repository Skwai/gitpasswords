<template>
  <div
    tabindex="1"
    :class="$style.AppEntryListItem"
    @click="selectEntry"
    :selected="selected"
  >{{entry.title}}</div>
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
