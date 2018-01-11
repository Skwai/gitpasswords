<template>
  <AppModal
    title="Enter your encryption key"
    :open="true"
  >
    <form method="dialog" @submit.prevent="submit">
      <AppField
        label="My encryption key"
        type="password"
        v-model="secret"
        :showLabel="false"
        placeholder="My new encryption key"
      ></AppField>
      <AppBtn type="submit">Decrypt</AppBtn>
    </form>
  </AppModal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import AppModal from './AppModal.vue'
import AppField from './AppField.vue'
import AppBtn from './AppBtn.vue'
import hub from '../services/hub'

@Component({
  components: {
    AppModal,
    AppField,
    AppBtn
  }
})
export default class TheSecretModal extends Vue {
  secret: string = ''

  close (ev: Event): void {
    hub.$emit('close', ev)
  }

  submit (): void {
    hub.$emit('confirm', this.secret)
  }
}
</script>
