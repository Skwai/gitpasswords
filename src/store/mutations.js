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

export const SET_ACCESS_TOKEN = (store, accessToken) => {
  store.accessToken = accessToken
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
