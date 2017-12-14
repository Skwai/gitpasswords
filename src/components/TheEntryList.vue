<template>
  <div :class="$style.EntryList">
    <AppBtn @click="createEntry">Create New</AppBtn>
    <div
      v-for="entry in entries"
      :key="entry.id"
      :selected="entryID === entry.id"
      :class="$style.EntryList__Entry"
      @click="selectEntry(entry.id)"
    >{{entry.title}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppBtn from './AppBtn'

export default {
  components: {
    AppBtn
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
  &__Entry
    selectable()
</style>
