<template>
  <div :class="$style.Entries">
    <div :class="$style.Entries__List"><TheEntryList /></div>
    <div :class="$style.Entries__Entry">
      <AppEntry v-if="entryID" :key="entryID" :entryID="entryID" />
      <AppEntryBlank v-else />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppEntry from './AppEntry'
import AppEntryBlank from './AppEntryBlank'
import TheEntryList from './TheEntryList'

export default {
  components: {
    TheEntryList,
    AppEntry,
    AppEntryBlank
  },

  computed: {
    ...mapGetters(['entryID'])
  }
}
</script>

<style lang="stylus" module>
.Entries
  min-height: 100vh
  display: flex

  &__List
    flex: 0 0 14rem

  &__Entry
    flex: 1
</style>
