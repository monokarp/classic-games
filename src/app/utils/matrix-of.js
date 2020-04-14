import { GridSize } from '../const/battleships/grid-size.js';

export function matrixOf(ctor) {
  return Array.from(Array(GridSize.cols),
    (v, col) =>
      Array.from(Array(GridSize.rows),
        (v, row) =>
          new ctor(col, row)
      )
  );
};
