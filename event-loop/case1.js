const fs = require("fs");
const a = 100;

console.log("Start of Program");

setImmediate(() => console.log("SetImmediate"));

fs.readFile('./file.txt', 'utf8', (err, data) => {
    console.log("File read complete");
});

setTimeout(() => console.log("Timer expired"), 0);

const printValue = () => {
    console.log("Value = "+a);
}
printValue();

console.log("End of Program");

/**
 * Start of Program
 * Value = 100
 * End of Program
 * Timer expired
 * SetImmediate
 * File read complete
 */