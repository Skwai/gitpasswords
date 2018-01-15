import State from './state'

export const gistID = ({ gistID }: State): string => gistID
export const username = ({ username }: State): string => username
export const entryID = ({ entryID }: State): string => entryID
export const entries = ({ entries }: State): GitPasswords.EntryData[] => entries
export const entryByID = ({ entries }: State) =>
  (entryID: string): GitPasswords.EntryData =>
    entries.find(({ id }: { id: string }) => id === entryID)
export const token = ({ token }: State): string => token
export const error = ({ error }: State): string => error
export const gists = ({ gists }: State): GitPasswords.GithubGist[] => gists
