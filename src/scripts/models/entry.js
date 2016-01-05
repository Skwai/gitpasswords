import uuid from 'uuid-v4';

const _uuid = new WeakMap();

class Entry {
  
  constructor(props = {}) {
    this.name = props.name || null;
    this.url = props.url || null;
    this.username = props.username || null;
    this.email = props.email || null;
    this.password = props.password || null;
    this.description = props.description || null;
    
    const __uuid = uuid();
    
    _uuid.set(this, __uuid);
  }
  
  icon() {
    return this.url ? 'https://www.google.com/s2/favicons?domain=' + encodeURIComponent(this.url) : null;
  }
  
  uuid() {
    return _uuid.get(this);
  }
  
}

export default Entry;