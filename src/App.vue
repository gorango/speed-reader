<template>
  <div id="app" class="flex flex-column">
    <header class="p2 bg-darken-1 mb4 center">
      <h1 class="h3 m0 regular">
        Speed Reader Experiment
      </h1>
    </header>
    <speed-reader class="flex-auto"></speed-reader>
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
  * { font-family: 'Ubuntu Mono'; }

  #app { height: 100vh }
</style>
