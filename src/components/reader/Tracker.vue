<template lang="html">
  <div>
    <progress
      class="progress"
      style="height: .25rem"
      v-bind:value='progress.value'
      v-bind:max='progress.max'>
    </progress>
  </div>
</template>

<script>
export default {
  name: 'tracker',
  computed: {
    progress () {
      return {
        value: this.$store.state.globalIndex,
        max: this.$store.state.blocks
          .reduce((array, block) => ([...array, ...block]), []).length
      }
    }
  },
  methods: {
    update (e) {
      const value = Number.parseInt(e.target.value)
      this.$store.dispatch('skipTo', value)
    }
  }
}
</script>
