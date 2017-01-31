<template lang='html'>
  <section>
    <div class='player'>
      <div class='left'>
        <span v-if='word.wraps'>{{ word.wraps.LEFT }}</span>
      </div>
      <div class='word' v-bind:class='word.offset'>
        <span class='h1 m0'>
          {{ word.word }}
        </span>
        <small class='wpm'>{{ wpm }}</small>
      </div>
      <div class='right'>
        <span v-if='word.wraps'>{{ word.wraps.RIGHT }}</span>
      </div>
    </div>
    <!-- <div>
      <progress v-bind:value='progress.value' v-bind:max='progress.max' v-html='progress.value'></progress>
    </div> -->
    <div>
      <input
        type='range'
        min='0'
        v-bind:value='progress.value'
        v-bind:max='progress.max'
        v-on:input='update'
        v-on:keydown='skip'
        />
    </div>
  </section>
</template>

<script>
export default {
  name: 'reader',
  created () {
    window.addEventListener('keydown', this.control)
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.control)
  },
  computed: {
    progress () { return this.$store.state.progress },
    word () { return this.$store.state.word },
    wpm () { return this.$store.state.wpm }
  },
  methods: {
    update (e) {
      let value = Number.parseInt(e.target.value)
      this.$store.dispatch('skip', value)
    },
    skip (e) {
      // BUG: preventDefault and stopPropagation don't work
      // BUG: for some reason, subtracting 1 from progress value produces correct slider behaviour.
      this.progress.value = this.progress.value - 1
    },
    control (e) {
      const textarea = document.querySelectorAll('textarea')[0]
      const slider = document.querySelectorAll('input[type="range"]')[0]
      if (e.target !== textarea || e.ctrlKey && e.target.value === 13) {
        switch (e.which) {
          case 13: // enter
            e.ctrlKey && this.$store.dispatch('read', this.text)
            break
          case 32: // space
            this.reading
              ? this.$store.dispatch('pause')
              : this.$store.dispatch('play')
            break
          case 37: // left
            if (e.ctrlKey) this.$store.dispatch('skip', 'PREV')
            else slider.stepDown()
            break
          case 38: // up
            this.$store.dispatch('speed', 'UP')
            break
          case 39: // right
            if (e.ctrlKey) this.$store.dispatch('skip', 'NEXT')
            else slider.stepUp()
            break
          case 40: // down
            this.$store.dispatch('speed', 'DOWN')
            break
        }
      }
    }
  }
}
</script>

<style lang='css' scoped>
  .wpm {
    text-align: center;
  }

  .player, progress, input {
    display: block;
    width: 360px;
    margin: 1rem auto;
  }

  .player {
    background: rgba(0, 0, 0, 0.1);
    display: flex
  }

  .left, .right {
    background: rgba(0, 0, 0, 0.1);
    justify-content: center;
    width: 30px
  }

  .left, .right, .word {
    display: flex;
    font-size: 36px;
    font-family: 'Ubuntu Mono';
    font-weight: bold;
    align-items: center;
  }

  .word {
    height: 100px;
    position: relative;
    flex: auto;
  }

  .word small {
    bottom: 0;
    line-height: 1;
    position: absolute;
    padding: .1rem;
    right: 0;
    font-size: 14px;
  }

  .word::before,
  .word::after {
    background: rgba(0, 0, 0, 0.1);
    content: '';
    display: block;
    height: 20px;
    left: 4.25ch;
    position: absolute;
    width: .5ch;
  }

  .word::before { top: 0 }
  .word::after { bottom: 0 }

  .offset-1 { padding-left: 1ch }
  .offset-2 { padding-left: 2ch }
  .offset-3 { padding-left: 3ch }
  .offset-4 { padding-left: 4ch }
</style>
