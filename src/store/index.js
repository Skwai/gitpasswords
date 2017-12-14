import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from '@/store/actions'
import * as getters from '@/store/getters'
import * as mutations from '@/store/mutations'
import initialState from '@/store/initial-state'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state: { ...initialState },
  strict: debug
})
