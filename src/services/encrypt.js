import CryptoJS from 'crypto-js'

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

export const encryptData = (data, secret, salt) => {
  const json = JSON.stringify(data)
  const b64 = btoa(json)
  const key = generateKey(secret, salt)
  const encrypted = CryptoJS.AES.encrypt(b64, key)
  return encrypted.toString()
}

export const generateKey = (secret, salt) => {
  return CryptoJS.PBKDF2(secret, salt, { keySize: 8, iterations: 10000 }).toString()
}
