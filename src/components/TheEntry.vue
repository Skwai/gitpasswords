<template>
  <form :class="$style.TheEntry" @submit.prevent="save">
    <header :class="$style.TheEntry__Header">
      <h3 :class="$style.TheEntry__ID">ID: {{entry.id}}</h3>
    </header>
    <div :class="$style.TheEntry__Fields">
      <p
        :class="$style.TheEntry__Modified"><time
        :datetime="entry.modified"
      >Edited {{modified.date}} at {{modified.time}}</time></p>
      <AppField
        label="Title"
        :required="true"
        v-model="entry.title"
      ></AppField>
      <AppField
        label="Username"
        v-model="entry.username"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
      ></AppField>
      <AppField
        label="Password"
        v-if="showPassword"
        v-model="entry.password"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
      >
        <AppBtn
          color="secondary"
          type="button"
          @click="generatePassword"
        >Generate</AppBtn>
      </AppField>
      <AppField
        label="Password"
        v-else
        v-model="mask"
        :disabled="true"
      >
        <AppBtn
          color="secondary"
          type="button"
          @click="togglePasswordShown"
        >Show</AppBtn>
      </AppField>
      <AppField
        label="URL"
        type="url"
        v-model="entry.url"
      ></AppField>
      <AppField
        label="Notes"
        type="textarea"
        v-model="entry.notes"
      ></AppField>
    </div>
    <footer :class="$style.TheEntry__Footer">
      <AppBtn
        type="submit"
        :disabled="!isDirty"
        :loading="saving"
      >Save</AppBtn>
      <div
        :class="$style.TheEntry__Dirty"
        v-if="isDirty"
      >You have unsaved changes</div>
      <AppBtn
        type="button"
        color="secondary"
        @click="destroy"
        :loading="destroying"
      >Delete</AppBtn>
    </footer>
  </form>
</template>

<script lang="ts">
import { Component, Watch, Vue, Prop } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import Entry from '../models/Entry'
import AppField from './AppField.vue'
import AppBtn from './AppBtn.vue'
import { generatePassword } from '../services/password'

const PASSWORD_MASK = '***************'

@Component({
  components: {
    AppField,
    AppBtn
  }
})
export default class TheEntry extends Vue {
  entry: Entry = { ...new Entry() }
  saving: boolean = false
  destroying: boolean = false
  isDirty: boolean = false
  passwordShown: boolean = false
  mask: string = PASSWORD_MASK
  revealed: boolean = false

  @Prop({ required: true })
  entryID: string

  @Getter entryByID: (id: string) => GitPasswords.EntryData | null

  @Action('showError') showErrorAction: (message: string) => void
  @Action('deleteEntry') deleteEntryAction: (entryID: string) => Promise<void>
  @Action('saveEntries') saveEntriesAction: () => Promise<void>
  @Action('setActiveEntryID') setActiveEntryIDAction: (entryID: string | null) => void
  @Action('updateEntry') updateEntryAction: (entry: GitPasswords.EntryData) => void

  @Watch('entry', { deep: true })
  onEntryChanged (val: GitPasswords.EntryData) {
    const prev = JSON.stringify(this.getEntry())
    const curr = JSON.stringify(this.entry)
    this.isDirty = prev !== curr
  }

  getEntry (): GitPasswords.EntryData {
    return { ...this.entryByID(this.entryID) }
  }

  generatePassword (): void {
    if (this.entry.password && !confirm('Are you sure? This will replace your current password')) {
      return
    }
    this.passwordShown = true
    this.entry.password = generatePassword(20)
  }

  togglePasswordShown (): void {
    this.passwordShown = !this.passwordShown
  }

  async save (): Promise<void> {
    this.saving = true
    try {
      this.entry.modified = new Date()
      this.updateEntryAction(this.entry)
      await this.saveEntriesAction()
      this.isDirty = false
      this.revealed = false
    } catch (err) {
      this.showErrorAction('There was an error saving your entry')
    } finally {
      this.saving = false
    }
  }

  async destroy (): Promise<void> {
    if (!confirm('Are you sure you want to delete this entry?')) {
      return
    }
    this.destroying = true
    try {
      this.deleteEntryAction(this.entry.id)
      await this.saveEntriesAction()
      this.setActiveEntryIDAction(null)
    } catch (err) {
      this.showErrorAction('There was an error deleting this entry')
    } finally {
      this.destroying = false
    }
  }

  get showPassword (): boolean {
    if (this.emptyPassword) {
      return true
    }
    return this.passwordShown
  }

  get emptyPassword (): boolean {
    const { password } = this.entry
    return !password || !password.length
  }

  get modified (): { date: string, time: string } {
    const date = new Date(this.entry.modified)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString()
    }
  }

  created (): void {
    this.entry = Object.assign(this.entry, this.getEntry())
    this.isDirty = false
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

@keyframes TheEntry__Inner
  from
    opacity: 0
  to
    opacity: 1

.TheEntry
  height: 100%
  shadow()
  background: #fff
  display: flex
  flex-direction: column

  @media (min-width: $tablet)
    max-width: 40rem
    max-height: 100vh
    border-right: $grayLight solid 1px

  &__Footer,
  &__Header,
  &__Fields
    opacity: 0
    padding: $spacingBase
    animation: TheEntry__Inner 0.25s 0.25s ease forwards

  &__Dirty
    margin-left: 1rem
    opacity: .5
    fontSmall()

    @media (max-width: $mobile)
      display: none

  &__Footer
    display: flex
    align-items: center
    border-top: $grayLight solid 1px

    @media (max-width: $mobile)
      button
        flex: 1
        margin: 0 0.5rem

        &:first-child
          margin-left:  0

        &:last-child
          margin-right: 0

    @media (min-width: $tablet)
      button:last-child
        margin-left: auto

  &__Fields
    overflow-y: auto
    flex: 1

  &__Modified
    opacity: .5
    margin-left: auto
    fontSmall()
    margin-top: 0

  &__Header
    display: flex
    align-items: center
    flex-wrap: wrap
    text-overflow: ellipsis
    border-bottom: $grayLight solid 1px

  &__ID
    margin: 0
    opacity: 0.5
    font-weight: 500
</style>
