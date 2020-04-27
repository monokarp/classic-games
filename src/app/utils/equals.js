export const equalsShallow = (obj, other) =>
  Object.keys(obj).every(key =>
    !!other[key]
    && obj[key] === other[key]
  );
