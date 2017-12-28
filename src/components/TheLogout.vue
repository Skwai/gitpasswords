<template>
  <AppBtn
    @click="logout"
    color="secondary"
  >Log out</AppBtn>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppBtn from './AppBtn'

@Component({
  components: {
    AppBtn
  }
})
export default class TheLogout extends Vue {
  logout (): void {
    this.$store.dispatch('logout')
  }
}
</script>
