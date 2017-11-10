export const ADD_GISTS = (store, gists) => {
  store.gists = store.gists.concat(gists)
}

export const SET_ENTRIES = (store, entries) => {
  store.entries = store.entries.concat(entries)
}

export const SET_ENTRY_ID = (store, entryId) => {
  store.entryId = entryId
}

export const SET_GIST_ID = (store, gistId) => {
  store.gistId = gistId
}

export const SET_ACCESS_TOKEN = (store, accessToken) => {
  store.accessToken = accessToken
}

export const SET_USERNAME = (store, username) => {
  store.username = username
}

export const SET_SECRET = (store, secret) => {
  store.secret = secret
}
