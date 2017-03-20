import actions from './actions'
import mutations, { initialState } from './mutations'

const store = {
  namespaced: true,
  state: {
    ...initialState,
    wpm: 425 // TODO: take from store (local/db)
  },
  actions: Object.freeze(actions),
  mutations: Object.freeze(mutations)
}

export default store
