import {
  UPDATE_ENTRY,
  REMOVE_ENTRY,
  RESET
} from '../../../src/store/mutations'

const entry = { id: 'entry1', username: 'username1', password: 'password1' }

describe('mutations.js', () => {
  describe('UPDATE_ENTRY', () => {
    let state

    beforeEach(() => {
      state = {
        entries: [ Object.assign({}, entry) ]
      }
    })

    it('updated an entry in the store if the ID exists', () => {
      const newEntry = { id: 'entry1', username: 'username2', password: 'password2' }
      UPDATE_ENTRY(state, Object.assign({}, newEntry))
      expect(state.entries).toEqual([Object.assign({}, newEntry)])
    })

    it(`does not update the store if the ID doesn't exist`, () => {
      const newEntry = { id: 'entry2', username: 'username2', password: 'password2' }
      UPDATE_ENTRY(state, Object.assign({}, newEntry))
      expect(state.entries).toEqual([Object.assign({}, entry)])
    })
  })

  describe('REMOVE_ENTRY', () => {
    let state

    beforeEach(() => {
      state = {
        entries: [ Object.assign({}, entry) ]
      }
    })

    it('removes an entry from the store if the ID exists', () => {
      REMOVE_ENTRY(state, 'entry1')
      expect(state.entries).toHaveLength(0)
    })

    it(`doesn't remove any entries from the store if the ID doesn't exist`, () => {
      REMOVE_ENTRY(state, 'entry2')
      expect(state.entries).toHaveLength(1)
    })
  })

  describe('RESET', () => {
    it('modifies the store to reflect the new state', () => {
      const state = {
        entries: [ 'foo', 'bar' ],
        username: 'baz'
      }

      const newState = {
        entries: [],
        username: null
      }

      RESET(state, newState)
      expect(state).toEqual(Object.assign({}, newState))
    })
  })
})
