<template>
  <div id="app">
    <speed-reader></speed-reader>
  </div>
</template>

<script>
import SpeedReader from './components/SpeedReader'
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
* { box-sizing: border-box }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
