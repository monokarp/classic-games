import { TileGrid } from "../../types/common/game-field";
import { MinesweeperTile } from "../../types/minesweeper/game-tile";
import { EventEmitter } from "../../utils/event-emitter";
import { GameEvents } from "../../const/common/game-events";
import { MinesweeperEvents } from "../../const/minesweeper/events";
import { TileState } from "../../const/minesweeper/tile-state";
import { GridSize } from "../../const/minesweeper/grid-size";

const mine_ratio = 4.85;

export class MinesweeperEngine extends EventEmitter {
  constructor() {
    super();

    // both should be injected
    this.gameState = new TileGrid(
      MinesweeperTile,
      GridSize.rows,
      GridSize.cols,
    );

    this.isGameOver = false;
  }

  initGameState(point) {
    this.seedBombs(point);

    this.setAdjacentBombCounts();

    this.emit(GameEvents.StateChanged, this.gameState);
  }

  seedBombs(point) {
    let bombAmount = this.gameState.getTilesAmount() / mine_ratio;

    while (bombAmount) {
      const tile = this.gameState.getRandomTile();

      if (
        !tile.locatedOn(point)
        && !tile.hasBomb
      ) {
        tile.hasBomb = true;
        bombAmount--;
      }
    }
  }

  setAdjacentBombCounts() {
    this.gameState.forEachTile(location =>
      this.gameState.get(location).adjacentBombs = this.gameState.getAdjacentTiles(location)
        .filter(tile => tile.hasBomb)
        .length
    );
  }

  handleAction({ type, point }) {
    switch (type) {
      case MinesweeperEvents.Reveal: {
        this.revealTile(point);
        break;
      }
      case MinesweeperEvents.Mark: {
        this.markTile(point);
        break;
      }
      default: return;
    }

    this.isGameOver
      ? this.emit(GameEvents.StateChanged, this.gameState)
      : this.emit(GameEvents.GameOver);
  }

  revealTile(point) {

  }

  markTile(point) {
    const tile = this.gameState.get(point);

    switch (tile.state) {
      case TileState.Consealed: {
        tile.state = TileState.Flagged;
        return;
      }
      case TileState.Flagged: {
        tile.state = TileState.Marked;
        return;
      }
      case TileState.Marked: {
        tile.state = TileState.Consealed;
        return;
      }
      default: return;
    }
  }
}