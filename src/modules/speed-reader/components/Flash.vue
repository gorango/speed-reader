<template lang="pug">
  .flash.mx-auto
    output.flex.rounded.overflow-hidden.border-top.border-bottom.border-black(style='border-width: 3px')
      .flex.justify-center.items-center(style='width: 30px')
        span(v-if='word.wraps') {{ word.wraps.LEFT }}
      .word.flex.flex-auto.items-center.relative(v-bind:class='`offset-${word.offset}`')
        span {{ word.text }}
      .flex.justify-center.items-center(style='width: 30px')
        span(v-if='word.wraps') {{ word.wraps.RIGHT }}
    tracker(v-if='tracker', :moduleName='moduleName')
</template>

<script>
import Tracker from './Tracker'

export default {
  components: {
    Tracker
  },
  props: [
    'tracker',
    'moduleName'
  ],
  computed: {
    word () { return this.$store.state[this.moduleName] ? this.$store.state[this.moduleName].word : { wraps: {} } }
  }
}
</script>

<style lang="css" scoped>
  output {
    font-family: 'Ubuntu Mono';
    border-width: 3px;
    font-size: 42px;
    min-height: 90px;
  }

  .flash {
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
