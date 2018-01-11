/**
 * Class representing an Entry
 */
export default class Entry {
  id: string = null
  title: string = null
  username: string = null
  password: string = null
  url: string = null
  notes: string = null
  created: Date = new Date()
  modified: Date = new Date()

  /**
   * Create an Entry
   */
  constructor (props: GitPasswords.EntryData = {}) {
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
