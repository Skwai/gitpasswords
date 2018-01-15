import { ACCESS_TOKEN_STORAGE_KEY } from '../config'
const storage = window.localStorage || false

export default class State {
  [key: string]: any
  username: string = null
  token: string = storage ? storage.getItem(ACCESS_TOKEN_STORAGE_KEY) : null
  secret: string = null
  filename: string = null
  gistID: string = null
  entryID: string = null
  gists: GitPasswords.GithubGist[] = []
  entries: GitPasswords.EntryData[] = []
  error: string = null
  inactiveTimer: number = null
}
