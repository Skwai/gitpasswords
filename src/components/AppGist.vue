<template>
  <div :class="$style.AppGist" @click="$listeners.click">
    {{gist.id}}: {{filename}}
    <small>{{updatedAt}}</small>
  </div>
</template>

<script>

export default {
  props: {
    gist: {
      type: Object,
      required: true
    }
  },

  computed: {
    filename () {
      return Object.keys(this.gist.files).shift()
    },

    updatedAt () {
      return new Date(this.gist.updated_at).toISOString()
    }
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.AppGist
  selectable()

</style>
