<template>
  <form :class="$style.AppEntry" @submit.prevent="save">
    <header :class="$style.AppEntry__Header">
      <h3 :class="$style.AppEntry__ID">ID: <i>{{entry.id}}</i></h3>
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
      ></AppField>
      <AppField
        label="Password"
        v-model="entry.password"
      ></AppField>
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
      >Save Entry</AppBtn>
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
      isDirty: false
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

    async save () {
      this.saving = true
      try {
        this.entry.modified = new Date().toISOString()
        this.$store.dispatch('updateEntry', this.entry)
        this.isDirty = false
        await this.$store.dispatch('saveEntries')
      } catch (err) {
        this.$store.dispatch('showError', 'There was an error saving your entry')
      } finally {
        this.saving = false
      }
    },

    async destroy () {
      if (!confirm('Are you sure you want to delete this entry?')) return
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
  max-width: 40rem
  background: #ffffff
  height: 100%
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05)
  border-right: 1px solid grayLight
  background: #fff
  transform-origin: left top
  display: flex
  flex-direction: column
  max-height: 100vh

  &__Footer,
  &__Header,
  &__Fields
    opacity: 0
    padding: spacingBase
    animation: AppEntry__Inner 0.25s 0.25s ease forwards

  &__Dirty
    margin-left: 1rem
    opacity: .5
    fontSmall()

  &__Footer
    display: flex
    align-items: center
    border-top: grayLight solid 1px
    margin: auto 0 0

    button:last-child
      margin-left: auto

  &__Fields
    overflow-y: scroll

  &__Modified
    opacity: .5
    margin-left: auto
    fontSmall()
    margin-top: 0

  &__Header
    display: flex
    align-items: center
    flex-wrap: wrap
    text-overflow: hidden
    border-bottom: grayLight solid 1px
    padding-bottom: spacingBase

  &__ID
    margin: 0
    opacity: 0.5
    font-weight: 500

    i
      font-style: normal
</style>
