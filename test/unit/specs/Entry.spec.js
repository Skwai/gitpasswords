import Entry from '@/models/Entry'

describe('Entry', () => {
  describe('generateId', () => {
    it('generates a random alphanumeric ID', () => {
      const id = Entry.generateID()
      expect(typeof id).toBe('string')
    })
  })
})
