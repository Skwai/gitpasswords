<template>
  <div :class="$style.Entries">
    <div :class="$style.Entries__List">
      <TheNav></TheNav>
    </div>
    <div :class="$style.Entries__Entry">
      <TheEntry
        v-if="entryID"
        :key="entryID"
        :entryID="entryID"
      ></TheEntry>
      <AppEntryBlank v-else></AppEntryBlank>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import TheEntry from './TheEntry.vue'
import AppEntryBlank from './AppEntryBlank.vue'
import TheNav from './TheNav.vue'

@Component({
  components: {
    TheNav,
    TheEntry,
    AppEntryBlank
  }
})
export default class TheEntries extends Vue {
  @Getter
  entryID
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.Entries
  max-height: 100vh
  height: 100vh
  display: flex

  @media (max-width: $mobile)
    overflow: hidden
    flex-direction: column

  &__List
    @media (min-width: $tablet)
      flex: 0 0 16rem
      max-width: 16rem

  &__Entry
    flex: 1
    overflow-y: auto
</style>
