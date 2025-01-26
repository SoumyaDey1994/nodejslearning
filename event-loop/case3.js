const fs = require("fs");

console.log("Start of Program");

const a = 100;

setImmediate(() => console.log("setImmediate"));

setTimeout(() => console.log("Timer Expired"), 0);

Promise.resolve("Promise").then(console.log);

fs.readFile('./file.txt', 'utf8', (err, data) => {
    setTimeout(() => console.log("2nd Timer Expired"), 0);

    process.nextTick(() => console.log("2nd nextTick"));

    setImmediate(() => console.log("2nd setImmediate"));

    console.log("File Read Complete");
})

process.nextTick(() => console.log("nextTick"));

function printValue() {
    console.log("a=" , a);
}
printValue();

console.log("End of Program");

/**
 * Expected O/P
 * 
 * Start of Program
 * a=100
 * End of Program
 * nextTick
 * Promise
 * Timer Expired
 * setImmediate
 * File Read Complete
 * 2nd nextTick
 * 2nd setImmediate
 * 2nd Timer Expired
 */