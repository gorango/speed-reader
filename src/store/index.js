import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const logger = createLogger({
  collapsed: false, // auto-expand logged mutations
  transformer (state) {
    // transform the state before logging it.
    // for example return only a specific sub-tree
    return (
      state['reader-1'] && state['reader-1'].word ||
      state['reader-2'] && state['reader-2'].word
    )
  },
  mutationTransformer (mutation) {
    // mutations are logged in the format of { type, payload }
    // we can format it any way we want.
    return mutation.type
  }
})

const store = new Vuex.Store({
  state: {
    hello: 'world'
  },
  plugins: [logger]
})

export default store
