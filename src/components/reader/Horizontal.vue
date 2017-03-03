<template lang="html">
  <article class="hor p2 mx-auto max-width-2 block relative">
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
import { scrollTop, scrollLeft } from '../utils'

export default {
  name: 'horizontal',
  computed: {
    blocks () { return this.$store.state.blocks },
    active () { return this.$store.state.active },
    blockIndex () { return this.$store.state.blockIndex },
    globalIndex () { return this.$store.state.globalIndex },
    word () { return this.$store.state.word }
  },
  watch: {
    word (_, token) {
      const article = document.querySelectorAll('article.hor')[0]
      // HACK: await dom digest
      setTimeout(function () {
        const span = document.querySelectorAll('article.hor span.active')[0]
        if (span && span.innerHTML !== ' ') {
          // console.log(span)
          const offsetLeft = span.offsetLeft + span.parentNode.offsetLeft + (span.offsetWidth / 2)
          const offsetTop = span.offsetTop + span.parentNode.offsetTop
          scrollLeft(article, offsetLeft - (article.clientWidth / 2), 10)
          scrollTop(article, offsetTop - (article.clientHeight / 4), 100)
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
  article {
    border: 1px solid transparent;
    height: 50px;
    overflow: hidden;
    position: relative;
    white-space: nowrap;
    width: 100%;
  }

  p {
    font-size: 24px;
    line-height: 1.5;
    margin-top: 0;
    margin-bottom: 14px;
    position: relative;
  }

  span.active { background: rgba(0, 0, 0, 0.05) }
</style>
