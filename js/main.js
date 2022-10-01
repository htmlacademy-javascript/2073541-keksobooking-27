function getRandomInt(min, max) {
  if (max < 0 || min < 0) {
    return NaN;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// источник https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
getRandomInt(1, 5);

function getRandomFloat(min, max, decimals) {
  if (min < 0 || max < 0 || decimals < 0) {
    return NaN;
  }
  const result = Math.random() * (max - min) + min;
  return Number(result.toFixed(decimals));
}
getRandomFloat(0, 5, 2);
