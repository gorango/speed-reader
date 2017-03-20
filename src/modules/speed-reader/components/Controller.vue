<template lang="pug">
  section.flex
    .flex.items-center.justify-center
      button.small(
      v-on:click='$store.dispatch(`${moduleName}/skip`, `PREV_SENTENCE`)',
      title='keyboard: arrow left')
        i.material-icons chevron_left
      .flex.flex-column.items-center
        button(
        v-if='!playing', v-on:click='active ? $store.dispatch(`${moduleName}/play`) : $store.dispatch(`${moduleName}/read`, text)',
        title='keyboard: space bar')
          i.material-icons play_arrow
        button(
        v-if='playing', v-on:click='$store.dispatch(`${moduleName}/pause`)',
        title='keyboard: space bar')
          i.material-icons pause
      button.small(
      v-on:click='$store.dispatch(`${moduleName}/skip`, `NEXT_SENTENCE`)',
      title='keyboard: arrow right')
        i.material-icons chevron_right
    slider.mx3.flex-auto(:moduleName='moduleName')
    .flex.items-center.justify-center
      button.small(
      v-on:click='$store.dispatch(`${moduleName}/speed`, `DOWN`)',
      title='keyboard: arrow down')
        span(style='font-size: 20px; margin-top: -1px;') -
      span.px1(style="font-family: 'Ubuntu Mono'; white-space: nowrap;")
        | {{ wpm }}
      button.small(
      v-on:click='$store.dispatch(`${moduleName}/speed`, `UP`)',
      title='keyboard: arrow up')
        span(style='font-size: 20px;') +
</template>

<script>
import Slider from './Slider'

export default {
  components: {
    Slider
  },
  props: ['text', 'moduleName'],
  computed: {
    active () { return this.$store.state[this.moduleName] && this.$store.state[this.moduleName].active },
    playing () { return this.$store.state[this.moduleName] && this.$store.state[this.moduleName].playing },
    wpm () { return this.$store.state[this.moduleName] && this.$store.state[this.moduleName].wpm }
  }
}
</script>

<style scoped>
  button {
    align-items: center;
    background-color: rgba(0, 0, 0, 0.15);
    border: 1px solid transparent;
    border-radius: 50%;
    color: black;
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
