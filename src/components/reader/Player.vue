<template lang="html">
  <div class='player'>
    <div class='left'>
      <span v-if='word.wraps'>{{ word.wraps.LEFT }}</span>
    </div>
    <div class='word' v-bind:class='`offset-${word.offset}`'>
      <span class='h1 m0'>
        {{ word.word }}
      </span>
      <small class='wpm'>{{ wpm }}</small>
    </div>
    <div class='right'>
      <span v-if='word.wraps'>{{ word.wraps.RIGHT }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'player',
  computed: {
    word () { return this.$store.state.word },
    wpm () { return this.$store.state.wpm }
  }
}
</script>

<style lang="css">
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
