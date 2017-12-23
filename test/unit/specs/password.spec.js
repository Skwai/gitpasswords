import { generatePassword } from '@/services/password'

/* eslint-disable no-unused-expressions */
describe('password.js', () => {
  describe('generatePassword', () => {
    it('should return a password with the length supplied', () => {
      expect(generatePassword(4)).toHaveLength(4)
      expect(generatePassword(10)).toHaveLength(10)
      expect(generatePassword(0)).toHaveLength(0)
    })

    it('should only ever include characters that are in the character set supplied', () => {
      const passwords = []

      for (let i = 0; i < 100; i++) {
        const password = generatePassword(100, 'abc')
        passwords.push(password)
      }

      expect(passwords.join('')).toMatch(/[abc]+/)
    })
  })
})
