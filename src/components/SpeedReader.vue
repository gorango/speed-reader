<template>
  <section>
    <div>
      <textarea tabindex="0" rows="10" v-model='text' v-on:keyup.enter='read'></textarea>
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
        `By not having to move your eyes across the screen ` +
        `in order to follow the text, you can use more ` +
        `of your cognitive bandwidth to process the text ` +
        `more quickly (and more efficiently).` +
        ` Enjoy!`
    }
  },
  methods: {
    read (e) {
      if (e.ctrlKey) store.dispatch('read', this.text)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea {
  display: block;
  margin: 0 auto;
  max-width: 600px;
  padding: 1rem;
  width: 100%;
}
</style>
