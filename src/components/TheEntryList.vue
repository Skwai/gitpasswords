<template>
  <nav :class="$style.EntryList">
    <div :class="$style.EntryList__Mobile">
      <button
        v-if="entryID"
        :class="[$style.EntryList__MobileButton, $style.EntryList__MobileBack]"
        aria-hidden="true"
        @click="selectEntry(null)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
      </button>
      <button
        :class="[$style.EntryList__MobileButton, $style.EntryList__MobileAdd]"
        aria-hidden="true"
        @click="createEntry"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
      </button>
    </div>
    <AppDesktop>
      <AppBtn @click="createEntry">New Entry</AppBtn>
    </AppDesktop>
    <div :class="$style.EntryList__Entries" :open="!entryID">
      <div
        tabindex="1"
        v-for="entry in entries"
        :key="entry.id"
        :selected="entryID === entry.id"
        :class="$style.EntryList__Entry"
        @click="selectEntry(entry.id)"
      >{{entry.title}}</div>
    </div>
    <AppDesktop>
      <TheLogout></TheLogout>
    </AppDesktop>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import AppBtn from './AppBtn'
import AppMobile from './AppMobile'
import AppDesktop from './AppDesktop'
import TheLogout from './TheLogout'

export default {
  components: {
    AppBtn,
    AppMobile,
    AppDesktop,
    TheLogout
  },

  computed: {
    ...mapGetters(['entries', 'entryID'])
  },

  methods: {
    createEntry () {
      this.$store.dispatch('createEntry')
    },

    selectEntry (entryID) {
      this.$store.dispatch('setActiveEntryID', entryID)
    }
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config"

.EntryList
  background: grayDark
  color: #fff
  height: 100%
  padding: 1rem
  box-shadow: rgba(0,0,0,.15) 0 0 10px, rgba(0,0,0,.15) 0 0 5px
  position: relative
  display: flex

  @media (min-width: 768px)
    padding: spacingBase
    flex-direction: column

  button
    @media (min-width: 768px)
      width: 100%

  &__Entry
    padding: 1rem spacingBase
    font-weight: 600
    white-space: nowrap
    max-width: 100%
    text-overflow: ellipsis
    cursor: pointer
    transition: background 0.2s, opacity 0.2s
    will-change: background, opacity

    @media (max-width: 767px)
      border-top: grayLight solid 1px
      display: flex
      align-items: center

      &:first-child
        border-top: 0

    @media (min-width: 768px)
      opacity: .7

    &:hover,
    &:focus,
    &:active,
    &[selected]
      background: grayLighter

      @media (min-width: 768px)
        background: rgba(255,255,255,.1)

    &[selected],
    &:hover,
    &:active,
    &:focus
      opacity: 1

    &:focus
      outline: 0

  &__Entries
    @media (max-width: 767px)
      display: none
      position: absolute
      left: 0.5rem
      right: 0.5rem
      margin-top: 0.5rem
      top: 100%
      z-index: 2
      color: grayDark
      modalBody()
      padding: 0
      width: auto

      &[open]
        display: block

    @media (min-width: 768px)
      display: block
      margin: spacingBase (-1 * spacingBase) 0

  &__Mobile
    display: flex
    width: 100%
    align-items: center

    &Add
      margin-left: auto

  &__MobileButton
    svg
      width: 2rem
      height: 2rem
      fill: #fff
</style>
