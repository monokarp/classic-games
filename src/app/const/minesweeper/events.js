import { GameEvents } from '../common/game-events';

export const MinesweeperEvents = {
  ...GameEvents,
  Start: 'game_start',
  Reveal: 'reveal_tile',
  BatchReveal: 'batch_reveal_tile',
  Flag: 'flag_tile',
};
