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

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import AppEntryIcon from './AppEntryIcon.vue'
import { Action } from 'vuex-class'

@Component({
  components: {
    AppEntryIcon
  }
})
export default class AppEntryListItem extends Vue {
  @Prop({ required: true })
  entry: GitPasswords.EntryData

  @Prop({ default: false })
  selected: boolean

  @Action('setActiveEntryID') setActiveEntryIDAction: (entryID: string | null) => void

  selectEntry (): void {
    this.setActiveEntryIDAction(this.entry.id)
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.AppEntryListItem
  padding: 1rem $spacingBase 1rem calc(2.5rem + 16px)
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
  position: relative
  user-select: none
  pointer-events: none

  img
    opacity: 0.35
    transition: $transitionBase
    filter: grayscale(1)
    transform-origin: center center
    position: absolute
    left: $spacingBase
    top: 50%
    transform: translateY(-50%)

  &:hover img,
  &[selected] img
    opacity: 1
    filter: grayscale(0)
    transform: scale(1.1) translateY(-50%)

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
