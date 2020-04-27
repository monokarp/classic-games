import { TileGrid } from "../../types/common/game-field";
import { MinesweeperTile } from "../../types/minesweeper/game-tile";
import { EventEmitter } from "../../utils/event-emitter";
import { GameEvents } from "../../const/common/game-events";
import { MinesweeperEvents } from "../../const/minesweeper/events";
import { TileState } from "../../const/minesweeper/tile-state";
import { GridSize } from "../../const/minesweeper/grid-size";
import { cloneDeep } from "lodash";

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

    this.emitState(GameEvents.StateChanged);
  }

  seedBombs(point) {
    let bombAmount = Math.floor(this.gameState.getTilesAmount() / mine_ratio);

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
    this.gameState.forEachTile(tile =>
      tile.adjacentBombs = this.gameState.getAdjacentTiles(tile)
        .filter(tile => tile.hasBomb)
        .length
    );
  }

  handleAction({ type, point }) {
    const tile = this.gameState.get(point);

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

      this.gameState.forEachTile(tile => tile.setOpened());

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

  emitState(event){
    this.emit(event, cloneDeep(this.gameState));
  }
}