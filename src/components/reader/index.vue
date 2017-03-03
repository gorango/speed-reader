<template>
  <section class="flex flex-column" style="height: 100%">
    <nav class="flex bg-darken-1">
      <a class="p3 flex-auto center black caps"
        v-bind:class="{ 'bg-darken-1': singleton }"
        v-on:click="view('singleton')">Flashing</a>
      <a class="p3 flex-auto center black caps"
        v-bind:class="{ 'bg-darken-1': horizontal }"
        v-on:click="view('horizontal')">Scrolling</a>
      <a class="p3 flex-auto center black caps"
        v-bind:class="{ 'bg-darken-1': vertical }"
        v-on:click="view('vertical')">Guiding</a>
    </nav>

    <div class="mt4 flex items-center flex-auto" style="min-height: 200px">
      <singleton v-show="singleton" tracker="true"></singleton>
      <horizontal v-show="horizontal"></horizontal>
      <vertical v-show="vertical"></vertical>
    </div>

    <footer class="mt4 px2 bg-darken-1 flex justify-center" style="width: 100vw">
      <control class="my2"
        style="width: 100%"
        v-bind:text='text'></control>
    </footer>
  </section>
</template>

<script>
import Control from './Control'
import Singleton from './Singleton'
import Tracker from './Tracker'
import Slider from './Slider'
import Horizontal from './Horizontal'
import Vertical from './Vertical'

export default {
  name: 'speed-reader',
  components: {
    Control,
    Singleton,
    Tracker,
    Slider,
    Horizontal,
    Vertical
  },
  data () {
    return {
      text: `Speed reading is any of several techniques used to improve one's ability to read quickly. Speed reading methods include chunking and minimizing subvocalization. The many available speed reading training programs include books, videos, software, and seminars.\n\n\nHistory\n\nPsychologists and educational specialists working on visual acuity used a tachistoscope to conclude that, with training, an average person could identify minute images flashed on the screen for only one five-hundredth of a second (2 ms). Though the images used were of airplanes, the results had implications for reading.\n\nIt was not until the late 1950s that a portable, reliable and convenient device would be developed as a tool for increasing reading speed. Evelyn Wood, a researcher and schoolteacher, was committed to understanding why some people were naturally faster at reading and tried to force herself to read very quickly. In 1958, while brushing off the pages of a book she had thrown down in despair, she discovered that the sweeping motion of her hand across the page caught the attention of her eyes, and helped them move more smoothly across the page. She then used the hand as a pacer. Wood first taught the method at the University of Utah, before launching it to the public as Evelyn Wood's Reading Dynamics in Washington, D.C. in 1959.\n\n\nEffect on comprehension\n\nSkimming alone may not be ideal when complete comprehension of the text is the main objective. Skimming is mainly used when researching and getting an overall idea of the text. Nonetheless, when time is limited, skimming or skipping over text can aid comprehension. Duggan & Payne (2009) compared skimming with reading normally, given only enough time to read normally through half of a text. They found that the main points of the full text were better understood after skimming (which could view the full text) than after normal reading (which only read half the text). There was no difference between the groups in their understanding of less important information from the text.\n\nIn contrast, other findings suggest that speed reading courses which teach techniques that largely constitute skimming of written text result in a lower comprehension rate (below 50% comprehension on standardized comprehension tests).\n\nHyo Sang Shin (2012) in his book "Visual Reading and the Snowball of Understanding" claims that increasing one's reading speed does not lead to decreased comprehension. On the contrary, he argues that the faster the reading speed the better the comprehension. That phenomenon is described by Shin (2012) as a non zero-sum game between the reading speed and comprehension. Arvin Vohra, in "Introduction to Speed Reading and Rapid Analytical Reading" claims that grammar based speed reading can lead to a simultaneous increase in speed and comprehension. Just as moving from letter by letter reading in early childhood to word by word reading in later childhood increases speed and comprehension, he argues that reading clause by clause or phrase by phrase can cause a similar increase in speed and comprehension.\n\n\nSoftware\n\nComputer programs are available to help instruct speed reading students. Some programs present the data as a serial stream, since the brain handles text more efficiently by breaking it into such a stream before parsing and interpreting it. The 2000 National Reading Panel (NRP) report seems to support such a mechanism.\n\nTo increase speed, some older programs required readers to view the center of the screen while the lines of text around it grew longer. They also presented several objects (instead of text) moving line by line or bouncing around the screen; users had to follow the object(s) with only their eyes. A number of researchers criticize using objects instead of words as an effective training method, claiming that the only way to read faster is to read actual text. Many of the newer speed reading programs use built-in text, and they primarily guide users through the lines of an on-screen book at defined speeds. Often the text is highlighted to indicate where users should focus their eyes; they are not expected to read by pronouncing the words, but instead to read by viewing the words as complete images. The exercises are also intended to train readers to eliminate subvocalization, though it has not been proven that this will increase reading speed.`,
      singleton: true,
      horizontal: false,
      vertical: false
    }
  },
  computed: {
    active () { return this.$store.state.active },
    playing () { return this.$store.state.playing }
  },
  created () {
    window.addEventListener('keydown', this.keydown)
    this.init()
  },
  beforeDestroy () { window.removeEventListener('keydown', this.keydown) },
  methods: {
    read () { this.$store.dispatch('read', this.text) },
    view (view) {
      this.singleton = this.horizontal = this.vertical = false
      this[view] = true
    },
    init () {
      this.$store.dispatch('initialize', this.text)
      this.$store.dispatch('skipTo', 0)
    },
    keydown (e) {
      switch (e.which) {
        case 27: // escape
          this.$store.dispatch('stop')
          this.init()
          break
        case 13: // enter
          e.ctrlKey && this.read()
          break
        case 32: // space
          this.active && (
            this.playing
              ? this.$store.dispatch('pause')
              : this.$store.dispatch('play')
          )
          break
        case 37: // left
          if (e.ctrlKey) this.$store.dispatch('skip', 'PREV_PARAGRAPH')
          else this.$store.dispatch('skip', 'PREV_SENTENCE')
          break
        case 38: // up
          this.$store.dispatch('speed', 'UP')
          break
        case 39: // right
          if (e.ctrlKey) this.$store.dispatch('skip', 'NEXT_PARAGRAPH')
          else this.$store.dispatch('skip', 'NEXT_SENTENCE')
          break
        case 40: // down
          this.$store.dispatch('speed', 'DOWN')
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
