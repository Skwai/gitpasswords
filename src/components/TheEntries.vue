<template>
  <div :class="$style.Entries">
    <div :class="$style.Entries__List">
      <TheNav></TheNav>
    </div>
    <div :class="$style.Entries__Entry">
      <AppEntry
        v-if="entryID"
        :key="entryID"
        :entryID="entryID"
      ></AppEntry>
      <AppEntryBlank v-else></AppEntryBlank>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppEntry from './AppEntry'
import AppEntryBlank from './AppEntryBlank'
import TheNav from './TheNav'

export default {
  components: {
    TheNav,
    AppEntry,
    AppEntryBlank
  },

  computed: {
    ...mapGetters(['entryID'])
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.Entries
  @media (min-width: $breakpoint)
    height: 100vh
    max-height: 100vh
    display: flex

  &__List
    @media (min-width: $breakpoint)
      flex: 0 0 14rem

  &__Entry
    flex: 1
</style>
