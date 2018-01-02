// <reference path='../../../node_modules/@types/jest/index.d.ts' />
import { encryptData, decryptData, generateKey } from '../../../src/services/encrypt'

describe('encrypt.js', () => {
  const data = { foo: 'bar', bar: 'baz' }
  const secret = 'example'
  const username = 'testuser'

  describe('generateKey', () => {
    it('should generate a key', () => {
      const key = generateKey(secret, username)
      expect(typeof key).toBe('string')
    })
  })

  let encrypted

  describe('encryptData()', () => {
    it('should return the encrypted data as a string', () => {
      encrypted = encryptData(data, secret, username)
      expect(typeof encrypted).toBe('string')
    })
  })

  describe('decryptData', () => {
    it('should return the original data if it successfuly decrypts it', () => {
      const decrypted = decryptData(encrypted, secret, username)
      expect(decrypted).toEqual(data)
    })

    it('should throw an error if it fails to decrypt the data due to an incorrect secret', () => {
      expect(() => decryptData(encrypted, 'incorrect', username)).toThrow()
    })

    it('should throw an error if it fails to decrypt the data due to an incorrect salt', () => {
      expect(() => decryptData(encrypted, secret, 'incorrect')).toThrow()
    })
  })
})
