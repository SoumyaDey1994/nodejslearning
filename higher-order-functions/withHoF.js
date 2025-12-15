const radius = [3, 5, 8];

const area = (rad) => Math.PI * rad * rad;
const circumference = (rad) => 2 * Math.PI * rad;
const diameter = (rad) => 2 * rad;

function calculate(radius, logic) {
  const output = [];

  for (let rad of radius) {
    output.push(logic(rad));
  }

  return output;
}

console.log(`Area: [${calculate(radius, area)}]`);
console.log(`Circumference: [${calculate(radius, circumference)}]`);
console.log(`Diameter: [${calculate(radius, diameter)}]`);

Array.prototype.calcForCircle = (logic) => {
  const output = [];

  for (let radius of this) {
    output.push(logic(radius));
  }

  return output;
};

console.log(`\n...........Array method type execution..........\n`);

console.log(`Area: [${calculate(radius, area)}]`);
console.log(`Circumference: [${calculate(radius, circumference)}]`);
console.log(`Diameter: [${calculate(radius, diameter)}]`);
