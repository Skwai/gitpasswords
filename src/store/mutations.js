import initialState from '@/store/initial-state'

export const ADD_GISTS = (state, gists) => {
  state.gists = state.gists.concat(gists)
}

export const SET_ENTRIES = (state, entries) => {
  state.entries = state.entries.concat(entries)
}

export const SET_ENTRY_ID = (state, entryID) => {
  state.entryID = entryID
}

export const SET_GIST_ID = (state, gistID) => {
  state.gistID = gistID
}

export const SET_ACCESS_TOKEN = (state, token) => {
  state.token = token
}

export const SET_USERNAME = (state, username) => {
  state.username = username
}

export const SET_SECRET = (state, secret) => {
  state.secret = secret
}

export const SET_GISTS = (state, gists) => {
  state.gists = gists
}

export const ADD_GIST = (state, gist) => {
  state.gists.push(gist)
}

export const UPDATE_ENTRY = (state, entry) => {
  const index = state.entries.findIndex(({ id }) => id === entry.id)
  state.entries[index] = entry
}

export const SET_FILENAME = (state, filename) => {
  state.filename = filename
}

export const ADD_ENTRY = (state, entry) => {
  state.entries.push(entry)
}

export const REMOVE_ENTRY = (state, entryID) => {
  const index = state.entries.findIndex(({ id }) => id === entryID)
  state.entries.splice(index, 1)
}

export const RESET = (state) => {
  Object.entries(initialState).forEach(([k, v]) => {
    state[k] = v
  })
}

export const SET_ERROR = (state, message) => {
  state.error = message
}

export const REMOVE_ERROR = (state) => {
  state.error = null
}
