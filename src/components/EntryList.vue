<template>
  <div :class="$style.EntryList" :open="!entryID">
    <EntryListItem
      :key="entry.id"
      :selected="entryID === entry.id"
      :entry="entry"
      v-for="entry in entries"
    ></EntryListItem>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import EntryListItem from './EntryListItem.vue'

@Component({
  components: {
    EntryListItem
  }
})
export default class EntryList extends Vue {
  @Getter entries: GitPasswords.EntryData[]
  @Getter entryID: string
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.EntryList
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
