import { ACCESS_TOKEN_STORAGE_KEY } from '@/config'

export default {
  username: null,
  token: localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY),
  secret: null,
  filename: null,
  gistID: null,
  entryID: null,
  gists: [],
  entries: []
}
