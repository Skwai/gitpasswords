<template>
  <button
    :class="$style.AppBtn"
    :type="type"
    @click="click"
  ><slot /></button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button'
    }
  },

  methods: {
    click (ev) {
      if (this.$listeners.click) {
        this.$listeners.click()
      }
      return ev
    }
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.AppBtn
  padding: 0.875rem 2rem
  color: #fff
  background: primary
  border-radius: 3px
  font-size: inherit
  border: 0
  textCaps()
  cursor: pointer
</style>
