<template lang="html">
  <div class='player flex mx-auto bg-darken-1'>
    <div class='flex justify-center items-center bg-darken-1' style="width: 30px">
      <span v-if='word.wraps'>{{ word.wraps.LEFT }}</span>
    </div>
    <div class='word flex flex-auto items-center relative'
      v-bind:class='`offset-${word.offset}`'>
      <span class='h1 m0'>
        {{ word.text }}
      </span>
      <small class='center absolute right-0 bottom-0'>{{ wpm }}</small>
    </div>
    <div class='flex justify-center items-center bg-darken-1' style="width: 30px">
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
  .player {
    width: 300px;
    min-height: 80px;
    font-size: 36px;
  }

  .word small {
    line-height: 1;
    padding: .1rem;
    font-size: 14px;
  }

  .word::before,
  .word::after {
    background: rgba(0, 0, 0, 0.1);
    content: '';
    display: block;
    height: 8px;
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
