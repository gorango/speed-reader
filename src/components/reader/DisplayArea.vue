<template lang="html">
  <article v-if='active'>
    <p v-for='(block, _blockIndex) in blocks'
      v-bind:class='{ active: blockIndex === _blockIndex }'>
      <span v-for='(token, tokenIndex) in block'
        v-bind:class='{ active: globalIndex === token.globalIndex }'
        v-html='token.word'>
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
          // TODO: throttle calls, animate scroll transition
          article.scrollTop = offset - (article.clientHeight / 2)
        }
      })
    }
  }
}
</script>

<style lang="css">
  article {
    border: 1px solid transparent;
    display: block;
    font-size: 14px;
    font-family: 'Ubuntu Mono';
    height: 400px;
    line-height: 1;
    margin: 0 auto;
    max-width: 700px;
    overflow: auto;
    padding: 1rem;
    position: relative;
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

  span.active { background: rgba(0, 0, 0, 0.1); }
</style>
