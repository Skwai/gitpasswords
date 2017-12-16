import * as encrypt from '@/services/gh'

/* eslint-disable no-unused-expressions */
describe('encrypt.js', () => {
  describe('encryptData()', () => {
    describe('decryptData()', () => {
      const data = { foo: 'bar', bar: 'baz' }

      it('should be able to decrypt encrypted data decrypted', () => {
        const secret = 'example'
        const encrypted = encrypt.encryptData(data, secret)
        const decrypted = encrypt.decryptData(encrypted, secret)
        expect(decrypted).to.deep.equal(data)
      })

      it('throws exception when incorrect secret used', () => {
        const encrypted = encrypt.encryptData(data, 'correct')
        expect(() => encrypt.decryptData(encrypted, 'incorrect')).to.throw(Error)
      })
    })
  })
})
