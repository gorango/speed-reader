import Vue from 'vue'
import Vuex from 'vuex'
import { parseText, getDelay } from './utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    instructions: [],
    reading: false,
    index: 0,
    word: {},
    wpm: 500
  },
  actions: {
    read ({ commit, dispatch }, text) {
      commit('SET_INSTRUCTIONS', text)
      dispatch('play')
    },
    play ({ commit, dispatch, state }) {
      commit('START_PLAYING')
      state.instructions.reduce((promise, token, index) => {
        if (index < state.index) { return Promise.resolve() }

        return promise.then(delay => (new Promise((resolve, reject) => {
          if (state.reading) {
            setTimeout(() => {
              commit('DISPLAY_WORD', token)
              commit('SET_INDEX', index)
              resolve(getDelay(token.modifier, state.wpm))
            }, delay)
          } else {
            /**
             * Pause reading
             */
            reject(index)
          }
        })))
      }, Promise.resolve())
      .then(() => {
        commit('SET_INDEX', 0)
        commit('STOP_PLAYING')
      })
      .catch(index => {
        commit('SET_INDEX', index)
        commit('STOP_PLAYING')
      })
    },
    pause ({ commit }) {
      commit('STOP_PLAYING')
    },
    skip ({ commit }, amount) {
      commit('SKIP', amount)
    }
  },
  mutations: {
    SET_INSTRUCTIONS: (state, text) => {
      state.instructions = parseText(text)
    },
    SET_INDEX: (state, index) => {
      state.index = index
    },
    START_PLAYING: (state) => {
      state.reading = true
    },
    STOP_PLAYING: (state) => {
      state.reading = false
    },
    SKIP: (state) => {
      state.index = 0
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
