const radius = [3, 5, 8];

function calculateArea(radius) {
  const output = [];
  for (let rad of radius) {
    output.push(Math.floor(Math.PI * rad * rad));
  }

  return output;
}

function calculateCircumference(radius) {
  const output = [];
  for (let rad of radius) {
    output.push(Math.floor(2 * Math.PI * rad));
  }

  return output;
}

function calculateDiameter(radius) {
  const output = [];
  for (let rad of radius) {
    output.push(2 * rad);
  }

  return output;
}

console.log(`Area: [${calculateArea(radius)}]`);
console.log(`Circumference: [${calculateCircumference(radius)}]`);
console.log(`Diameter: [${calculateDiameter(radius)}]`);
