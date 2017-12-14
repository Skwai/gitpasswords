import initialState from '@/store/initial-state'

export const ADD_GISTS = (store, gists) => {
  store.gists = store.gists.concat(gists)
}

export const SET_ENTRIES = (store, entries) => {
  store.entries = store.entries.concat(entries)
}

export const SET_ENTRY_ID = (store, entryID) => {
  store.entryID = entryID
}

export const SET_GIST_ID = (store, gistID) => {
  store.gistID = gistID
}

export const SET_ACCESS_TOKEN = (store, token) => {
  store.token = token
}

export const SET_USERNAME = (store, username) => {
  store.username = username
}

export const SET_SECRET = (store, secret) => {
  store.secret = secret
}

export const SET_GISTS = (store, gists) => {
  store.gists = gists
}

export const ADD_GIST = (store, gist) => {
  store.gists.push(gist)
}

export const UPDATE_ENTRY = (store, entry) => {
  const index = store.entries.findIndex(({ id }) => id === entry.id)
  store.entries[index] = entry
}

export const SET_FILENAME = (store, filename) => {
  store.filename = filename
}

export const ADD_ENTRY = (store, entry) => {
  store.entries.push(entry)
}

export const REMOVE_ENTRY = (store, entryID) => {
  const index = store.entries.findIndex(({ id }) => id === entryID)
  store.entries.splice(index, 1)
}

export const RESET = (store) => {
  store = { ...initialState }
}
