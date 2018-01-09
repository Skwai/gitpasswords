export const gistID = ({ gistID }: GitPasswords.State): string => gistID
export const username = ({ username }: GitPasswords.State): string => username
export const entryID = ({ entryID }: GitPasswords.State): string => entryID
export const entries = ({ entries }: GitPasswords.State): GitPasswords.EntryData[] => entries
export const entryByID = ({ entries }: GitPasswords.State) => (entryID: string): GitPasswords.EntryData => entries.find(({ id }: { id: string }) => id === entryID)
export const token = ({ token }: GitPasswords.State): string => token
export const error = ({ error }: GitPasswords.State): string => error
export const gists = ({ gists }: GitPasswords.State): GitPasswords.GithubGist[] => gists
