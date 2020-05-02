import { GameEvents } from './const/common/game-events';
import { createEngine } from './engine/create-engine';
import { createInputController } from './input-controller/create-input-controller';
import { createRenderer } from './renderer/create-renderer';

export function setup(gameType) {
  const inputController = createInputController(gameType);
  const engine = createEngine(gameType);
  const renderer = createRenderer(gameType);

  inputController.onStart(() => engine.setDefaultState());

  inputController.onPlayerAction(action => engine.processAction(action));

  engine.addListener(GameEvents.StateChanged, state => renderer.renderState(state));

  engine.addListener(GameEvents.GameLost, state => renderer.renderGameLost(state));

  engine.addListener(GameEvents.GameWon, state => renderer.renderGameWon(state));
}
