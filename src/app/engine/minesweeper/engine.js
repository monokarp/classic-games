import { EventEmitter } from '../../utils/event-emitter';
import { GameEvents } from '../../const/common/game-events';
import { MinesweeperEvents } from '../../const/minesweeper/events';

export class MinesweeperEngine extends EventEmitter {
  constructor(gameGrid) {
    super();

    this.gameGrid = gameGrid;

    this.isGameOver = false;
  }

  initGameState(point) {
    this.gameGrid.init(point);

    this.processAction({
      type: MinesweeperEvents.Reveal,
      point
    });
  }

  processAction({ type, point }) {
    const tile = this.gameGrid.get(point);

    this.getActionHandler(type)(tile);

    if (this.isGameOver) {
      this.emitState(GameEvents.GameOver);

      this.clearListeners();

      return;
    }

    this.emitState(GameEvents.StateChanged);
  }

  getActionHandler(type) {
    switch (type) {
      case MinesweeperEvents.Reveal:
        return tile => this.revealTile(tile);
      case MinesweeperEvents.RevealAdjacent:
        return tile => this.revealAdjacent(tile);
      case MinesweeperEvents.Mark:
        return tile => tile.markTile();
      default: return () => { };
    }
  }

  revealTile(tile) {
    if (tile.isOpened()) {
      return;
    }

    if (tile.hasBomb) {
      this.isGameOver = true;

      this.gameGrid.revealAll();

      return;
    }

    if (tile.adjacentBombs) {
      tile.setOpened();

      return;
    }

    this.cascadeReveal(tile);
  }

  cascadeReveal(tile) {
    tile.setOpened();

    this.gameGrid.getAdjacentTiles(tile)
      .filter(adjacent => !adjacent.isOpened())
      .forEach(adjacent =>
        adjacent.isEmpty()
          ? this.cascadeReveal(adjacent)
          : adjacent.setOpened()
      );
  }

  revealAdjacent(tile) {
    const adjacentTiles = this.gameGrid.getAdjacentTiles(tile);

    const adjacentFlagged = adjacentTiles.filter(adjacent => adjacent.isFlagged());

    if (tile.adjacentBombs === adjacentFlagged.length) {
      adjacentTiles.forEach(adjacent => this.revealTile(adjacent));
    }
  }

  emitState(event) {
    this.emit(event, this.gameGrid.getState());
  }
}
