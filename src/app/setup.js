import { createEngine } from "./engine/create-engine";
import { createInputController } from "./input-controller/create-input-controller";
import { createRenderer } from "./renderer/create-renderer";

export function setup(gameType) {
  const inputController = createInputController(gameType);
  const engine = createEngine(gameType);
  const renderer = createRenderer(gameType);

  engine.onStateChange(renderer.renderState);

  inputController.onStart(engine.initGameState);

  inputController.onPlayerAction(engine.handleAction);

  engine.onGameOver(renderer.renderGameOver);
};