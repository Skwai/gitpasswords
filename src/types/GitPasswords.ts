declare namespace GitPasswords {
  interface GithubGist {
    updated_at: string,
    files: Object
  }

  interface EntryData {
    id?: string
    title?: string
    username?: string
    password?: string
    url?: string
    notes?: string
    created?: Date
    modified?: Date
  }

  interface State {
    [key: string]: any
    username: string
    token: string
    secret: string
    filename: string
    gistID: string
    entryID: string
    gists: GithubGist[]
    entries: EntryData[]
    error: string
    inactiveTimer: number
  }

  interface Context {
    state: State
    commit (mutation: string, payload?: any): void
  }
}
