export const gistID = ({ gistID }) => gistID
export const username = ({ username }) => username
export const gists = ({ gists }) => gists
export const entryID = ({ entryID }) => entryID
export const entries = ({ entries }) => entries
export const entryByID = ({ entries }) => (id) => entries.find(e => e.id === id)
export const token = ({ token }) => token
