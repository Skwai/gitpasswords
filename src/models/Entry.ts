import Hashids from 'hashids'

const hashids = new Hashids()

/**
 * Class representing an Entry
 */
export default class Entry {
  id: string|null = null
  title: string|null = null
  username: string|null = null
  password: string|null = null
  url: string|null = null
  notes: string|null = null
  created: Date = new Date()
  modified: Date = new Date()

  /**
   * Create an Entry
   * @param {Object} props The initialization properties
   */
  constructor (props = {}) {
    this.id = Entry.generateID()
    Object.assign(this, props)
  }

  /**
   * Generate a hash ID
   * @return {String} The hash ID
   */
  static generateID (): string {
    const time = new Date().getTime()
    return hashids.encode(...String(time).split('').map(s => Number(s)))
  }
}

export interface EntryObject {
  id: string|null
  title: string|null
  username: string|null
  password: string|null
  url: string|null
  notes: string|null
  created: Date
  modified: Date
}
