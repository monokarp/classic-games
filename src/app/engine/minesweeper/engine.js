import { EventEmitter } from '../../utils/event-emitter';
import { GameEvents } from '../../const/common/game-events';
import { MinesweeperEvents } from '../../const/minesweeper/events';

export class MinesweeperEngine extends EventEmitter {
  constructor(gameGrid) {
    super();

    this.gameGrid = gameGrid;
  }

  setDefaultState() {
    this.gameGrid.resetState();

    this.isGameOver = false;

    this.isInitialized = false;

    this.emitState(GameEvents.StateChanged);
  }

  processAction({ type, point }) {
    if (!this.isInitialized) {
      this.gameGrid.init(point);

      this.isInitialized = true;
    }

    const tile = this.gameGrid.get(point);

    this.getActionHandler(type)(tile);

    if (this.isGameOver) {
      this.emitState(GameEvents.GameLost);

      this.clearListeners();

      return;
    }

    this.emitState(
      this.gameGrid.concealedTilesCount
        ? GameEvents.StateChanged
        : GameEvents.GameWon
    );
  }

  getActionHandler(type) {
    switch (type) {
      case MinesweeperEvents.Reveal:
        return tile => this.revealTile(tile);
      case MinesweeperEvents.BatchReveal:
        return tile => this.batchRevealTile(tile);
      case MinesweeperEvents.Flag:
        return tile => tile.toggleFlag();
      default: return () => { };
    }
  }

  revealTile(tile) {
    if (!tile.isConcealed()) { return; }

    if (tile.hasBomb) {
      this.isGameOver = true;

      this.gameGrid.revealAll();

      return;
    }

    this.gameGrid.revealOne(tile);

    if (!tile.adjacentBombs) {
      this.gameGrid.getAdjacentTiles(tile)
        .filter(adjacent => adjacent.isConcealed())
        .forEach(adjacent => this.revealTile(adjacent));
    }
  }

  batchRevealTile(tile) {
    const adjacentTiles = this.gameGrid.getAdjacentTiles(tile);

    const adjacentFlagged = adjacentTiles.filter(adjacent => adjacent.isFlagged());

    if (tile.adjacentBombs === adjacentFlagged.length) {
      adjacentTiles.forEach(adjacent => {
        if (adjacent.hasBomb && adjacent.isFlagged()) {
          return;
        }

        this.revealTile(adjacent);
      });
    }
  }

  emitState(event) {
    this.emit(event, this.gameGrid.getState());
  }
}
