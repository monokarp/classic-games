import { TileGrid } from '../../types/common/tile-grid';
import { cloneDeep } from 'lodash';

const mineRatio = 4.85;

export class MinesweeperGrid extends TileGrid {
  init(point) {
    this.seedBombs(point);

    this.setAdjacentBombCounts();
  }

  getState() {
    return cloneDeep(this.state);
  }

  seedBombs(point) {
    let bombAmount = Math.floor((this.size.rowCount * this.size.colCount) / mineRatio);

    const tilesList = [];

    this.forEachTile(tile => tilesList.push(tile));

    while (bombAmount) {
      const randomIndex = Math.floor(Math.random() * tilesList.length);

      const tile = tilesList.splice(randomIndex, 1)[0];

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
