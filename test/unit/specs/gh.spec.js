import * as gh from '@/services/gh'

/* eslint-disable no-unused-expressions */
describe('gh.js', () => {
  describe('encryptData()', () => {
    describe('decryptData()', () => {
      const data = { foo: 'bar', bar: 'baz' }

      it('should be able to decrypt encrypted data decrypted', () => {
        const secret = 'example'
        const encrypted = gh.encryptData(data, secret)
        const decrypted = gh.decryptData(encrypted, secret)
        expect(decrypted).to.deep.equal(data)
      })

      it('throws exception when incorrect secret used', () => {
        const encrypted = gh.encryptData(data, 'correct')
        expect(() => gh.decryptData(encrypted, 'incorrect')).to.throw(Error)
      })
    })
  })
})
