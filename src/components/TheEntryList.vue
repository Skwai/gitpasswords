<template>
  <nav :class="$style.EntryList">
    <div :class="$style.EntryList__Mobile">
      <button
        v-if="entryID"
        :class="[$style.EntryList__MobileButton, $style.EntryList__MobileBack]"
        aria-hidden="true"
        @click="selectEntry(null)"
      ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none"  stroke-width="1" stroke-linecap="square" stroke-miterlimit="10" d="M17 2L7 12l10 10"/></svg>
      </button>
      <button
        :class="[$style.EntryList__MobileButton, $style.EntryList__MobileAdd]"
        aria-hidden="true"
        @click="createEntry"
      ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2v20m10-10H2" fill="none"  stroke-width="1" stroke-linecap="square" stroke-miterlimit="10"/></svg>
      </button>
      <button
        :class="[$style.EntryList__MobileButton, $style.EntryList__MobileLogout]"
        aria-hidden="true"
        @click="logout"
      ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke-width="1"  stroke-linecap="square" stroke-miterlimit="10"><path d="M12 1C9.2 1 7 3.2 7 6v3h10V6c0-2.8-2.2-5-5-5zM4 9h16v14H4z"/><circle cx="12" cy="15" r="2"/><path d="M12 17v2"/></g></svg>
      </button>
    </div>
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
    },

    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config"

.EntryList
  background: #fff
  height: 100%
  box-shadow: rgba(0,0,0,.125) 0 0 10px
  position: relative
  display: flex
  max-height: 100vh

  @media (max-width: 639px)
    border-bottom: grayLight solid 1px

  @media (min-width: $breakpoint)
    border-right: grayLight solid 1px
    padding: spacingBase
    flex-direction: column

  @media (min-width: $breakpoint)
    button
      width: 100%

  &__Entries
    @media (max-width: 639px)
      display: none
      position: absolute
      left: 0.5rem
      right: 0.5rem
      margin-top: 0.5rem
      top: 100%
      z-index: 2
      modalBody()
      padding: 0
      width: auto

      &[open]
        display: block

    @media (min-width: $breakpoint)
      display: block
      overflow-y: scroll
      margin: spacingBase (-1 * spacingBase) 0

  &__MobileButton
    background: transparent
    border: 0
    border-radius: 0
    padding: 1rem

    &:focus
      outline: 0

    svg
      width: 1.5rem
      height: 1.5rem
      stroke: primary
      vertical-align: middle

  &__Mobile
    display: flex
    width: 100%
    align-items: center

    @media (min-width: $breakpoint)
      display: none

    &Logout
      border-left: grayLight solid 1px

    &Back
      border-right: grayLight solid 1px

    &Add
      margin-left: auto
      border-left: grayLight solid 1px

  &__Logout
    @media (max-width: 639px)
      margin-left: auto

    @media (min-width: $breakpoint)
      margin-top: auto
</style>
