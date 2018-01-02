import Entry from '../interfaces/Entry'
import State from '../interfaces/State'
import Gist from '../interfaces/Gist'

export const gistID = ({ gistID }: State): string => gistID
export const username = ({ username }: State): string => username
export const entryID = ({ entryID }: State): string => entryID
export const entries = ({ entries }: State): Entry[] => entries
export const entryByID = ({ entries }: State) => (entryID: string): Entry => entries.find(({ id }) => id === entryID)
export const token = ({ token }: State): string => token
export const error = ({ error }: State): string => error
export const gists = ({ gists }: State): Gist[] => gists
