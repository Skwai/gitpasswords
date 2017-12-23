import CryptoJS from 'crypto-js'

/**
 * Decrypt the data
 * @param {String} data
 * @param {String} secret
 * @param {String} salt
 * @return {Object|Array}
 */
export const decryptData = (data, secret, salt) => {
  try {
    const key = generateKey(secret, salt)
    const b64 = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8)
    const json = atob(b64)
    return JSON.parse(json)
  } catch (err) {
    throw Error('Could not decrypt data')
  }
}

/**
 * Encrypt the data
 * @param {*} data
 * @param {String} secret
 * @param {String} salt
 * @return {String}
 */
export const encryptData = (data, secret, salt) => {
  const json = JSON.stringify(data)
  const b64 = btoa(json)
  const key = generateKey(secret, salt)
  const encrypted = CryptoJS.AES.encrypt(b64, key)
  return encrypted.toString()
}

/**
 * Generate a PBKDF2 key
 * @param {String} secret
 * @param {String} salt
 */
export const generateKey = (secret, salt) => {
  return CryptoJS.PBKDF2(secret, salt, { keySize: 8, iterations: 10000 }).toString()
}
