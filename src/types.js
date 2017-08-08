export const All = x => ({
  x,
  concat: ({ x: y, }) => All(x && y),
  fold: f => f(x),
});

All.empty = () => All(true);

export const Left = x => ({
  fold: (f, g) => f(x),
});

export const Right = x => ({
  fold: (f, g) => g(x),
});
