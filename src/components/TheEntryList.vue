<template>
  <div :class="$style.TheEntryList" :open="!entryID">
    <AppEntryListItem
      :key="entry.id"
      :selected="entryID === entry.id"
      :entry="entry"
      v-for="entry in entries"
    ></AppEntryListItem>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppEntryListItem from './AppEntryListItem'

export default {
  components: {
    AppEntryListItem
  },

  computed: {
    ...mapGetters(['entries', 'entryID'])
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.TheEntryList
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
    card()
    padding: 0

    &[open]
      display: block

  @media (min-width: $tablet)
    display: block
    overflow-y: auto
    margin: $spacingBase (-1 * $spacingBase) 0
</style>
