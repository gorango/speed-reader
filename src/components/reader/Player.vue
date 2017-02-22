<template lang="html">
  <div class="player mx-auto">
    <output class="flex rounded overflow-hidden border-top border-bottom border-black" style="border-width: 3px">
      <div class='flex justify-center items-center' style="width: 30px">
        <span v-if='word.wraps'>{{ word.wraps.LEFT }}</span>
      </div>
      <div class='word flex flex-auto items-center relative'
        v-bind:class='`offset-${word.offset}`'>
        <span>
          {{ word.text }}
        </span>
      </div>
      <div class='flex justify-center items-center' style="width: 30px">
        <span v-if='word.wraps'>{{ word.wraps.RIGHT }}</span>
      </div>
    </output>
    <tracker v-if="tracker"></tracker>
  </div>
</template>

<script>
import Tracker from './Tracker'

export default {
  name: 'player',
  components: {
    Tracker
  },
  props: [
    'tracker'
  ],
  computed: {
    word () { return this.$store.state.word }
  }
}
</script>

<style lang="css">
  output {
    font-family: 'Ubuntu Mono';
    border-width: 3px;
    font-size: 42px;
    min-height: 90px;
  }

  .player {
    width: 360px;
  }

  .word small {
    font-size: 14px;
    line-height: 1;
    padding: .25rem;
  }

  .word::before,
  .word::after {
    background: rgba(0, 0, 0, 1);
    content: '';
    display: block;
    height: 8px;
    left: 4.45ch;
    position: absolute;
    width: 3px;
  }

  .word::before { top: 0 }
  .word::after { bottom: 0 }

  .offset-1 { padding-left: 1ch }
  .offset-2 { padding-left: 2ch }
  .offset-3 { padding-left: 3ch }
  .offset-4 { padding-left: 4ch }
</style>
