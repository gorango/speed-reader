<template lang="pug">
  .flex
    input.input-range(
    type='range',
    style='width: 100%',
    min='0',
    v-bind:value='progress.value',
    v-bind:max='progress.max',
    v-on:input.prevent='update',
    v-on:keydown.prevent='')
</template>

<script>
  export default {
    props: [
      'moduleName'
    ],
    computed: {
      progress () {
        return {
          value: this.$store.state[this.moduleName] && this.$store.state[this.moduleName].globalIndex,
          max: this.$store.state[this.moduleName] && this.$store.state[this.moduleName].blocks
            .reduce((array, block) => ([...array, ...block]), []).length
        }
      }
    },
    methods: {
      update (e) {
        const value = Number.parseInt(e.target.value)
        this.$store.dispatch(`${this.moduleName}/skipTo`, value)
      }
    }
  }
</script>
