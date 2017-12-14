import CryptoJS from 'crypto-js'

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
