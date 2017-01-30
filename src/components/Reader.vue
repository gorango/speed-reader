<template lang="html">
  <section>
    <div class="player">
      <div class="left">
        <span class="" v-if="word.wraps">{{ word.wraps.LEFT }}</span>
      </div>
      <div class="word">
        <span class="h1 m0">
          {{ word.word }}
        </span>
      </div>
      <div class="right">
        <span class="" v-if="word.wraps">{{ word.wraps.RIGHT }}</span>
      </div>
    </div>
    <div class="progress"></div>
  </section>
</template>

<script>
export default {
  name: 'reader',
  computed: {
    word () {
      return this.$store.state.word
    }
  }
}
</script>

<style lang="css" scoped>

.player {
  width: 300px;
  margin: 3rem auto;
}

.player {
  background: rgba(0, 0, 0, 0.1);
  display: flex
}

.left, .right {
  background: rgba(0, 0, 0, 0.1);
  width: 30px
}

.left, .right, .word {
  display: flex;
  font-size: 24px;
  font-family: monospace;
  font-weight: bold;
  justify-content: center;
  align-items: center;
}

.word {
  height: 60px;
  flex: auto;
}
</style>
