import * as encrypt from '@/services/encrypt'

/* eslint-disable no-unused-expressions */
describe('encrypt.js', () => {
  describe('encrypt.encryptData()', () => {
    describe('encrypt.decryptData()', () => {
      const data = { foo: 'bar', bar: 'baz' }

      it('should be able to decrypt encrypted data decrypted', () => {
        const secret = 'example'
        const username = 'testuser'
        const encrypted = encrypt.encryptData(data, secret, username)
        const decrypted = encrypt.decryptData(encrypted, secret, username)
        expect(decrypted).to.deep.equal(data)
      })

      it('throws exception when incorrect secret used', () => {
        const encrypted = encrypt.encryptData(data, 'correct', 'testuser')
        expect(() => encrypt.decryptData(encrypted, 'incorrect', 'testuser')).to.throw(Error)
      })
    })
  })
})
