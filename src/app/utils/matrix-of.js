import { GridSize } from '../const/battleships/grid-size.js';

export function matrixOf(ctor, rowCount, colCount) {
  return Array.from(Array(colCount),
    (v, col) =>
      Array.from(Array(rowCount),
        (v, row) =>
          new ctor(col, row)
      )
  );
};
