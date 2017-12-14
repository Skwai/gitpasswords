import Firebase from 'firebase'
import CryptoJS from 'crypto-js'
import config from '../config'

const API_URL = 'https://api.github.com'
const ACCEPT = 'application/vnd.github.v3+json'
const DEFAULT_DESCRIPTION = 'Git password file'

const github = new Firebase.auth.GithubAuthProvider()
github.addScope('gist')
Firebase.initializeApp(config.FIREBASE)
const { auth } = Firebase

export const login = async () => {
  try {
    const { credential } = await auth().signInWithPopup(github)
    const { accessToken } = credential
    const { login: username } = await getUser(null, accessToken)
    return {
      accessToken,
      username
    }
  } catch (err) {
    console.error(err)
  }
}

export const getUser = (username = null, token) => {
  const path = username ? `users/${username}` : 'user'
  return query(path, { token })
}

export const getGists = (username, token) => {
  const path = `users/${username}/gists`
  return query(path, { token })
}

export const query = async (path, { method = 'GET', data, token = null }) => {
  const url = [API_URL, path].join('/')
  const response = await fetch(url, {
    method,
    headers: {
      accept: ACCEPT,
      ...(token ? { authorization: `token ${token}` } : null)
    },
    ...(data ? { body: JSON.stringify(data) } : null)
  })
  return response.json()
}

export const createGist = (filename, secret, encryptedData, token) => {
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

export const getGistData = async (gistId, token) => {
  const path = `gists/${gistId}`
  const { files } = await query(path, { token })
  const filename = Object.keys(files).shift()
  return files[filename].content
}

export const saveGistData = (gistId, filename, data) => {
  const path = `gists/${gistId}`
  const { files } = this.query(path)
  if (!(filename in files)) throw Error('The retrieved Gist is empty')
  return files[filename].content
}

export const decryptData = (data, secret) => {
  try {
    const b64 = CryptoJS.AES.decrypt(data, secret).toString(CryptoJS.enc.Utf8)
    const json = atob(b64)
    return JSON.parse(json)
  } catch (err) {
    throw Error('Could not decrypt data')
  }
}

export const encryptData = (data, secret) => {
  const json = JSON.stringify(data)
  const b64 = btoa(json)
  const encrypted = CryptoJS.AES.encrypt(b64, secret)
  return encrypted.toString()
}
