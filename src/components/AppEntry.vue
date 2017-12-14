<template>
  <div :class="$style.Entry">

  </div>
</template>

<script>
import Entry from '@/models/Entry'

export default {
  props: {
    entryID: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      entry: { ...new Entry() }
    }
  },

  created () {
    Object.assign(this.entry, this.$store.getters.entryById(this.entryID))
  }
}
</script>

<style lang="stylus" module>
.Entry
  background: #fff
</style>
