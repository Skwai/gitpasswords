import Firebase from 'firebase'
import { FIREBASE } from '../config'

const API_URL = 'https://api.github.com'
const ACCEPT_HEADER = 'application/vnd.github.v3+json'
const DEFAULT_DESCRIPTION = 'Git password file'

const github = new Firebase.auth.GithubAuthProvider()
github.addScope('gist')
Firebase.initializeApp(FIREBASE)
const { auth } = Firebase

export const FILE_EXTENSION = 'enc'

/**
 * Perform a query agains the Github V3 REST API
 */
export const query = async (path: string, {
  method = 'GET',
  data = null,
  token = null
}: {
  method?: string,
  data?: any,
  token?: string
}): Promise<any> => {
  const url = [API_URL, path].join('/')
  const headers = new Headers({
    accept: ACCEPT_HEADER
  })
  if (data) {
    headers.set('content-type', 'application/json')
  }
  if (token) {
    headers.set('authorization', `token ${token}`)
  }
  const args: RequestInit = {
    method,
    headers
  }
  if (data) {
    args.body = JSON.stringify(data)
  }
  const response = await fetch(url, args)
  return response.json()
}

/**
 * Perform oAuth login request via Firebase
 */
export const login = async (): Promise<{token: string, username: string}> => {
  const { credential } = await auth().signInWithPopup(github)
  const { accessToken: token } = credential
  const { login: username } = await getUser({ token })
  return {
    token,
    username
  }
}

/**
 * Get a Github user's profile
 */
export const getUser = ({
  username = null,
  token
}: {
  username?: string,
  token?: string
}): Promise<{login?: string}> => {
  const path = username ? `users/${username}` : 'user'
  return query(path, { token })
}

/**
 * Get a users Gists filtered by file extension
 */
export const getGists = async ({
  username,
  token,
  fileExtension = FILE_EXTENSION
}: {
  username: string,
  token: string,
  fileExtension?: string
}): Promise<Object> => {
  const path = `users/${username}/gists`
  const gists = await query(path, { token })
  const filtered = gists.filter((gist: GitPasswords.GithubGist) => {
    const filenames = Object.keys(gist.files)
    return !!filenames.find(filename => filename.endsWith(`.${fileExtension}`))
  })
  return filtered
}

/**
 * Create a new Gist
 */
export const createGist = ({
  filename,
  encryptedData,
  token
}: {
  filename: string,
  encryptedData: string,
  token: string
}): Promise<{id: string, files: Object[]}> => {
  const data = {
    description: DEFAULT_DESCRIPTION,
    public: false,
    files: {
      [filename]: {
        content: encryptedData
      }
    }
  }
  return query('gists', {
    data,
    token,
    method: 'POST'
  })
}

/**
 * Get a the contents of a Gist's file
 */
export const getGithubGist = async ({
  filename,
  gistID,
  token
}: {
  filename: string,
  gistID: string,
  token: string
}): Promise<string> => {
  const path = `gists/${gistID}`
  const { files } = await query(path, { token })
  if (!(filename in files)) {
    throw Error(`${filename} does not exist in this Gist`)
  }
  return files[filename].content
}

/**
 * Save a Gist's data
 */
export const saveGithubGist = ({
  gistID,
  filename,
  encryptedData,
  token
}: {
  gistID: string,
  filename: string,
  encryptedData: string,
  token: string
}): Promise<Object> => {
  const path = `gists/${gistID}`
  const data = {
    files: {
      [filename]: {
        content: encryptedData
      }
    }
  }
  return query(path, {
    data,
    token,
    method: 'PATCH'
  })
}
