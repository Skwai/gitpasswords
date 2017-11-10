export default class Entry {
  title = null
  password = null
  url = null
  notes = null
  created = new Date()
  modified = new Date()

  constructor (attrs = {}) {
    Object.assign(this, attrs)
  }
}
