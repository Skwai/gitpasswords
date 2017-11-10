<template>
  <div class="Gist" @click="selectGist">
    {{gist.id}}: {{gist.description}}
  </div>
</template>

<script>

export default {
  props: ['gist'],

  methods: {
    selectGist () {
      this.$store.dispatch('selectGist', this.gist.id)
    }
  }
}
</script>

<style lang="stylus">
</style>
