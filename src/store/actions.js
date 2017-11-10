import * as gh from '../services/gh'

export const login = async ({ commit, state }) => {
  try {
    const { accessToken, username } = await gh.login()
    console.log(username, accessToken)
    commit('SET_ACCESS_TOKEN', accessToken)
    commit('SET_USERNAME', username)
  } catch (err) {
    console.error(err)
  }
}

export const getGists = async ({ commit, state }) => {
  const gists = await gh.getGists(state.accessToken)
  commit('SET_GISTS', gists)
}

export const createGist = async ({ commit, state }) => {
  const gist = await gh.createGist(state.accessToken)
  commit('ADD_GIST', gist)
  commit('SET_GIST_ID', gist.id)
}

export const selectGist = async ({ commit, state }) => {
  const entries = await gh.getGistData(state.gistId, state.accessToken)
  commit('ADD_ENTRIES', entries)
}

/*
export const loadGist = async ({ commit, state }, { gistId, secret }) => {
  commit('SET_GIST', gistId)
  return gh.getGistData(gistId, secret, state.accessToken)
}

export const setActiveEntryId = ({ commit, state }, entryId) => {
  commit('SET_ENTRY_ID', entryId)
}

export const getEntries = async ({ commit, state }, { gistId, secret }) => {
  commit('SET_SECRET', secret)
  commit('SET_ENTRIES', entries)
}

export const setSecret = ({ commit, state }, secret) => {
  commit('SET_SECRET', secret)
}
*/
