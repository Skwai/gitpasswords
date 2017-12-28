import { EntryObject } from '../models/entry'

export const gistID = ({ gistID }: { gistID: string }): string => gistID
export const username = ({ username }: { username: string }): string => username
export const gists = ({ gists }: { gists: Object[] }): Object[] => gists
export const entryID = ({ entryID }: { entryID: string }): string => entryID
export const entries = ({ entries }: { entries: Object[] }): Object[] => entries
export const entryByID = ({ entries }: { entries: EntryObject[] }) => (id: string) => entries.find(e => e.id === id)
export const token = ({ token }: { token: string }): string => token
export const error = ({ error }: { error: string }): string => error
