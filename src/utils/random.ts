export const random = (_min?: number, _max: number = 0) => {
  if (_min === undefined) {
    return Math.random();
  }

  const min = Math.min(_min, _max);
  const max = Math.max(_min, _max);

  return min + Math.floor(Math.random() * (max + 1));
};
