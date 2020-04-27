export class EventEmitter {
  constructor() {
    this.listenersMap = {};
  }

  addListener(type, handler) {
    if (!this.listenersMap[type]) {
      this.listenersMap[type] = [];
    }

    this.listenersMap[type].push(handler);
  }

  emit(type, data) {
    if (!this.listenersMap[type]) {
      return;
    }

    this.listenersMap[type].forEach(fn => fn(data));
  }

  clearListeners() {
    if (this.listenersMap) {
      Object.values(this.listenersMap).forEach(array => array = null);
    }
  }
}