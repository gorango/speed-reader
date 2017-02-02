import { parseText } from './utils'

export const initialState = {
  active: false,
  playing: false,
  blocks: [],
  tokenIndex: 0,
  blockIndex: 0,
  globalIndex: 0,
  word: {}
}

export default {
  INITIALIZE_STATE: (state, text) => {
    Object.keys(initialState).map(key => { state[key] = initialState[key] })
    state.active = true
    state.blocks = parseText(text)
  },
  RESET_STATE: state => {
    Object.keys(initialState).map(key => { state[key] = initialState[key] })
  },
  DISPLAY_WORD: (state, token) => {
    state.word = token
    state.tokenIndex = token.tokenIndex
    state.globalIndex = token.globalIndex
  },
  SET_PLAYING: (state, playing) => {
    state.playing = !!playing
  },
  PAUSE: state => {
    state.playing = false
  },
  SET_TOKEN_INDEX: (state, index) => {
    state.tokenIndex = index
  },
  SET_BLOCK_INDEX: (state, index) => {
    state.blockIndex = index
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
