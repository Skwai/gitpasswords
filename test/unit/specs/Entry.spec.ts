// <reference path='../../../node_modules/@types/jest/index.d.ts' />
import Entry from '../../../src/models/Entry'

describe('Entry.js', () => {
  describe('generateId', () => {
    it('generates a random alphanumeric ID', () => {
      const id = Entry.generateID()
      expect(typeof id).toBe('string')
    })
  })
})
