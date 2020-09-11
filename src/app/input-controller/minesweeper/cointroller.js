/* eslint-disable class-methods-use-this */

import { MinesweeperEvents } from '../../const/minesweeper/events';

export class BrowserInputController {
  constructor(hostElementId) {
    this.host = document.getElementById(hostElementId);

    this.host.addEventListener('contextmenu', event => event.preventDefault());

    this.host.addEventListener('mousedown', event => event.preventDefault());
  }

  onStart(handler) {
    this.host.addEventListener('click', event => this.isValidStart(event) && handler());
  }

  onPlayerAction(handler) {
    this.host.addEventListener('mouseup', event => {
      if (!this.isValidMouseClick(event)) { return; }

      event.preventDefault();

      const action = this.parsePlayerAction(event);

      handler(action);
    });
  }

  parsePlayerAction(event) {
    return {
      type: this.parseEventType(event),
      point: this.parseCoordinates(event)
    };
  }

  parseEventType(event) {
    switch (event.which) {
      case 1: return MinesweeperEvents.Reveal;
      case 2: return MinesweeperEvents.BatchReveal;
      case 3: return MinesweeperEvents.Flag;
      default: throw new Error('Unknown mouse click type');
    }
  }


  parseCoordinates(event) {
    const coordinates = event.target.id.split('_').map(Number);

    return {
      x: coordinates[0],
      y: coordinates[1]
    };
  }

  isValidMouseClick(event) {
    return [1, 2, 3].includes(event.which)
      && /^[0-9]*_[0-9]*$/.test(event.target.id);
  }

  isValidStart(event) {
    return event.target.id === 'start';
  }
}
