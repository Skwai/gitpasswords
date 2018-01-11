import Entry from '../models/Entry'
import * as gh from '../services/gh'
import { encryptData, decryptData } from '../services/encrypt'
import { ACCESS_TOKEN_STORAGE_KEY, INACTIVE_LOGOUT_DELAY } from '../config'
import initialState from './initial-state'

const storeAccessToken = (token: string): void => localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token)
const clearAccessToken = (): void => localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY)

export const login = async ({ commit, state }: GitPasswords.Context): Promise<void> => {
  const { token, username } = await gh.login()
  storeAccessToken(token)
  commit('SET_ACCESS_TOKEN', token)
  commit('SET_USERNAME', username)
}

export const logout = ({ commit }: GitPasswords.Context): void => {
  clearAccessToken()
  commit('RESET', { ...initialState })
}

export const getUserFromToken = async (
  { commit, state }: GitPasswords.Context,
  token: string
): Promise<void> => {
  const { login: username } = await gh.getUser({ token })
  commit('SET_USERNAME', username)
}

export const getGists = async ({ commit, state }: GitPasswords.Context): Promise<void> => {
  const { username, token } = state
  const gists = await gh.getGists({ username, token })
  commit('SET_GISTS', gists)
}

export const createEntry = ({ commit }: GitPasswords.Context): void => {
  const entry = new Entry({
    title: 'New entry'
  })
  commit('ADD_ENTRY', entry)
  commit('SET_ENTRY_ID', entry.id)
}

export const deleteEntry = (
  { commit }: GitPasswords.Context,
  entryID: string
): void => {
  commit('REMOVE_ENTRY', entryID)
}

const PLACEHOLDER_ENTRY = {
  title: 'Example Entry',
  username: 'Example',
  url: 'http://example.com',
  password: 'test'
}

export const createGist = async (
  { commit, state }: GitPasswords.Context,
  { filename, secret }: { filename: string, secret: string }
): Promise<void> => {
  filename = [filename, gh.FILE_EXTENSION].join('.')
  const { token, username } = state
  const placeholder = new Entry(PLACEHOLDER_ENTRY)
  const data = [placeholder]
  const encryptedData = encryptData(data, secret, username)
  const gist = await gh.createGist({
    filename,
    encryptedData,
    token
  })
  commit('SET_FILENAME', filename)
  commit('SET_SECRET', secret)
  commit('ADD_GIST', gist)
  commit('SET_GIST_ID', gist.id)
  commit('SET_ENTRIES', placeholder)
}

export const selectGist = async (
  { commit, state }: GitPasswords.Context,
  { gistID, secret, filename }: { gistID: string, secret: string, filename: string }
): Promise<void> => {
  const { token, username } = state
  const data = await gh.getGithubGist({
    filename,
    gistID,
    token
  })
  const entries = decryptData(data, secret, username)
  commit('SET_FILENAME', filename)
  commit('SET_SECRET', secret)
  commit('SET_GIST_ID', gistID)
  commit('SET_ENTRIES', entries)
}

export const setActiveEntryID = (
  { commit, state }: GitPasswords.Context,
  entryID: string
): void => {
  commit('SET_ENTRY_ID', entryID)
}

export const updateEntry = (
  { commit }: GitPasswords.Context,
  entry: GitPasswords.EntryData
): void => {
  commit('UPDATE_ENTRY', new Entry({ ...entry }))
}

export const saveEntries = async ({ commit, state }: GitPasswords.Context): Promise<void> => {
  const {
    entries,
    filename,
    secret,
    token,
    gistID,
    username
  } = state
  const encryptedData = encryptData(entries, secret, username)
  await gh.saveGithubGist({
    gistID,
    filename,
    encryptedData,
    token
  })
}

export const showError = ({ commit }: GitPasswords.Context, message: string): void => {
  commit('SET_ERROR', message)
}

export const hideError = ({ commit }: GitPasswords.Context): void => {
  commit('REMOVE_ERROR')
}

export const setInactiveTimer = ({ commit, state }: GitPasswords.Context) => {
  if (state.secret) {
    commit('SET_TIMER', setTimeout(() => commit('RESET'), INACTIVE_LOGOUT_DELAY))
  }
}
