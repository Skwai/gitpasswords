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
import { Component, Vue, Prop } from 'vue-property-decorator'

const BASE_URL = 'https://www.google.com/s2/favicons?domain_url='

@Component
export default class AppEntryIcon extends Vue {
  @Prop()
  url: string

  get faviconURL (): string {
    return [BASE_URL, encodeURIComponent(this.url)].join('')
  }
}
</script>

<style lang="stylus" module>
.AppEntryIcon
  border-radius: 2px
</style>
