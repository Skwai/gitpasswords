import { ACCESS_TOKEN_STORAGE_KEY } from '@/config'

const storage = window.localStorage || false

export default {
  username: null,
  token: storage ? storage.getItem(ACCESS_TOKEN_STORAGE_KEY) : null,
  secret: null,
  filename: null,
  gistID: null,
  entryID: null,
  gists: [],
  entries: [],
  error: null,
  inactiveTimer: null
}
