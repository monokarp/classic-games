import { GridSize } from '../../const/minesweeper/grid-size';
import { MinesweeperTile } from '../../types/minesweeper/game-tile';
import { TileGrid } from '../../types/common/tile-grid';
import { cloneDeep } from 'lodash';

const mineRatio = 4.85;

export class MinesweeperGrid extends TileGrid {
  constructor() {
    super(
      MinesweeperTile,
      GridSize.rows,
      GridSize.cols
    );
  }

  init(point) {
    this.seedBombs(point);

    this.setAdjacentBombCounts();
  }

  getState() {
    return cloneDeep(this.state);
  }

  seedBombs(point) {
    let bombAmount = Math.floor((GridSize.cols * GridSize.rows) / mineRatio);

    const allLocations = [];

    this.forEachTile(tile => allLocations.push(tile));

    while (bombAmount) {
      const tile = allLocations.splice(Math.floor(Math.random() * allLocations.length), 1)[0];

      if (!tile.locatedOn(point)) {
        tile.hasBomb = true;
        bombAmount--;
      }
    }
  }

  setAdjacentBombCounts() {
    this.forEachTile(tile => {
      const count = this.getAdjacentTiles(tile)
        .filter(adjacent => adjacent.hasBomb)
        .length;

      tile.setAdjacent(count);
    });
  }

  revealAll() {
    this.forEachTile(tile => tile.setOpened());
  }
}
