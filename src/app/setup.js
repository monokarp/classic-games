import { GameEvents } from './const/common/game-events';
import { createEngine } from './engine/create-engine';
import { createInputController } from './input-controller/create-input-controller';
import { createRenderer } from './renderer/create-renderer';

export function setupApp(gameType, hostElementId) {
  const inputController = createInputController(gameType, hostElementId);
  const engine = createEngine(gameType);
  const renderer = createRenderer(gameType, hostElementId);

  inputController.onStart(() => engine.setDefaultState());

  inputController.onPlayerAction(action => engine.processAction(action));

  engine.addListener(GameEvents.StateChanged, state => renderer.renderState(state));

  engine.addListener(GameEvents.GameLost, state => renderer.renderGameLost(state));

  engine.addListener(GameEvents.GameWon, state => renderer.renderGameWon(state));
}
