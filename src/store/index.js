import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations, { initialState } from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ...initialState,
    wpm: 500 // TODO: take from store
  },
  actions,
  mutations
})

export default store
