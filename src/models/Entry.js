import Hashids from 'hashids'

const hashids = new Hashids()

/**
 * Class representing an Entry
 * @property {String} id
 * @property {String} title
 * @property {String} username
 * @property {String} password
 * @property {String} url
 * @property {String} notes
 * @property {Date}   created
 * @property {Date}   modified
 */
export default class Entry {
  id = null
  title = null
  username = null
  password = null
  url = null
  notes = null
  created = new Date()
  modified = new Date()

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
  static generateID () {
    const time = new Date().getTime()
    return hashids.encode(...String(time).split('').map(s => Number(s)))
  }
}
