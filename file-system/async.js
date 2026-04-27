const fs = require("node:fs");
const https = require("node:https");
const stream = require("node:stream");

console.log("====Hello World====");

const a = 13343243;
const b = 86857923;

fs.readFile('./file.txt', 'utf8', (err, data) => {
    console.log("File data fetched successfully ");
    console.log("File data located in buffer: ", Buffer.isBuffer(data));
});

const readStream = fs.createReadStream('./fileStream.txt');
readStream.on('data', function(chunk){
    console.log('File 2 data chunk read');
    console.log("File 2 data located in buffer: ", Buffer.isBuffer(chunk));
 });

https.get('https://dummyjson.com/products', (res) => {
    console.log("Product details fetched....");

    let productDetails = '';
    let firstChunk = null;
    res.on('data', (data) => {
        productDetails +=data;
        if (!firstChunk) {
            firstChunk = data;
            console.log("First chunk of response: ", firstChunk.toString());
            console.log("Http Response data located in buffer: ", Buffer.isBuffer(data));
        }
    })

    res.on('end', () => {
        // console.log("Products: ", productDetails);
        console.log("Product details stream completed....");
    })
})

setTimeout(() => {
    console.log("1 sec expired");
}, 1000);

function multiply(x, y) {
    return x * y;
}

const result = multiply(a, b);
console.log("Multiplicaton Result: ", result);
