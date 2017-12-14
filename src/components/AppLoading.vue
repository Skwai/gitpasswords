<template>
  <div class="Loading">
    <svg class="Loading__Icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <path class="Loading__IconOuter" d="M20.2 5.17c-8.253 0-14.945 6.69-14.945 14.945 0 8.255 6.692 14.946 14.946 14.946s14.947-6.69 14.947-14.945c0-8.254-6.692-14.946-14.946-14.946zm0 26.58c-6.424 0-11.633-5.21-11.633-11.635S13.777 8.48 20.2 8.48c6.426 0 11.634 5.21 11.634 11.635 0 6.426-5.208 11.634-11.633 11.634z"/>
      <path class="Loading__IconInner" d="M27.608 28.794l2.214 2.46c1.89-1.698 3.38-3.89 4.22-6.48l-3.15-1.023c-.654 2.016-1.814 3.722-3.284 5.044z"/>
    </svg>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus">
@require "../styles/config"

@keyframes loading
  from
    transform: rotate(0deg)
  to
    transform: rotate(359deg)

.Loading
  size = 3rem

  min-height: size
  min-width: size
  display: flex
  align-items: center
  justify-content: center

  &__Icon
    width: (size / 5 * 3)
    height: (size / 5 * 3)
    animation: loading 1s infinite

    &Inner,
    &Outer
      fill: colorPrimary

    &Outer
      opacity: .2
</style>
