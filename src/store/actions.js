import { wordDelay } from './utils'

let playing
function pausePlaying () { playing && clearTimeout(playing) }

export default {
  read ({ commit, dispatch }, text) {
    pausePlaying()
    commit('INITIALIZE_STATE', text)
    dispatch('play')
  },
  play ({ commit, dispatch, state }) {
    commit('SET_PLAYING', true)
    if (state.blocks.length === state.blockIndex) { return dispatch('stop') }
    state.blocks[state.blockIndex]
      .reduce((promise, token, tokenIndex) => {
        if (
          token.ignore ||
          // when skipping to a new word, DISPLAY_WORD updates the globalIndex
          // this reduce call needs to catch up to the globalIndex
          token.globalIndex < state.globalIndex
        ) {
          return promise.then(delay => Promise.resolve(delay))
        }
        return promise.then(delay => (new Promise((resolve, reject) => {
          if (!state.playing) {
            reject()
          } else {
            playing = setTimeout(() => {
              commit('DISPLAY_WORD', token)
              resolve(wordDelay(token.modifier, state.wpm))
            }, delay)
          }
        })))
      }, Promise.resolve())
      .then(delay => {
        setTimeout(() => {
          commit('SET_BLOCK_INDEX', state.blockIndex + 1)
          dispatch('play')
        }, delay)
      })
      .catch(() => {
        dispatch('pause')
      })
  },
  pause ({ commit }) {
    commit('SET_PLAYING', false)
  },
  stop ({ commit }) {
    pausePlaying()
    commit('RESET_STATE')
  },
  speed ({ commit }, direction) {
    commit('ADJUST_WPM', direction)
  },
  skipTo ({ commit, dispatch, state }, globalIndex) {
    if (!state.active) return
    pausePlaying()
    state.blocks.reduce((found, block, blockIndex) => {
      if (found) {
        commit('SET_BLOCK_INDEX', blockIndex - 1)
        commit('DISPLAY_WORD', found)
      }
      let takeNext
      return block.filter((token, tokenIndex) => {
        if (takeNext) return !(takeNext = false)
        if (token.globalIndex === globalIndex) {
          if (token.ignore) {
            takeNext = true
          } else {
            return true
          }
        }
        return false
      })[0]
    }, false)
    if (state.playing) {
      playing = setTimeout(() =>
        dispatch('play'),
        wordDelay(state.word.modifier, state.wpm)
      )
    }
  },
  skip ({ commit, dispatch, state }, direction) {
    if (!state.active) return
    pausePlaying()
    switch (direction) {
      case 'NEXT_PARAGRAPH':
        // if we're on the last block, go to the last word.
        if (state.blockIndex === state.blocks.length - 1) {
          commit('DISPLAY_WORD', state.blocks[state.blockIndex][state.blocks[state.blockIndex].length - 1])
        } else {
          commit('SET_BLOCK_INDEX', state.blockIndex + 1)
          commit('DISPLAY_WORD', state.blocks[state.blockIndex].find(token => token.tokenIndex === 0))
        }
        break
      case 'PREV_PARAGRAPH':
        // if near the start of block, go to previous block
        const threshold = 5 // TODO: update threshold to account for reading speed
        if (state.tokenIndex < threshold) {
          commit('SET_BLOCK_INDEX', state.blockIndex > 0 && state.blockIndex - 1 || 0)
        }
        commit('DISPLAY_WORD', state.blocks[state.blockIndex].find(token => token.tokenIndex === 0))
        break
      case 'NEXT_SENTENCE':
        const nextToken = state.blocks[state.blockIndex].filter(token => {
          return token.globalIndex > state.globalIndex && token.start
        })[0]
        if (nextToken) {
          commit('DISPLAY_WORD', state.blocks[state.blockIndex].find(token => token.tokenIndex === nextToken.tokenIndex))
        } else {
          if (state.blockIndex === state.blocks.length - 1) {
            commit('DISPLAY_WORD', state.blocks[state.blockIndex][state.blocks[state.blockIndex].length - 1])
          } else {
            commit('SET_BLOCK_INDEX', state.blockIndex + 1)
            commit('DISPLAY_WORD', state.blocks[state.blockIndex].find(token => token.tokenIndex === 0))
          }
        }
        break
      case 'PREV_SENTENCE':
        const currentToken = state.blocks[state.blockIndex].find(token => token.globalIndex === state.globalIndex)
        let lastTokens = state.blocks[state.blockIndex].filter(token => token.globalIndex < state.globalIndex && token.start)
        if (lastTokens.length) {
          const threshold = 10 // TODO: update threshold to account for reading speed
          if ((currentToken.globalIndex - lastTokens[lastTokens.length - 1].globalIndex) < threshold) {
            lastTokens = lastTokens.slice(0, -1)
          }
        }
        if (lastTokens.length) {
          commit('DISPLAY_WORD', state.blocks[state.blockIndex].find(token => token.tokenIndex === lastTokens[lastTokens.length - 1].tokenIndex))
        } else {
          if (state.blockIndex > 0) {
            lastTokens = state.blocks[state.blockIndex - 1].filter(token => token.start)
            commit('SET_BLOCK_INDEX', state.blockIndex - 1)
          } else {
            lastTokens = [state.blocks[state.blockIndex].find(token => token.start)]
          }
          commit('DISPLAY_WORD', lastTokens[lastTokens.length - 1])
        }
        break
    }

    if (state.playing) {
      playing = setTimeout(() =>
        dispatch('play'),
        wordDelay(state.word.modifier, state.wpm)
      )
    }
  }
}
