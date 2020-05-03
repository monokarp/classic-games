import './styles.css';

import { TileState } from '../../const/minesweeper/tile-state';

/* eslint-disable class-methods-use-this */
export class MinesweeperBrowserRenderer {
  constructor() {
    this.gameField = document.getElementById('gridContainer');

    this.messageContainer = document.getElementById('message');

    this.setContainerSize();
  }

  setContainerSize() {
    const container = document.getElementById('container');

    const { height, width } = this.getWindowDimensions();

    const px = (value) => `${value}px`;

    container.style.height = px(height);

    container.style.width = px(width);
  }

  renderState(state) {
    this.messageContainer.innerText = '';

    this.gameField.innerHTML = '';

    state.forEach(row =>
      row.forEach(tile =>
        this.gameField.appendChild(
          this.createTileElement(tile)
        )));
  }

  renderGameLost(state) {
    this.messageContainer.innerText = 'git gud';

    this.renderState(state);
  }

  renderGameWon(state) {
    this.messageContainer.innerText = 'gj!';

    this.renderState(state);
  }

  createTileElement(tile) {
    const element = document.createElement('div');

    element.setAttribute('id', `${tile.location.x}_${tile.location.y}`);
    element.classList.add('minesweeper-tile');

    if (tile.state === TileState.Opened && !tile.hasBomb && !tile.adjacentBombs) {
      element.classList.add('empty-tile');
    }
    if (tile.state === TileState.Opened && tile.hasBomb) {
      element.classList.add('bomb-tile');
    }


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

  getWindowDimensions() {
    return {
      width: window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth,
      height: window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight
    };
  }
}
