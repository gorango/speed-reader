<template>
  <section class="flex flex-column">
    <textarea class="p2 mx-auto max-width-3 block"
      v-if='!active' tabindex="0" v-model='text'></textarea>
    <display-area></display-area>
    <player class="mt3"></player>
    <slider class="mt1"></slider>
    <control class="mt1" v-bind:text='text'></control>
  </section>
</template>

<script>
import DisplayArea from './DisplayArea'
import Control from './Control'
import Player from './Player'
import Slider from './Slider'

export default {
  name: 'speed-reader',
  components: {
    DisplayArea,
    Control,
    Player,
    Slider
  },
  data () {
    return {
      text: `Overview\n\nThere are a few popular implementations of speed-readers online. But most are dated, clunky, or exclusive to mobile. So I decided to take a stab at building my own.\n\nInspiration\n\nSpritz was the the main inspiration for this project (for a live demo check out Readsy or watch a Tech Crunch interview with the founder).\n\nSome great features in this implementation:\n\n- Variable display duration based on word length and position\n\n- Optimized word’s center alignment based on length\n\nSome shortcomings in this implementation:\n\n- Quoted and parenthesized text is difficult to identify\n\n- Few or poor controls\n\n- Little or no customization\n\n- No progress indicators\n\n- No traversal through original text available\n\n- No alternate modes for scrolling, chunking, or sliding text.\n\nWith these notes, I started hacking away. I gave myself a weekend to complete a working demo.\n\nTry using my reader to re-read what you just read`
    }
  },
  computed: {
    active () { return this.$store.state.active }
  }
}
</script>

<style scoped>
  textarea {
    font-size: 16px;
    line-height: 1;
    height: 400px;
    overflow: auto;
    resize: none;
    width: 100%;
  }
</style>
