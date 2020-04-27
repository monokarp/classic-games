import { EventEmitter } from "../../utils/event-emitter";
import { GameEvents } from "../../const/common/game-events";
import { MinesweeperEvents } from "../../const/minesweeper/events";
import { TileState } from "../../const/minesweeper/tile-state";
import { MinesweeperGrid } from "./grid";

export class MinesweeperEngine extends EventEmitter {
  constructor() {
    super();

    this.gameGrid = new MinesweeperGrid();

    this.isGameOver = false;
  }

  initGameState(point) {
    this.gameGrid.init(point);

    this.emitState(GameEvents.StateChanged);
  }

  handleAction({ type, point }) {
    const tile = this.gameGrid.get(point);

    if (tile.isOpened()) {
      return;
    }

    switch (type) {
      case MinesweeperEvents.Reveal: {
        this.revealTile(tile);
        break;
      }
      case MinesweeperEvents.Mark: {
        this.markTile(tile);
        break;
      }
      default: return;
    }

    if (this.isGameOver) {
      this.emitState(GameEvents.GameOver);

      this.clearListeners();

      return;
    }

    this.emitState(GameEvents.StateChanged);
  }

  revealTile(tile) {
    if (tile.hasBomb) {
      this.isGameOver = true;

      this.gameGrid.revealAll();

      return;
    }

    if (tile.adjacentBombs) {
      tile.setOpened();

      return;
    }

    // safe cascade reveal
  }

  markTile(tile) {
    switch (tile.state) {
      case TileState.Consealed: return tile.setFlagged();
      case TileState.Flagged: return tile.setQuestioned();
      case TileState.Questioned: return tile.setConsealed();
      default: return;
    }
  }

  emitState(event) {
    this.emit(event, this.gameGrid.getState());
  }
}