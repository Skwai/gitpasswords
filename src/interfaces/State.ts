import Entry from './Entry'
import Gist from './Gist'

export default interface StateInterface {
  username: string|null,
  token: string|null
  secret: string|null,
  filename: string|null,
  gistID: string|null,
  entryID: string|null,
  gists: Gist[],
  entries: Entry[]
  error: string|null,
  inactiveTimer: number
}
