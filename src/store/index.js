import Vue from 'vue'
import Vuex from 'vuex'
import { parseText, wordDelay } from './utils'

Vue.use(Vuex)

let playing
const store = new Vuex.Store({
  state: {
    instructions: [],
    reading: false,
    tokenIndex: 0,
    blockIndex: 0,
    progress: {
      value: 0,
      max: 0
    },
    word: {},
    wpm: 500
  },
  actions: {
    read ({ commit, dispatch }, text) {
      commit('INITIALIZE_STATE', text)
      dispatch('play')
    },
    play ({ commit, dispatch, state }) {
      if (!state.reading) commit('START_PLAYING')

      // if (state.instructions.length === state.blockIndex) return

      const paragraph = state.instructions[state.blockIndex]
      paragraph.reduce((promise, token, index) => {
        if (index < state.tokenIndex) return Promise.resolve()

        return promise.then(delay => (new Promise((resolve, reject) => {
          if (!state.reading) {
            reject() // pause reading
          } else {
            playing = setTimeout(() => {
              commit('SET_TOKEN_INDEX', index)
              commit('DISPLAY_WORD', token)
              resolve(wordDelay(token.modifier, state.wpm))
            }, delay)
          }
        })))
      }, Promise.resolve())
      .then(delay => {
        if (state.blockIndex < state.instructions.length - 1) {
          setTimeout(() => {
            commit('SET_TOKEN_INDEX', 0)
            commit('SET_BLOCK_INDEX', state.blockIndex + 1)
            dispatch('play')
          }, delay)
        } else {
          // commit('STOP_PLAYING')
        }
      })
      .catch(() => {
        commit('STOP_PLAYING')
      })
    },
    pause ({ commit }) {
      commit('STOP_PLAYING')
    },
    stop ({ commit }) {
      playing && clearTimeout(playing)
      commit('STOP_PLAYING')
    },
    speed ({ commit }, direction) {
      commit('ADJUST_WPM', direction)
    },
    skipTo ({ commit, state }, index) {
      let progressIndex = 0
      const blocks = state.instructions
      blocks.map((block, blockIndex) => {
        block.map((token, tokenIndex) => {
          if (progressIndex === index) {
            commit('SET_BLOCK_INDEX', blockIndex)
            commit('SET_TOKEN_INDEX', tokenIndex)
          }
          progressIndex = progressIndex + 1
        })
      })
    },
    skip ({ commit, dispatch, state }, direction) {
      playing && clearTimeout(playing)

      switch (direction) {
        case 'NEXT':
          // if we're on the last block, go to the last word.
          if (state.blockIndex === state.instructions.length - 1) {
            commit('SET_TOKEN_INDEX', state.instructions[state.blockIndex].length - 1)
          } else {
            commit('SET_BLOCK_INDEX', state.blockIndex + 1)
            commit('SET_TOKEN_INDEX', 0)
          }
          break
        case 'PREV':
          // if near the start of block, go to previous block
          if (state.tokenIndex < 5) {
            commit(
              'SET_BLOCK_INDEX',
              state.blockIndex > 0 && state.blockIndex - 1 || 0
            )
          }
          commit('SET_TOKEN_INDEX', 0)
          break
        default:
          const index = Number.parseInt(direction)
          if (Number.isInteger(index)) {
            dispatch('skipTo', index)
          }
      }

      commit('DISPLAY_WORD', state.instructions[state.blockIndex][state.tokenIndex])

      // // BUG: consecutive calls cause wonkiness due to timeout
      if (state.reading && state.progress.value < state.progress.max) {
        playing = setTimeout(() => dispatch('play'), wordDelay(state.word.modifier, state.wpm))
      }
    }
  },
  mutations: {
    INITIALIZE_STATE: (state, text) => {
      playing && clearTimeout(playing)
      state.progress = { value: 0, max: 0 }
      if (state.instructions.length - 1 === state.blockIndex) {
        state.blockIndex = 0
        state.tokenIndex = 0
      }
      state.instructions = parseText(text)
    },
    SET_BLOCK_INDEX: (state, index) => {
      state.blockIndex = index
    },
    SET_TOKEN_INDEX: (state, index) => {
      state.tokenIndex = index
    },
    START_PLAYING: (state) => {
      state.reading = true
    },
    STOP_PLAYING: (state) => {
      state.reading = false
    },
    DISPLAY_WORD: (state, token) => {
      state.word = token
      // Reset progress on every display cycle to ensure correct position
      state.progress = {
        max: state.instructions.reduce((total, block) => total + block.length, 0),
        value: state.instructions.reduce((total, block, blockIndex) => {
          if (blockIndex > state.blockIndex) {
            return total
          } else {
            if (blockIndex < state.blockIndex) {
              return total + block.length
            } else {
              return total + state.tokenIndex
            }
          }
        }, 1)
      }
    },
    SET_WPM: (state, wpm) => {
      state.wpm = wpm
    },
    ADJUST_WPM: (state, direction) => {
      switch (direction) {
        case 'UP':
          state.wpm = state.wpm + 25
          break
        case 'DOWN':
          state.wpm = state.wpm - 25
          break
      }
    }
  }
})

export default store
