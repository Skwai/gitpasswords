import EntryInterface from '../interfaces/Entry'

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
   */
  constructor (props: EntryInterface = {}) {
    this.id = Entry.generateID()
    Object.assign(this, props)
  }

  /**
   * Generate a hash ID
   */
  static generateID (): string {
    return Math.random().toString(36).substr(2)
  }
}
