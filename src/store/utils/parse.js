import {
  MODIFIERS,
  WRAPS,
  MATCH,
  wordDelayModifier,
  wordOffset,
  wordShouldBeSplit,
  splitWord
} from './'

// NOTE: not in use
// Split sentences using regex by matching ends of sentences.
export const getSentences = text => text
  .split('\n')
  .filter(p => p) // filters out null and undefined
  .reduce((array, sentence) => ([
    ...array,
    ...sentence
      .replace(MATCH.SENTENCE_TAIL, '$1|')
      .split('|')
      .map(s => s.trim())
  ]), [])

// NOTE: not in use
// Find global indices for each start of new sentence.
export const getSentenceIndices = sentences => {
  let globalIndex = 0
  return sentences.reduce((array, sentence, sentenceIndex) => {
    return [
      ...array,
      ...sentence
        .match(MATCH.TOKENS_AND_SPACES)
        .map((token, tokenIndex) => {
          if (!tokenIndex) return globalIndex
          globalIndex++
        })
        .filter(s => s > -1)
    ]
  }, [])
}

// populate information required for parentheses and quotes
const getTokenMeta = wraps => ({
  modifier: wraps ? MODIFIERS.START_CLAUSE : MODIFIERS.END_CLAUSE,
  wraps
})

// check if the word consists of a space or wrap elements
const shouldIgnoreToken = token => MATCH.WRAPS_AND_SPACES.includes(token)

/**
 * parseText - separate text into blocks of paragraphs each containing tokens
 * with instructions on how they should be displayed
 *
 * @param  {String} text    any old string
 * @return {Object}         array of arrays of tokens
 */
export const parseText = body => {
  let globalIndex = 0
  return body
    .split('\n')
    .filter(p => p) // filters out null and undefined
    .reduce((array, block) => {
      let modifier = 1
      let wraps

      const getToken = text => {
        const ignore = shouldIgnoreToken(text)
        const offset = wordOffset(text)
        if (text.length < 3 && ignore) {
          return { text, ignore }
        } else {
          return { text, modifier, wraps, offset }
        }
      }

      return [
        ...array,
        block.match(MATCH.TOKENS_AND_SPACES)
          .map((token, tokenIndex) => {
            // TODO: filter out urls, citations, super/sub script references, ...
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
              case WRAPS.STANDARD_QUOTE.RIGHT: // STANDARD_QUOTE (") is the same on both left and right
                if (!wraps) {
                  ({ modifier, wraps } = getTokenMeta(WRAPS.STANDARD_QUOTE))
                } else {
                  ({ modifier, wraps } = getTokenMeta())
                }
                break
              default:
                // adjust modifier based on contents and position of the token
                if (token.match(MATCH.DASHES)) modifier = MODIFIERS.SHORT_SPACE
                else if (token.match(MATCH.SENTENCE_END)) modifier = MODIFIERS.END_SENTENCE
                else if (token.match(MATCH.CLAUSE_END)) modifier = MODIFIERS.END_CLAUSE
                else if (token.match(MATCH.NEWLINE)) modifier = MODIFIERS.END_PARAGRAPH
                else modifier = MODIFIERS.NORMAL

                modifier = modifier + wordDelayModifier(token) + (!tokenIndex ? 0.4 : 0)

                if (wordShouldBeSplit(token)) {
                  return splitWord(token).map(getToken)
                }
            }
            return getToken(token)
          })
          // flatten any nested arrays created by splitting long words
          .reduce((array, token) => {
            if (({}).toString.call(token) === '[object Array]') {
              return [
                ...array,
                ...token
              ]
            }
            return [
              ...array,
              token
            ]
          }, [])
      ]
    }, [])
    .map((block, blockIndex) => { // insert indices for tracking and displaying text
      let tokenIndexOffset = 0
      let nextTokenStartsSentence = false
      return block
        .map((token, tokenIndex) => {
          if (token.ignore) {
            tokenIndexOffset = tokenIndexOffset + 1
          } else {
            token = {
              ...token,
              // only tokens with words receive a tokenIndex
              tokenIndex: tokenIndex - tokenIndexOffset
            }
          }
          token = {
            // each token receives a blockIndex and globalIndex
            ...token,
            blockIndex,
            globalIndex: globalIndex++
          }
          if (token.text.match(MATCH.SENTENCE_END) || token.text.match(MATCH.NEWLINE)) {
            token = {
              ...token,
              end: true
            }
          }
          return token
        })
        .map(token => {
          if (token.tokenIndex === 0) nextTokenStartsSentence = true
          if (nextTokenStartsSentence && token.hasOwnProperty('tokenIndex')) {
            token = {
              ...token,
              start: true
            }
            nextTokenStartsSentence = false
          }
          if (token.end) nextTokenStartsSentence = true
          return token
        })
    })
}
