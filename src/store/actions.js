import Entry from '@/models/Entry'
import * as gh from '../services/gh'

const en = new Entry()
console.log(en.id)

export const login = async ({ commit, state }) => {
  try {
    const { accessToken, username } = await gh.login()
    commit('SET_ACCESS_TOKEN', accessToken)
    commit('SET_USERNAME', username)
  } catch (err) {
    console.error(err)
  }
}

export const getGists = async ({ commit, state }) => {
  const gists = await gh.getGists(state.username, state.accessToken)
  commit('SET_GISTS', gists)
}

export const createGist = async ({ commit, state }, { filename, secret }) => {
  const placeholder = Object.assign(new Entry(), {
    title: 'Example Entry',
    username: 'Example',
    url: 'http://example.com'
  })
  const encryptedData = gh.encryptData([ placeholder ], secret)
  const gist = await gh.createGist(filename, secret, encryptedData, state.accessToken)
  commit('SET_SECRET', secret)
  commit('ADD_GIST', gist)
  commit('SET_GIST_ID', gist.id)
  commit('SET_ENTRIES', placeholder)
}

export const selectGist = async ({ commit, state }, { gistID, secret }) => {
  const data = await gh.getGistData(gistID, state.accessToken)
  const entries = gh.decryptData(data, secret)
  commit('SET_GIST_ID', gistID)
  commit('SET_ENTRIES', entries)
}

export const setActiveEntryID = ({ commit, state }, entryID) => {
  commit('SET_ENTRY_ID', entryID)
}
