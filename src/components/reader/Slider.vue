<template lang="html">
  <div class="flex">
    <input
    type='range'
    class="input-range"
    style="width: 100%"
    min='0'
    v-bind:value='progress.value'
    v-bind:max='progress.max'
    v-on:input.prevent='update'
    v-on:keydown.prevent=''
    />
  </div>
</template>

<script>
export default {
  name: 'slider',
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
