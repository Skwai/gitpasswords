import State from '../interfaces/State'
import Gist from '../interfaces/Gist'
import Entry from '../interfaces/Entry'

export const ADD_GISTS = (state: State, gists: Gist[]): void => {
  state.gists = state.gists.concat(gists)
}

export const SET_ENTRIES = (state: State, entries: Entry[]): void => {
  state.entries = state.entries.concat(entries)
}

export const SET_ENTRY_ID = (state: State, entryID: string): void => {
  state.entryID = entryID
}

export const SET_GIST_ID = (state: State, gistID: string): void => {
  state.gistID = gistID
}

export const SET_ACCESS_TOKEN = (state: State, token: string): void => {
  state.token = token
}

export const SET_USERNAME = (state: State, username: string): void => {
  state.username = username
}

export const SET_SECRET = (state: State, secret: string): void => {
  state.secret = secret
}

export const SET_GISTS = (state: State, gists: Gist[]): void => {
  state.gists = gists
}

export const ADD_GIST = (state: State, gist: Gist): void => {
  state.gists.push(gist)
}

export const UPDATE_ENTRY = (state: State, entry: Entry): void => {
  const index = state.entries.findIndex(({ id }) => id === entry.id)
  if (index > -1) {
    state.entries.splice(index, 1, entry)
  }
}

export const SET_FILENAME = (state: State, filename: string): void => {
  state.filename = filename
}

export const ADD_ENTRY = (state: State, entry: Entry): void => {
  state.entries.push(entry)
}

export const REMOVE_ENTRY = (state: State, entryID: string): void => {
  const index = state.entries.findIndex(({ id }) => id === entryID)
  if (index > -1) {
    state.entries.splice(index, 1)
  }
}

export const RESET = (state: State, newState: State): void => {
  Object.entries(newState).forEach(([k, v]) => {
    state[k] = v
  })
}

export const SET_ERROR = (state: State, message: string): void => {
  state.error = message
}

export const REMOVE_ERROR = (state: State): void => {
  state.error = null
}

export const SET_TIMER = (state: State, timer: number): void => {
  state.inactiveTimer = timer
}
