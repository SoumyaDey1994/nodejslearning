/**
 * Idea is to check callback is Synchronous or not
 */
const cb = () => {
    console.log(`I'm a callback, executing in Sync`);
}

console.log(`Start of Program`);

function execute(data, callback) {
    console.log("Data is: ", data);
    console.log(`Callback execution begins`);
    callback();
    console.log(`Callback execution ends`);
}

execute(10, cb);

console.log(`End of Program`);
