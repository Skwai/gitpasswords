<template>
  <div
    tabindex="1"
    :class="$style.AppEntryListItem"
    @click="selectEntry"
    :selected="selected"
  >
    <AppEntryIcon v-if="entry.url" :url="entry.url"></AppEntryIcon>
    {{entry.title}}
  </div>
</template>

<script>
import AppEntryIcon from './AppEntryIcon'

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

  components: {
    AppEntryIcon
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
  overflow: hidden
  display: flex
  align-items: center

  img
    margin-right: 1em

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
