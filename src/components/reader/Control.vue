<template lang="html">
  <section class="flex">
    <div class='flex items-center justify-center'>
      <button class="small" v-on:click='$store.dispatch(`skip`, `PREV_SENTENCE`)'
        title="keyboard: arrow left">
        <i class="material-icons">chevron_left</i>
      </button>
      <div class='flex flex-column items-center'>
        <button v-if='!playing' v-on:click='active ? $store.dispatch(`play`) : $store.dispatch(`read`, text)'
          title="keyboard: space bar">
          <i class="material-icons">play_arrow</i>
        </button>
        <button v-if='playing' v-on:click='$store.dispatch(`pause`)'
          title="keyboard: space bar">
          <i class="material-icons">pause</i>
        </button>
      </div>
      <button class="small" v-on:click='$store.dispatch(`skip`, `NEXT_SENTENCE`)'
        title="keyboard: arrow right">
        <i class="material-icons">chevron_right</i>
      </button>
    </div>
    <slider class="mx3"></slider>
    <div class="flex flex-column items-center justify-center">
      <button class="small" v-on:click='$store.dispatch(`speed`, `UP`)'
        title="keyboard: arrow up">
        <i class="material-icons">expand_less</i>
      </button>
      <span style="padding: 0.2rem 0; font-family: 'Ubuntu Mono'">{{ wpm }} <span class="muted">wpm</span></span>
      <button class="small" v-on:click='$store.dispatch(`speed`, `DOWN`)'
        title="keyboard: arrow down">
        <i class="material-icons">expand_more</i>
      </button>
    </div>
  </section>
</template>

<script>
import Slider from './Slider'

export default {
  name: 'control',
  components: {
    Slider
  },
  props: ['text'],
  computed: {
    active () { return this.$store.state.active },
    playing () { return this.$store.state.playing },
    wpm () { return this.$store.state.wpm }
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
