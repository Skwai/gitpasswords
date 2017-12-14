import Hashids from 'hashids'

const hashids = new Hashids()

export default class Entry {
  id = null
  title = null
  password = null
  url = null
  notes = null
  created = new Date()
  modified = new Date()

  constructor (attrs = {}) {
    this.id = Entry.generateID()
    Object.assign(this, attrs)
  }

  static generateID () {
    const time = new Date().getTime()
    return hashids.encode(...String(time).split('').map(s => Number(s)))
  }
}
