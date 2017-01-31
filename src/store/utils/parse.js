import {
  MODIFIERS,
  WRAPS,
  MATCH,
  wordDelayModifier,
  wordOffset,
  wordShouldBeSplit,
  splitWord
} from './'

export const getSentences = text => text
  .replace(MATCH.SENTENCE_TAIL, '$1|').split('|').map(s => s.trim())
  .reduce((arr, sentence) => [...arr, sentence.match(MATCH.TOKENS)], [])

const getTokenMeta = WRAP => ({
  modifier: WRAP ? MODIFIERS.START_CLAUSE : MODIFIERS.END_CLAUSE,
  wraps: WRAP
})

export const parseText = text => {
  const paragraphs = text.split('\n').filter(p => p)

  /**
   * returns an array of separated words, punctuation, parens, quotes, ...
   */
  return paragraphs.reduce((array, paragraph) => {
    const getToken = word => ({ word, modifier, wraps, offset: `offset-${wordOffset(word)}` })
    let result = []
    let modifier = 1
    let wraps
    paragraph.match(MATCH.TOKENS)
      .map((token, index) => {
        /**
         * what it do:
         * - register surrounding brackets, quotes, etc TODO: handle unclosed wraps
         * - apply timing transformations based on word len
         * - apply word-split transformations based on word len
         * - TODO: filter out urls, citations, super/sub script references, ...
         */
        switch (token) {
          case WRAPS.DOUBLE_QUOTE.LEFT:
            ({ modifier, wraps } = getTokenMeta(WRAPS.DOUBLE_QUOTE))
            break
          case WRAPS.DOUBLE_QUOTE.RIGHT:
            ({ modifier, wraps } = getTokenMeta())
            break
          case WRAPS.GUILLEMOT.LEFT:
            ({ modifier, wraps } = getTokenMeta(WRAPS.GUILLEMOT))
            break
          case WRAPS.GUILLEMOT.RIGHT:
            ({ modifier, wraps } = getTokenMeta())
            break
          case WRAPS.PARENS.LEFT:
            ({ modifier, wraps } = getTokenMeta(WRAPS.PARENS))
            break
          case WRAPS.PARENS.RIGHT:
            ({ modifier, wraps } = getTokenMeta())
            break
          case WRAPS.STANDARD_QUOTE.LEFT:
          case WRAPS.STANDARD_QUOTE.RIGHT:
            /**
             * STANDARD_QUOTE (") is the same on both left and right
             * so check if wraps has been created already
             * NOTE: could also check more precicely with:
             *   if (wraps.left === WRAPS.STANDARD_QUOTE.LEFT)
             */
            if (!wraps) {
              ({ modifier, wraps } = getTokenMeta(WRAPS.STANDARD_QUOTE))
            } else {
              ({ modifier, wraps } = getTokenMeta())
            }
            break
          default:
            /**
             * adjust modifier based on contents and position of the token
             * NOTE: only the default case returns a token
             */
            if (token.match(MATCH.DASHES)) modifier = MODIFIERS.SHORT_SPACE
            else if (token.match(MATCH.SENTENCE_END)) modifier = MODIFIERS.END_SENTENCE
            else if (token.match(MATCH.CLAUSE_END)) modifier = MODIFIERS.END_CLAUSE
            else if (token.match(MATCH.NEWLINE)) modifier = MODIFIERS.END_PARAGRAPH
            else modifier = MODIFIERS.NORMAL

            modifier = modifier + wordDelayModifier(token) + (!index ? 0.4 : 0)

            if (wordShouldBeSplit(token)) {
              return splitWord(token).map(getToken)
            }

            return getToken(token)
        }
      })
      .filter(token => token) // filter out null objects from array (wraps, parens, ...)
      .forEach(token => { // iterate again to flatten any nested arrays caused by split words
        if (({}).toString.call(token) === '[object Array]') {
          result = [
            ...result,
            ...token
          ]
        } else {
          result = [
            ...result,
            token
          ]
        }
      })

    return [
      ...array,
      result
    ]
  }, [])
}
