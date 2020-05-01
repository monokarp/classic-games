import { GameEvents } from '../common/game-events';

export const MinesweeperEvents = {
  ...GameEvents,
  Start: 'game_start',
  Reveal: 'reveal_tile',
  Mark: 'mark_tile',
}