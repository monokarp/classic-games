import { GameEvents } from '../common/game-events';

export const MinesweeperEvents = {
  ...GameEvents,
  Start: 'game_start',
  Reveal: 'reveal_tile',
  RevealAdjacent: 'reveal_adjacent',
  Mark: 'mark_tile',
};
