import Firebase from 'firebase'
import { FIREBASE } from '../config'

const API_URL = 'https://api.github.com'
const ACCEPT_HEADER = 'application/vnd.github.v3+json'
const DEFAULT_DESCRIPTION = 'Git password file'

const github = new Firebase.auth.GithubAuthProvider()
github.addScope('gist')
Firebase.initializeApp(FIREBASE)
const { auth } = Firebase

/**
 * Perform a query agains the Github V3 REST API
 * @param {String}  path              The API URL path
 * @param {Object}  options
 * @param {String}  options.method    The HTTP method (GET, POST, PATCH, etc.)
 * @param {*}       options.data      The JSON data to send in request
 * @param {String}  options.token     The GitHub oAuth access token
 * @return {Promise<Array|Object>}    A promise that resolves with the returned data
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
 * @return {Object}
 * @property {String} token
 * @property {String} username
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
 * @return {Promise<Object>}          A promise that resolves with the user's data
 */
export const getUser = ({ username = null, token }) => {
  const path = username ? `users/${username}` : 'user'
  return query(path, { token })
}

/**
 * Get a users Gists
 * @param {Object} options
 * @param {String} options.username
 * @param {String} options.token
 * @return {Promise}
 */
export const getGists = ({ username, token }) => {
  const path = `users/${username}/gists`
  return query(path, { token })
}

/**
 * Create a new Gist
 * @param {Object} options
 * @param {String} options.filename
 * @param {String} options.secret
 * @param {String} options.encryptedData
 * @param {String} options.token
 * @return {Promise}
 */
export const createGist = ({ filename, secret, encryptedData, token }) => {
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
 * Get a single Gist's data
 * @param {Object} options
 * @param {String} options.filename
 * @param {String} options.gistID
 * @param {String} options.token
 * @return {Promise<String>}
 */
export const getGistData = async ({ filename, gistID, token }) => {
  const path = `gists/${gistID}`
  const { files } = await query(path, { token })
  return files[filename].content
}

/**
 * Save a Gist's data
 * @param {Object} options
 * @param {String} options.gistID
 * @param {String} options.filename
 * @param {String} options.encryptedData
 * @param {String} options.token
 * @return {Promise}
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
    method: 'POST'
  })
}
