import Vue from 'vue'
import Vuex from 'vuex'
import { parseText } from './utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    word: {},
    instructions: [],
    wpm: 500
  },
  actions: {
    read ({ commit, dispatch, state }, text) {
      commit('SET_INSTRUCTIONS', text)
      dispatch('play')
    },
    play ({ commit, dispatch, state }) {
      state.instructions.reduce((promise, token) => {
        const getDelay = (modifier) => ((1000 * 60 / state.wpm) * modifier)

        return promise.then(delay => {
          return new Promise(resolve => {
            setTimeout(() => {
              commit('DISPLAY_WORD', token)
              resolve(getDelay(token.modifier))
            }, delay)
          })
        })
      }, Promise.resolve())
    }
  },
  mutations: {
    SET_INSTRUCTIONS: (state, text) => {
      state.instructions = parseText(text)
    },
    DISPLAY_WORD: (state, token) => {
      state.word = token
    },
    UPDATE_WPM: (state, wpm) => {
      state.wpm = wpm
    },
    ADJUST_WPM: (state, direction) => {
      switch (direction) {
        case 'UP':
          state.wpm = state.wpm + 10
          break
        case 'DOWN':
          state.wpm = state.wpm - 10
          break
      }
    }
  }
})

export default store
