<template lang="html">
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
</template>

<script>
export default {
  name: 'control',
  computed: {
    playing () { return this.$store.state.playing }
  }
}
</script>

<style lang="css">
  button {
    align-items: center;
    border: none;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    height: 50px;
    margin: .2rem;
    outline: none;
    width: 50px;
  }

  button.small {
    width: 30px;
    height: 30px;
  }

  button.small i {
    font-size: 1rem;
  }
</style>
