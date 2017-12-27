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
 * @param {String}  path              The API URL path
 * @param {Object}  options
 * @param {String}  options.method    The HTTP method (GET, POST, PATCH, etc.)
 * @param {*}       options.data      The JSON data to send in request
 * @param {String}  options.token     The GitHub oAuth access token
 * @return {Promise<Object>}          A promise that resolves with the returned data
 */
export const query = async (path, { method = 'GET', data, token = null }) => {
  const url = [API_URL, path].join('/')
  const response = await fetch(url, {
    method,
    headers: {
      accept: ACCEPT_HEADER,
      ...(data ? { 'content-type': 'application/json' } : null),
      ...(token ? { authorization: `token ${token}` } : null)
    },
    ...(data ? { body: JSON.stringify(data) } : null)
  })
  return response.json()
}

/**
 * Perform oAuth login request via Firebase
 * @return {Promise}
 * @property {String} token     The Github auth token
 * @property {String} username  The Github username
 */
export const login = async () => {
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
 * @param {Object} options
 * @param {String} options.username   The Github user's username
 * @param {String} options.token      The oAuth token
 * @return {Promise<Object>}          A promise that resolves with the user's profile data
 */
export const getUser = ({ username = null, token }) => {
  const path = username ? `users/${username}` : 'user'
  return query(path, { token })
}

/**
 * Get a users Gists filtered by file extension
 * @param {Object} options
 * @param {String} options.username       The User's Github username
 * @param {String} options.token          The Github auth token
 * @param {String} options.fileExtension  The file extension to match Gist files against
 * @return {Promise<Object[]>}               The user's Gists filtered that match the given file extension
 */
export const getGists = async ({ username, token, fileExtension = FILE_EXTENSION }) => {
  const path = `users/${username}/gists`
  const gists = await query(path, { token })
  const filtered = gists.filter((gist) => {
    const filenames = Object.keys(gist.files)
    return !!filenames.find(filename => filename.endsWith(`.${fileExtension}`))
  })
  return filtered
}

/**
 * Create a new Gist
 * @param {Object} options
 * @param {String} options.filename       The filename in the new Gist
 * @param {String} options.encryptedData  The encrypted data to save
 * @param {String} options.token          The Github auth token
 * @return {Promise<Object>}              The new Gist
 */
export const createGist = ({ filename, encryptedData, token }) => {
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
 * @param {Object} options
 * @param {String} options.filename   The filename in the Gist
 * @param {String} options.gistID     The ID of the Gist to retrieve
 * @param {String} options.token      The Github auth token
 * @return {Promise<String>}          The contents of the Gist's file
 */
export const getGistData = async ({ filename, gistID, token }) => {
  const path = `gists/${gistID}`
  const { files } = await query(path, { token })
  if (!(filename in files)) {
    throw Error(`${filename} does not exist in this Gist`)
  }
  return files[filename].content
}

/**
 * Save a Gist's data
 * @param {Object} options
 * @param {String} options.gistID         The ID of the Gist
 * @param {String} options.filename       The filename to save the data to
 * @param {String} options.encryptedData  The encrypted data to save
 * @param {String} options.token          The Github auth token
 * @return {Promise<Object>}              The updated Gist data
 */
export const saveGistData = ({ gistID, filename, encryptedData, token }) => {
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
