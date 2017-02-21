<template lang="html">
  <article class="p2 mx-auto max-width-3 block relative" v-if='active'>
    <p v-for='(block, _blockIndex) in blocks'
      v-bind:class='{ active: blockIndex === _blockIndex }'>
      <span v-for='(token, tokenIndex) in block'
        v-on:click='$store.dispatch("skipTo", token.globalIndex)'
        v-bind:class='{ active: globalIndex === token.globalIndex }'
        v-html='token.text'>
      </span>
    </p>
  </article>
</template>

<script>
export default {
  name: 'display-area',
  computed: {
    blocks () { return this.$store.state.blocks },
    active () { return this.$store.state.active },
    blockIndex () { return this.$store.state.blockIndex },
    globalIndex () { return this.$store.state.globalIndex },
    word () { return this.$store.state.word }
  },
  watch: {
    word (token) {
      const article = document.querySelectorAll('article')[0]
      const spans = document.querySelectorAll('span.active')
      spans.forEach(span => {
        if (!span.innerHTML.includes(' ')) {
          const offset = span.offsetTop + span.parentNode.offsetTop
          // console.log(offset)
          // TODO: throttle calls, animate scroll transition
          article.scrollTop = offset - (article.clientHeight / 2)
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
  article {
    border: 1px solid transparent;
    font-family: sans-serif;
    font-size: 16px;
    height: 400px;
    line-height: 1;
    overflow: auto;
    resize: none;
    width: 100%;
  }

  p {
    line-height: 1;
    margin-top: 0;
    margin-bottom: 14px;
    position: relative;
  }

  p.active::before {
    background: rgba(0, 0, 0, 0.2);
    content: '';
    display: block;
    height: 100%;
    left: -20px;
    position: absolute;
    top: -2px;
    width: 10px;
  }

  span.active { background: rgba(0, 0, 0, 0.1) }
</style>
