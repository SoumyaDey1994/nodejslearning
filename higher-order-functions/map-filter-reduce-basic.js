const elements = [15, 11, 4, 9, 10];

function getBinary(element) {
  let result = 0;
  while (element > 0) {
    const rem = element % 2;
    result = result * 10 + rem;
    element = Math.floor(element / 2);
  }

  return result;
}
// Use of map()
const binaryOutput = elements.map((element) => getBinary(element));
console.log(`Binary Representation: [${binaryOutput}]`);

// Use of filter()
const evenValues = elements.filter((element) => element % 2 === 0);
console.log(`Even values: [${evenValues}]`);

// Use of reduce()
const maxValue = elements.reduce((max, curr) => {
  if (curr > max) {
    max = curr;
  }

  return max;
}, -Infinity);
console.log(`Max value: ${maxValue}`);
