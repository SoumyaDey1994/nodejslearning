const fs = require("fs");

console.log("====Hello World====");

const a = 133432;
const b = 868579;

const fileData = fs.readFileSync('./file.txt', 'utf8');
console.log("File data: ", fileData);

function multiply(x, y) {
    return x * y;
}

const result = multiply(a, b);
console.log("Multiplicaton Result: ", result);
