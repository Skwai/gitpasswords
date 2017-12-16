<template>
  <nav :class="$style.EntryList">
    <div :class="$style.EntryList__Inner">
      <AppBtn @click="createEntry">New Entry</AppBtn>
      <div :class="$style.EntryList__Entries">
        <div
          tabindex="-1"
          v-for="entry in entries"
          :key="entry.id"
          :selected="entryID === entry.id"
          :class="$style.EntryList__Entry"
          @click="selectEntry(entry.id)"
        >{{entry.title}}</div>
      </div>
    </div>

    <TheLogout></TheLogout>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import AppBtn from './AppBtn'
import TheLogout from './TheLogout'

export default {
  components: {
    AppBtn,
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
  padding: spacingBase
  box-shadow: rgba(0,0,0,.15) 0 0 10px, rgba(0,0,0,.15) 0 0 5px
  position: relative
  display: flex
  flex-direction: column

  button
    width: 100%

  &__Entry
    padding: 1rem spacingBase
    font-weight: 600
    white-space: nowrap
    text-overflow: ellipsis
    cursor: pointer
    transition: background 0.15s, opacity 0.15s
    will-change: background, opacity
    opacity: .7

    &[selected],
    &:hover,
    &:active,
    &:focus
      opacity: 1

    &[selected]
      background: rgba(255,255,255,.1)

    &:focus
      outline: 0

  &__Entries
    margin: spacingBase (-1 * spacingBase) 0
</style>
