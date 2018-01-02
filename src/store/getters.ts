import EntryInterface from '../interfaces/Entry'
import StateInterface from '../interfaces/State'
import GistInterface from '../interfaces/Gist'

export const gistID = ({ gistID }: StateInterface): string => gistID
export const username = ({ username }: StateInterface): string => username
export const entryID = ({ entryID }: StateInterface): string => entryID
export const entries = ({ entries }: StateInterface): EntryInterface[] => entries
export const entryByID = ({ entries }: StateInterface) => (id: string): EntryInterface => entries.find(e => e.id === id)
export const token = ({ token }: StateInterface): string => token
export const error = ({ error }: StateInterface): string => error
export const gists = ({ gists }: StateInterface): GistInterface[] => gists
