<template>
  <div class="Entries">
    <div class="Entries__List"><EntryList /></div>
    <div class="Entries__Entry">
      <Entry v-if="entryId" />
      <EntryBlank v-else />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EntryList from './EntryList'
import Entry from './Entry'

export default {
  components: {
    EntryList,
    Entry
  },

  computed: {
    ...mapGetters(['entryId'])
  }
}
</script>

<style lang="stylus">
.Entries
  min-height: 100vh
  display: flex

  &__List
    flex: 0 0 14rem

  &__Entry
    flex: 1
</style>
