function getRandomInt(min, max) {
  if (max < 0 || min < 0) {
    return NaN;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomInt(1, 5);

function getRandomFloat(min, max, decimals = 5) {
  if (min < 0 || max < 0 || decimals < 0) {
    return NaN;
  }
  const result = Math.random() * (max - min) + min;
  return Number(result.toFixed(decimals));
}
getRandomFloat(0, 5, 2);

function getRandomElement(elements) {
  const randomElement = Math.floor(Math.random() * elements.length);
  return elements[randomElement];
}

function getRandomArrayElements(array) {
  const shuffledArray = array.sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, getRandomInt(1, array.length));
}
export {
  getRandomInt,
  getRandomFloat,
  getRandomElement,
  getRandomArrayElements
};