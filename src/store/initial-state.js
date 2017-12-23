import { ACCESS_TOKEN_STORAGE_KEY } from '@/config'

export default {
  username: null,
  token: window.localStorage ? window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) : null,
  secret: null,
  filename: null,
  gistID: null,
  entryID: null,
  gists: [],
  entries: [],
  error: null,
  inactiveTimer: null
}
