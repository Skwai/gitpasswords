import CryptoJS from 'crypto-js'

/**
 * Decrypt the data
 */
export const decryptData = (data: string, secret: string, salt: string): any => {
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
 */
export const encryptData = (data: any, secret: string, salt: string): string => {
  const json = JSON.stringify(data)
  const b64 = btoa(json)
  const key = generateKey(secret, salt)
  const encrypted = CryptoJS.AES.encrypt(b64, key)
  return encrypted.toString()
}

/**
 * Generate a PBKDF2 key
 */
export const generateKey = (secret: string, salt: string, iterations: number = 10000): string => {
  return CryptoJS.PBKDF2(secret, salt, { keySize: 8, iterations }).toString()
}
