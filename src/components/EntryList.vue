<template>
  <div class="EntryList">
    <Btn>Create New</Btn>
    <div
      v-for="entry in entries"
      :key="entry.id"
      :state:selected="entryId === entry.id"
      class="EntryList__Entry"
    >{{entry.title}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['entries', 'entryId'])
  }
}
</script>

<style lang="stylus">
@import "../styles/config"

.EntryList
  &__Entry
    selectable()
</style>
