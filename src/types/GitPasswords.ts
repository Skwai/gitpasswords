declare namespace GitPasswords {
  interface GithubGist {
    updated_at: string,
    files: Object
  }

  interface EntryData {
    id?: string | null
    title?: string | null
    username?: string | null
    password?: string | null
    url?: string | null
    notes?: string | null
    created?: Date
    modified?: Date
  }

  interface State {
    [key: string]: any
    username: string | null
    token: string | null
    secret: string | null
    filename: string | null
    gistID: string | null
    entryID: string | null
    gists: GithubGist[]
    entries: EntryData[]
    error: string | null
    inactiveTimer: number
  }
}
