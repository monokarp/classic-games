import './styles.css';

import { TileState } from '../../const/minesweeper/tile-state';

/* eslint-disable class-methods-use-this */
export class MinesweeperBrowserRenderer {
  constructor() {
    this.container = document.getElementById('gameFieldContainer');

    this.messageContainer = document.getElementById('message');
  }

  renderState(state) {
    this.messageContainer.innerText = '';

    for (const child of this.container.children) {
      child.remove();
    }

    state.forEach(row =>
      row.forEach(tile =>
        this.container.appendChild(
          this.createTileElement(tile)
        )));
  }

  renderGameLost(state) {
    this.renderState(state);

    this.messageContainer.innerText = 'gj!';
  }

  renderGameWon(state) {
    this.renderState(state);

    this.messageContainer.innerText = 'git gud';
  }

  createTileElement(tile) {
    const element = document.createElement('div');

    element.setAttribute('id', `${tile.location.x}_${tile.location.y}`);
    element.classList.add('minesweeper-tile');
    element.innerHTML = this.getTileInnerHTML(tile);

    return element;
  }

  getTileInnerHTML(tile) {
    switch (tile.state) {
      case TileState.Flagged: return 'F';

      case TileState.Opened:
        return tile.hasBomb
          ? '*'
          : tile.adjacentBombs
            ? tile.adjacentBombs.toString()
            : '';

      case TileState.Concealed:
      default: return '';
    }
  }
}
