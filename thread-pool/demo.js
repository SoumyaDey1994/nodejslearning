const crypto = require("node:crypto");

/**
 * 4 key response will appear together as libuv using all its 4 threads
 * 5th key generation response will happen little late
 * If process.env.UV_THREADPOOL_SIZE is altered, then response arrival time will vary accordingly
 */

process.env.UV_THREADPOOL_SIZE = 2;

crypto.pbkdf2("skdpassword120956", "skdsalt", 4000000, 24, 'sha512', (err, key) => {
    console.log("Key1 Generated: ");
    console.log("Is Key in Buffer: ", Buffer.isBuffer(key));
});

crypto.pbkdf2("skdpassword73568", "skdsalt", 4000000, 24, 'sha512', (err, key) => {
    console.log("Key2 Generated: ");
});

crypto.pbkdf2("skdpassword34343", "skdsalt", 4000000, 24, 'sha512', (err, key) => {
    console.log("Key3 Generated: ");
});

crypto.pbkdf2("skdpassword0099112", "skdsalt", 4000000, 24, 'sha512', (err, key) => {
    console.log("Key4 Generated: ");
});

crypto.pbkdf2("skdpassword682891", "skdsalt", 4000000, 24, 'sha512', (err, key) => {
    console.log("Key5 Generated: ");
});

console.log("End of program");