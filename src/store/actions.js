import Entry from '@/models/Entry'
import * as gh from '../services/gh'

export const login = async ({ commit, state }) => {
  try {
    const { token, username } = await gh.login()
    commit('SET_ACCESS_TOKEN', token)
    commit('SET_USERNAME', username)
  } catch (err) {
    console.error(err)
  }
}

export const getGists = async ({ commit, state }) => {
  const { username, token } = state
  const gists = await gh.getGists({ username, token })
  commit('SET_GISTS', gists)
}

export const createEntry = ({ commit }) => {
  const entry = new Entry({
    title: 'New entry'
  })
  commit('ADD_ENTRY', entry)
  commit('SET_ENTRY_ID', entry.id)
}

export const deleteEntry = ({ commit }, entryID) => {
  commit('REMOVE_ENTRY', entryID)
}

export const createGist = async ({ commit, state }, { filename, secret }) => {
  const { token } = state
  const placeholder = new Entry({
    title: 'Example Entry',
    username: 'Example',
    url: 'http://example.com',
    password: 'test'
  })
  const encryptedData = gh.encryptData([ placeholder ], secret)
  const gist = await gh.createGist({ filename, secret, encryptedData, token })
  commit('SET_FILENAME', filename)
  commit('SET_SECRET', secret)
  commit('ADD_GIST', gist)
  commit('SET_GIST_ID', gist.id)
  commit('SET_ENTRIES', placeholder)
}

export const selectGist = async ({ commit, state }, { gistID, secret, filename }) => {
  const { token } = state
  const data = await gh.getGistData({ filename, gistID, token })
  const entries = gh.decryptData(data, secret)
  commit('SET_FILENAME', filename)
  commit('SET_SECRET', secret)
  commit('SET_GIST_ID', gistID)
  commit('SET_ENTRIES', entries)
}

export const setActiveEntryID = ({ commit, state }, entryID) => {
  commit('SET_ENTRY_ID', entryID)
}

export const updateEntry = ({ commit }, entry) => {
  commit('UPDATE_ENTRY', entry)
}

export const saveEntries = async ({ commit, state }) => {
  const { entries, filename, secret, token, gistID } = state
  const encryptedData = gh.encryptData(entries, secret)
  await gh.saveGistData({ gistID, filename, encryptedData, token })
}
