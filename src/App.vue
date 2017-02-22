<template>
  <div class="pt4 flex flex-column justify-center items-center relative">
    <speed-reader></speed-reader>
  </div>
</template>

<script>
import SpeedReader from './components/reader'
import store from './store'

export default {
  name: 'app',
  store,
  components: {
    SpeedReader
  }
}
</script>

<style>
  body { background: transparent }
</style>
