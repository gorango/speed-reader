<template lang="pug">
main.flex.flex-column.justify-center.items-center.relative
  h1.center Speed Reader
  router-view
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="postcss">
@import './styles';

body { background: transparent }

a { cursor: pointer }

#app {
  height: 100vh;
  width: 100vw;
}
</style>
