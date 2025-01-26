const fs = require("fs");
const a = 100;

console.log("Start of Program");

setTimeout(() => console.log("Timer expired"), 0);

Promise.resolve("Promise").then(console.log);

fs.readFile('./file.txt', 'utf8', (err, data) => {
    console.log("File read complete");
})

const printValue = () => {
    console.log("Value = "+a);
}
printValue();

process.nextTick(() => console.log("nextTick"));

setImmediate(() => console.log("SetImmediate"));

console.log("End of Program");

/**
 * Expected O/P
 * Start of Program
 * Value = 100
 * End of Program
 * nextTick
 * Promise
 * Timer expired
 * SetImmediate
 * File read complete
 */