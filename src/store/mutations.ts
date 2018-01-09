export const ADD_GISTS = (state: GitPasswords.State, gists: GitPasswords.GithubGist[]): void => {
  state.gists = state.gists.concat(gists)
}

export const SET_ENTRIES = (state: GitPasswords.State, entries: GitPasswords.EntryData[]): void => {
  state.entries = state.entries.concat(entries)
}

export const SET_ENTRY_ID = (state: GitPasswords.State, entryID: string): void => {
  state.entryID = entryID
}

export const SET_GIST_ID = (state: GitPasswords.State, gistID: string): void => {
  state.gistID = gistID
}

export const SET_ACCESS_TOKEN = (state: GitPasswords.State, token: string): void => {
  state.token = token
}

export const SET_USERNAME = (state: GitPasswords.State, username: string): void => {
  state.username = username
}

export const SET_SECRET = (state: GitPasswords.State, secret: string): void => {
  state.secret = secret
}

export const SET_GISTS = (state: GitPasswords.State, gists: GitPasswords.GithubGist[]): void => {
  state.gists = gists
}

export const ADD_GIST = (state: GitPasswords.State, gist: GitPasswords.GithubGist): void => {
  state.gists.push(gist)
}

export const UPDATE_ENTRY = (state: GitPasswords.State, entry: GitPasswords.EntryData): void => {
  const index = state.entries.findIndex(({ id }: { id: string }) => id === entry.id)
  if (index > -1) {
    state.entries.splice(index, 1, entry)
  }
}

export const SET_FILENAME = (state: GitPasswords.State, filename: string): void => {
  state.filename = filename
}

export const ADD_ENTRY = (state: GitPasswords.State, entry: GitPasswords.EntryData): void => {
  state.entries.push(entry)
}

export const REMOVE_ENTRY = (state: GitPasswords.State, entryID: string): void => {
  const index = state.entries.findIndex(({ id }: { id: string}) => id === entryID)
  if (index > -1) {
    state.entries.splice(index, 1)
  }
}

export const RESET = (state: GitPasswords.State, newState: GitPasswords.State): void => {
  Object.entries(newState).forEach(([k, v]) => {
    state[k] = v
  })
}

export const SET_ERROR = (state: GitPasswords.State, message: string): void => {
  state.error = message
}

export const REMOVE_ERROR = (state: GitPasswords.State): void => {
  state.error = null
}

export const SET_TIMER = (state: GitPasswords.State, timer: number): void => {
  state.inactiveTimer = timer
}
