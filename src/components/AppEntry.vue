<template>
  <form :class="$style.AppEntry" @submit.prevent="save">
    <header :class="$style.AppEntry__Header">
      <h3 :class="$style.AppEntry__ID">ID: {{entry.id}}</h3>
    </header>
    <div :class="$style.AppEntry__Fields">
      <p
        :class="$style.AppEntry__Modified"><time
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
    <footer :class="$style.AppEntry__Footer">
      <AppBtn
        type="submit"
        :disabled="!isDirty"
        :loading="saving"
      >Save</AppBtn>
      <div
        :class="$style.AppEntry__Dirty"
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

<script>
import Entry from '@/models/Entry'
import AppField from './AppField'
import AppBtn from './AppBtn'
import { generatePassword } from '@/services/password'

const PASSWORD_MASK = '***************'

export default {
  components: {
    AppField,
    AppBtn
  },

  props: {
    entryID: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      entry: { ...new Entry() },
      saving: false,
      destroying: false,
      error: null,
      isDirty: false,
      passwordShown: false,
      mask: PASSWORD_MASK
    }
  },

  watch: {
    entry: {
      handler () {
        const prev = JSON.stringify(this.getEntry())
        const curr = JSON.stringify(this.entry)
        this.isDirty = prev !== curr
      },
      deep: true
    }
  },

  methods: {
    getEntry () {
      return { ...this.$store.getters.entryByID(this.entryID) }
    },

    generatePassword () {
      if (this.entry.password && !confirm('Are you sure? This will replace your current password')) {
        return
      }
      this.passwordShown = true
      this.entry.password = generatePassword(20)
    },

    togglePasswordShown () {
      this.passwordShown = !this.passwordShown
    },

    async save () {
      this.saving = true
      try {
        this.entry.modified = new Date().toISOString()
        this.$store.dispatch('updateEntry', this.entry)
        await this.$store.dispatch('saveEntries')
        this.isDirty = false
        this.revealed = false
      } catch (err) {
        this.$store.dispatch('showError', 'There was an error saving your entry')
      } finally {
        this.saving = false
      }
    },

    async destroy () {
      if (!confirm('Are you sure you want to delete this entry?')) {
        return
      }
      this.destroying = true
      try {
        this.$store.dispatch('deleteEntry', this.entry.id)
        await this.$store.dispatch('saveEntries')
        this.$store.dispatch('setActiveEntryID', null)
      } catch (err) {
        this.$store.dispatch('showError', 'There was an error deleting this entry')
      } finally {
        this.destroying = false
      }
    }
  },

  computed: {
    showPassword () {
      if (this.emptyPassword) {
        return true
      }
      return this.passwordShown
    },

    emptyPassword () {
      return !this.entry.password || !this.entry.password.length
    },

    modified () {
      const date = new Date(this.entry.modified)
      return {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString()
      }
    }
  },

  created () {
    this.entry = Object.assign(this.entry, this.getEntry())
    this.isDirty = false
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

@keyframes AppEntry__Inner
  from
    opacity: 0
  to
    opacity: 1

.AppEntry
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
    animation: AppEntry__Inner 0.25s 0.25s ease forwards

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
