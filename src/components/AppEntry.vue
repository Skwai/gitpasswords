<template>
  <form :class="$style.Entry" @submit.prevent="save">
    <AppField
      label="Title"
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

    <AppBtn type="submit">Save</AppBtn>
    <div v-if="isDirty">You have unsaved changes</div>
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
      error: null,
      isDirty: false
    }
  },

  watch: {
    entry: {
      handler () {
        this.isDirty = JSON.stringify(this.getEntry()) !== JSON.stringify(this.entry)
      },
      deep: true
    }
  },

  methods: {
    getEntry () {
      return this.$store.getters.entryByID(this.entryID)
    },

    async save () {
      this.saving = true
      this.error = false
      try {
        this.entry.modified = new Date().toISOString()
        this.$store.dispatch('updateEntry', this.entry)
        this.isDirty = false
        await this.$store.dispatch('saveEntries')
      } catch (err) {
        this.error = 'There was an error saving your changes'
      } finally {
        this.saving = false
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
.Entry
  background: #fff
</style>
