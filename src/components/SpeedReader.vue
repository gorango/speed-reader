<template>
  <section>
    <div>
      <textarea v-if='!reading' tabindex="0" v-model='text' v-on:keyup.enter='read'></textarea>
      <article v-if='reading'>
        {{ text }}
      </article>
    </div>
    <div class='play-controls'>
      <button v-on:click='prev()'>prev</button>
      <button v-if='!reading' v-on:click='read()'>play</button>
      <button v-if='reading' v-on:click='pause'>pause</button>
      <button v-on:click='next()'>next</button>
    </div>
    <reader></reader>
  </section>
</template>

<script>
import store from '../store'
import Reader from './Reader'

export default {
  name: 'speed-reader',
  components: { Reader },
  data () {
    return {
      text:
        `Ready...? ` +
        `"This is a speed reading experiment." ` +
        `Follow along -- see how easy it is to ` +
        `read at speeds far above your current comfort level. ` +
        `Enjoy!`
    }
  },
  computed: {
    reading () {
      return this.$store.state.reading
    }
  },
  methods: {
    read (e) {
      if (e) {
        if (e.ctrlKey) store.dispatch('read', this.text)
      } else {
        store.dispatch('read', this.text)
      }
    },
    play () { store.dispatch('play') },
    pause () { store.dispatch('pause') },
    next () { store.dispatch('next') },
    prev () { store.dispatch('prev') }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea, article {
  display: block;
  font-size: 14px;
  font-family: monospace;
  height: 200px;
  margin: 0 auto;
  max-width: 600px;
  padding: 1rem;
  width: 100%;
}

article { border: 1px solid transparent }

.play-controls {
  text-align: center;
  margin-top: 1rem;
}
</style>
