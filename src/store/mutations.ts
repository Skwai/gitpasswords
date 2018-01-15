import { Mutation } from 'vuex'
import State from './state'

export const ADD_GISTS: Mutation<State> = (state, gists: GitPasswords.GithubGist[]): void => {
  state.gists = state.gists.concat(gists)
}

export const SET_ENTRIES: Mutation<State> = (state, entries: GitPasswords.EntryData[]): void => {
  state.entries = state.entries.concat(entries)
}

export const SET_ENTRY_ID: Mutation<State> = (state, entryID: string): void => {
  state.entryID = entryID
}

export const SET_GIST_ID: Mutation<State> = (state, gistID: string): void => {
  state.gistID = gistID
}

export const SET_ACCESS_TOKEN: Mutation<State> = (state, token: string): void => {
  state.token = token
}

export const SET_USERNAME: Mutation<State> = (state, username: string): void => {
  state.username = username
}

export const SET_SECRET: Mutation<State> = (state, secret: string): void => {
  state.secret = secret
}

export const SET_GISTS: Mutation<State> = (state, gists: GitPasswords.GithubGist[]): void => {
  state.gists = gists
}

export const ADD_GIST: Mutation<State> = (state, gist: GitPasswords.GithubGist): void => {
  state.gists.push(gist)
}

export const UPDATE_ENTRY: Mutation<State> = (state, entry: GitPasswords.EntryData): void => {
  const index = state.entries.findIndex(({ id }: { id: string }) => id === entry.id)
  if (index > -1) {
    state.entries.splice(index, 1, entry)
  }
}

export const SET_FILENAME: Mutation<State> = (state, filename: string): void => {
  state.filename = filename
}

export const ADD_ENTRY: Mutation<State> = (state, entry: GitPasswords.EntryData): void => {
  state.entries.push(entry)
}

export const REMOVE_ENTRY: Mutation<State> = (state, entryID: string): void => {
  const index = state.entries.findIndex(({ id }: { id: string}) => id === entryID)
  if (index > -1) {
    state.entries.splice(index, 1)
  }
}

export const RESET: Mutation<State> = (state, newState: State): void => {
  Object.entries(newState).forEach(([k, v]) => {
    state[k] = v
  })
}

export const SET_ERROR: Mutation<State> = (state, message: string): void => {
  state.error = message
}

export const REMOVE_ERROR: Mutation<State> = (state): void => {
  state.error = null
}

export const SET_TIMER: Mutation<State> = (state, timer: number): void => {
  state.inactiveTimer = timer
}
