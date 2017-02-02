<template lang="html">
  <section>
    <div class='max-width-1 mx-auto flex items-center justify-center'>
      <button class="small" v-on:click='$store.dispatch(`skip`, `PREV_SENTENCE`)'
        title="keyboard: arrow left">
        <i class="material-icons">chevron_left</i>
      </button>
      <div class='flex flex-column items-center'>
        <button class="small" v-on:click='$store.dispatch(`speed`, `UP`)'
          title="keyboard: arrow up">
          <i class="material-icons">expand_less</i>
        </button>
        <button v-if='!playing' v-on:click='$store.dispatch(`play`)'
          title="keyboard: space bar">
          <i class="material-icons">play_arrow</i>
        </button>
        <button v-if='playing' v-on:click='$store.dispatch(`pause`)'
          title="keyboard: space bar">
          <i class="material-icons">pause</i>
        </button>
        <button class="small" v-on:click='$store.dispatch(`speed`, `DOWN`)'
          title="keyboard: arrow down">
          <i class="material-icons">expand_more</i>
        </button>
      </div>
      <button class="small" v-on:click='$store.dispatch(`skip`, `NEXT_SENTENCE`)'
        title="keyboard: arrow right">
        <i class="material-icons">chevron_right</i>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'control',
  props: ['text'],
  computed: {
    active () { return this.$store.state.active },
    playing () { return this.$store.state.playing }
  },
  created () { window.addEventListener('keydown', this.keydown) },
  beforeDestroy () { window.removeEventListener('keydown', this.keydown) },
  methods: {
    read () { this.$store.dispatch('read', this.text) },
    keydown (e) {
      switch (e.which) {
        case 27: // escape
          this.$store.dispatch('stop')
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
    background-color: rgba(0, 0, 0, 0.15);
    border: 1px solid transparent;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    height: 50px;
    margin: .15rem;
    outline: none;
    transition: all .3s;
    width: 50px;
  }

  button:hover { background-color: rgba(0, 0, 0, 0.1) }
  button:active { background-color: rgba(0, 0, 0, 0.2) }

  button.small {
    width: 25px;
    height: 25px;
  }

  button.small i {
    font-size: 1rem;
  }
</style>
