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

    element.style.color = this.getColor(tile);

    element.classList.add(...this.getClassList(tile));

    element.innerHTML = this.getTileInnerHTML(tile);

    return element;
  }

  getTileInnerHTML(tile) {
    switch (tile.state) {
      case TileState.Flagged: return '&#10071';

      case TileState.Opened:
        return tile.hasBomb
          ? '&#128163'
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

  getClassList(tile) {
    const classList = ['minesweeper-tile', 'flex-container'];

    if (tile.state === TileState.Opened && !tile.hasBomb && !tile.adjacentBombs) {
      classList.push('empty-tile');
    }

    if (tile.state === TileState.Opened && tile.hasBomb) {
      classList.push('bomb-tile', 'flex-container');
    }

    return classList;
  }

  getColor(tile) {
    switch (tile.adjacentBombs) {
      case 1: return '#0000ff';
      case 2: return '#009900';
      case 3: return '#ff3300';
      case 4: return '#ff9900';
      case 5: return '#cc0099';
      case 6: return '#3333ff';
      case 7: return '#ffffff';
      case 8: return '#cc3300';
      default: return '#000000';
    }
  }
}
