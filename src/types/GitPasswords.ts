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
}
