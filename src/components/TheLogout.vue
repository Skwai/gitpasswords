<template>
  <AppBtn
    @click="logout"
    color="secondary"
  >Log out</AppBtn>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

import AppBtn from './AppBtn.vue'

@Component({
  components: {
    AppBtn
  }
})
export default class TheLogout extends Vue {
  @Action('logout') actionLogout: () => void

  logout (): void {
    this.actionLogout()
  }
}
</script>
