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
      const password = generatePassword(100, 'abcd')
      expect(password).toMatch(/[abcd]+/)
    })

    it('should generate random passwords', () => {
      const passwords = []

      for (let i = 0; i < 1000; i++) {
        const password = generatePassword(1000, 'abcd')
        passwords.push(password)
      }

      const joined = passwords.join('')
      const chars = joined.split('')
      const tolerance = 0.01

      const counts = {
        a: 0,
        b: 0,
        c: 0,
        d: 0
      }

      chars.forEach((char) => {
        counts[char]++
      })

      expect(counts.a).toBeGreaterThanOrEqual(chars.length / 4 * (1 - tolerance))
      expect(counts.a).toBeLessThanOrEqual(chars.length / 4 * (1 + tolerance))
      expect(counts.b).toBeGreaterThanOrEqual(chars.length / 4 * (1 - tolerance))
      expect(counts.b).toBeLessThanOrEqual(chars.length / 4 * (1 + tolerance))
      expect(counts.c).toBeGreaterThanOrEqual(chars.length / 4 * (1 - tolerance))
      expect(counts.c).toBeLessThanOrEqual(chars.length / 4 * (1 + tolerance))
      expect(counts.d).toBeGreaterThanOrEqual(chars.length / 4 * (1 - tolerance))
      expect(counts.d).toBeLessThanOrEqual(chars.length / 4 * (1 + tolerance))
    })
  })
})
