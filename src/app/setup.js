import { GameEvents } from './const/common/game-events';
import { createEngine } from './engine/create-engine';
import { createInputController } from './input-controller/create-input-controller';
import { createRenderer } from './renderer/create-renderer';

export function setup(gameType) {
  const inputController = createInputController(gameType);
  const engine = createEngine(gameType);
  const renderer = createRenderer(gameType);

  inputController.onStart(engine.initGameState);

  inputController.onPlayerAction(engine.processAction);

  engine.addListener(GameEvents.StateChanged, renderer.renderState);

  engine.addListener(GameEvents.GameLost, renderer.renderGameOver);
}
