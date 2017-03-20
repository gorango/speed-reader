<template lang="pug">
section
  div(
  v-if='display === "flash"')
    flash(:moduleName='moduleName', tracker='true')
  div(
  v-if='display === "guide"')
    guide(:moduleName='moduleName')
  div(
  v-if='display === "chunk"')
    chunk(:moduleName='moduleName')
  footer.mt4.px2.bg-darken-1.flex.justify-center(
  v-if='!!control',
  style='width: 100%')
    controller.my2(style='width: 100%', :text='text', :moduleName='moduleName')
</template>

<script>
import storeModule from '../store'
import Controller from './Controller'
import Tracker from './Tracker'
import Slider from './Slider'
import Flash from './Flash'
import Chunk from './Chunk'
import Guide from './Guide'

export default {
  components: {
    Controller,
    Tracker,
    Slider,
    Flash,
    Chunk,
    Guide
  },
  props: [
    'control',
    'display',
    'text',
    'v'
  ],
  computed: {
    active () { return this.$store.state[this.moduleName] && this.$store.state[this.moduleName].active },
    playing () { return this.$store.state[this.moduleName] && this.$store.state[this.moduleName].playing },
    moduleName () { return `reader-${this.v}` }
  },
  created () {
    window.addEventListener('keydown', this.keydown)
    this.$store.registerModule(this.moduleName, Object.freeze(storeModule))
    this.init()
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.keydown)
    this.$store.unregisterModule(this.moduleName)
  },
  methods: {
    read () { this.$store.dispatch(`${this.moduleName}/read`, this.text) },
    view (view) {
      this.flash = this.chunk = this.guide = false
      this[view] = true
    },
    init () {
      this.$store.dispatch(`${this.moduleName}/initialize`, this.text)
      this.$store.dispatch(`${this.moduleName}/skipTo`, 0)
    },
    keydown (e) {
      switch (e.which) {
        case 27: // escape
          this.$store.dispatch(`${this.moduleName}/stop`)
          this.init()
          break
        case 13: // enter
          e.ctrlKey && this.read()
          break
        case 32: // space
          this.active && (
            this.playing
              ? this.$store.dispatch(`${this.moduleName}/pause`)
              : this.$store.dispatch(`${this.moduleName}/play`))
          break
        case 37: // left
          if (e.ctrlKey) this.$store.dispatch(`${this.moduleName}/skip`, 'PREV_PARAGRAPH')
          else this.$store.dispatch(`${this.moduleName}/skip`, 'PREV_SENTENCE')
          break
        case 38: // up
          this.$store.dispatch(`${this.moduleName}/speed`, 'UP')
          break
        case 39: // right
          if (e.ctrlKey) this.$store.dispatch(`${this.moduleName}/skip`, 'NEXT_PARAGRAPH')
          else this.$store.dispatch(`${this.moduleName}/skip`, 'NEXT_SENTENCE')
          break
        case 40: // down
          this.$store.dispatch(`${this.moduleName}/speed`, 'DOWN')
          break
      }
    }
  }
}
</script>

<style scoped>
button {
  align-items: center;
  background-color: #ddd;
  border: 1px solid transparent;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 80px;
  margin: .15rem;
  outline: none;
  transition: all .3s;
  width: 80px;
  z-index: 1;
}

i { font-size: 42px; }

button:hover { background-color: #eee }
button:active { background-color: #ccc }

textarea {
  font-size: 16px;
  line-height: 1;
  height: 400px;
  overflow: auto;
  resize: none;
  width: 100%;
}
</style>
