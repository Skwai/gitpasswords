export const ADD_GISTS = (store, gists) => {
  store.gists = store.gists.concat(gists)
}

export const SET_ENTRIES = (store, entries) => {
  store.entries = store.entries.concat(entries)
}

export const SET_GIST_ID = (store, gistId) => {
  store.gistId = gistId
}

export const SET_USERNAME = (store, username) => {
  store.username = username
}
