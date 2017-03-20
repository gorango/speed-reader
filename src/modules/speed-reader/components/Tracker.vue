<template lang="pug">
div
  progress.progress(
  style='height: .25rem',
  v-bind:value='progress.value',
  v-bind:max='progress.max')
</template>

<script>
export default {
  props: ['moduleName'],
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
