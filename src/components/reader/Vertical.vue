<template lang="html">
  <article class="ver p2 mx-auto max-width-2 block relative">
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
import { scrollTop } from '../utils'

export default {
  name: 'vertical',
  computed: {
    blocks () { return this.$store.state.blocks },
    active () { return this.$store.state.active },
    blockIndex () { return this.$store.state.blockIndex },
    globalIndex () { return this.$store.state.globalIndex },
    word () { return this.$store.state.word }
  },
  watch: {
    word (_, token) {
      const article = document.querySelectorAll('article.ver')[0]
      // HACK: await dom digest
      setTimeout(function () {
        const span = document.querySelectorAll('article.ver span.active')[0]
        if (span && span.innerHTML !== ' ') {
          const offset = span.offsetTop + span.parentNode.offsetTop
          scrollTop(article, offset - (article.clientHeight / 2), 100)
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
  article {
    border: 1px solid transparent;
    height: 300px;
    overflow: auto;
    width: 100%;
  }

  p {
    font-size: 20px;
    line-height: 1.5;
    margin-top: 0;
    margin-bottom: 14px;
    position: relative;
  }

  span.active { background: rgba(0, 0, 0, 0.05) }

  span.active::before {
    background: rgba(0, 0, 0, 0.15);
    content: '';
    display: block;
    height: 1rem;
    left: -20px;
    position: absolute;
    width: 10px;
    transform: translateY(-135%);
  }
</style>
