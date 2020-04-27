import { MinesweeperEvents } from "../../const/minesweeper/events";

export class MinesweeperInputController {
  constructor() {
  }

  onStart(handler) {
    document.addEventListener(
      MinesweeperEvents.Start,
      () => handler(),
      { once: true }
    );
  }

  onPlayerAction(handler) {
    // document.addEventListener(
    //   MinesweeperEvents.Reveal,
    //   event => handler(),
    // );
  }
}