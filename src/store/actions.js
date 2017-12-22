import Entry from '@/models/Entry'
import * as gh from '@/services/gh'
import { encryptData, decryptData } from '@/services/encrypt'
import {
  ACCESS_TOKEN_STORAGE_KEY,
  INACTIVE_LOGOUT_DELAY
} from '@/config'

const storeToken = (token) => localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token)
const removeToken = () => localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY)

export const login = async ({ commit, state }) => {
  const { token, username } = await gh.login()
  storeToken(token)
  commit('SET_ACCESS_TOKEN', token)
  commit('SET_USERNAME', username)
}

export const logout = ({ commit }) => {
  removeToken()
  commit('RESET')
}

export const getUserFromToken = async ({ commit, state }, token) => {
  const { login: username } = await gh.getUser({ token })
  commit('SET_USERNAME', username)
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
  filename = [filename, gh.FILE_EXTENSION].join('.')
  console.log(filename)
  const { token, username } = state
  const placeholder = new Entry({
    title: 'Example Entry',
    username: 'Example',
    url: 'http://example.com',
    password: 'test'
  })
  const encryptedData = encryptData([ placeholder ], secret, username)
  const gist = await gh.createGist({ filename, secret, encryptedData, token })
  commit('SET_FILENAME', filename)
  commit('SET_SECRET', secret)
  commit('ADD_GIST', gist)
  commit('SET_GIST_ID', gist.id)
  commit('SET_ENTRIES', placeholder)
}

export const selectGist = async ({ commit, state }, { gistID, secret, filename }) => {
  const { token, username } = state
  const data = await gh.getGistData({ filename, gistID, token })
  const entries = decryptData(data, secret, username)
  commit('SET_FILENAME', filename)
  commit('SET_SECRET', secret)
  commit('SET_GIST_ID', gistID)
  commit('SET_ENTRIES', entries)
}

export const setActiveEntryID = ({ commit, state }, entryID) => {
  commit('SET_ENTRY_ID', entryID)
}

export const updateEntry = ({ commit }, entry) => {
  commit('UPDATE_ENTRY', new Entry({ ...entry }))
}

export const saveEntries = async ({ commit, state }) => {
  const { entries, filename, secret, token, gistID, username } = state
  const encryptedData = encryptData(entries, secret, username)
  await gh.saveGistData({ gistID, filename, encryptedData, token })
}

export const showError = ({ commit }, message) => {
  commit('SET_ERROR', message)
}

export const hideError = ({ commit }) => {
  commit('REMOVE_ERROR')
}

export const setInactiveTimer = ({ commit, state }) => {
  if (state.secret) {
    commit('SET_TIMER', setTimeout(() => commit('RESET'), INACTIVE_LOGOUT_DELAY))
  }
}
