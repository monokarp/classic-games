import './minesweeper.css';

import { TileState } from '../../const/minesweeper/tile-state';

const template =
  `<div id="container" class="flex-container ui-container">
    <div id="start" class="start-button flex-container">Start</div>
    <div id="gridContainer" class="minesweeper-grid-container"></div>
    <div id="message" class="message-container"></div>
  </div>`;

/* eslint-disable class-methods-use-this */
export class MinesweeperBrowserRenderer {
  constructor(hostElementId) {
    document.getElementById(hostElementId).innerHTML = template;

    this.gameField = document.getElementById('gridContainer');
    this.messageContainer = document.getElementById('message');
    this.startButton = document.getElementById('start');
  }

  renderState(state) {
    this.hideStartButton();

    this.renderGrid(state);
  }

  renderGameLost(state) {
    this.messageContainer.innerText = 'git gud';

    this.showStartButton();

    this.renderGrid(state);
  }

  renderGameWon(state) {
    this.messageContainer.innerText = 'gj!';

    this.showStartButton();

    this.renderGrid(state);
  }

  renderGrid(state) {
    this.messageContainer.innerText = '';

    this.gameField.innerHTML = '';

    state.forEach(row =>
      this.gameField.appendChild(this.createRowElement(row))
    );
  }

  hideStartButton() {
    this.startButton.style.display = 'none';
  }

  showStartButton() {
    this.startButton.style.display = 'flex';
  }

  createRowElement(row) {
    const rowElement = document.createElement('div');

    rowElement.classList.add('flex-row');

    row.forEach(tile =>
      rowElement.appendChild(
        this.createTileElement(tile)
      )
    );

    return rowElement;
  }

  createTileElement(tile) {
    const element = document.createElement('div');

    element.setAttribute('id', `${tile.location.x}_${tile.location.y}`);

    element.style.color = this.getFontColor(tile);

    element.classList.add(...this.getClassList(tile));

    element.style.fontSize = this.getFontSize(tile);

    element.innerHTML = this.getTileInnerHTML(tile);

    return element;
  }

  getTileInnerHTML(tile) {
    switch (tile.state) {
      case TileState.Flagged: return '&#128681';

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

  getFontSize(tile) {
    if (tile.hasBomb || tile.state === TileState.Flagged) {
      return '20px';
    }

    if (tile.adjacentBombs) {
      return '25px';
    }

    return '0px';
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

  getFontColor(tile) {
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
