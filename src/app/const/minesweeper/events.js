import { GameEvents } from "../common/game-events";

export class MinesweeperEvents extends GameEvents {
  static Start = 'game_start';
  static Reveal = 'reveal_tile';
  static Mark = 'mark_tile';
}