import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from '@/store/actions'
import * as getters from '@/store/getters'
import mutations from '@/store/mutations'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state: {
    username: null,
    gists: [],
    gistId: null
  },
  strict: debug
})
