<template>
  <nav :class="$style.EntryList">
    <AppMobile :class="$style.EntryList__Mobile">
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
    </AppMobile>
    <AppDesktop>
      <AppBtn @click="createEntry">New Entry</AppBtn>
    </AppDesktop>
    <div :class="$style.EntryList__Entries" :open="!entryID">
      <AppEntryListItem
        :key="entry.id"
        :selected="entryID === entry.id"
        :entry="entry"
        v-for="entry in entries"
      ></AppEntryListItem>
    </div>
    <AppDesktop :class="$style.EntryList__Logout">
      <TheLogout></TheLogout>
    </AppDesktop>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import AppBtn from './AppBtn'
import AppMobile from './AppMobile'
import AppDesktop from './AppDesktop'
import AppEntryListItem from './AppEntryListItem'
import TheLogout from './TheLogout'

export default {
  components: {
    AppBtn,
    AppMobile,
    AppDesktop,
    AppEntryListItem,
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

  @media (min-width: 768px)
    button
      width: 100%

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

    @media (min-width: 768px)
      display: none

    &Add
      margin-left: auto

  &__MobileButton
    padding: 0
    background: transparent
    border: 0

    &:focus
      outline: 0

    svg
      width: 2rem
      height: 2rem
      fill: #fff

  &__Logout
    @media (max-width: 767px)
      margin-left: auto

    @media (min-width: 768px)
      margin-top: auto
</style>
