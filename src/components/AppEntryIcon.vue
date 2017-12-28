<template>
  <img
    :class="$style.AppEntryIcon"
    :src="faviconURL"
    width="16"
    height="16"
    aria-hidden="true"
  >
</template>

<script lang="ts">
import Vue from 'vue'

const BASE_URL = 'https://www.google.com/s2/favicons?domain_url='

export default Vue.extend({
  props: {
    url: {
      type: String,
      required: true
    }
  },

  computed: {
    faviconURL (): string {
      return [BASE_URL, encodeURIComponent(this.url)].join('')
    }
  }
})
</script>

<style lang="stylus" module>
.AppEntryIcon
  border-radius: 2px
</style>
