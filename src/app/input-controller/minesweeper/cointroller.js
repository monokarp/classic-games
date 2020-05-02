/* eslint-disable class-methods-use-this */

import { MinesweeperEvents } from '../../const/minesweeper/events';

export class BrowserInputController {
  constructor() {
    document.addEventListener('contextmenu', event => (event.preventDefault(), false));
  }

  onStart(handler) {
    // document.addEventListener(
    //   'click',
    //   () => handler(),
    //   { once: true }
    // );
  }

  onPlayerAction(handler) {
    document.addEventListener('mouseup', event => {
      if (!this.isValid(event)) { return; }

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

  isValid(event) {
    return [1, 2, 3].includes(event.which)
      && /^[0-9]*_[0-9]*$/.test(event.target.id);
  }
}
