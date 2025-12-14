console.log(`Program Start`);

setTimeout(() => console.log("Initial Timer expires"), 5000);

console.log("\n.....SetTimeout with Closure.........");

console.log(`Using simple var`);
for (var a = 1; a <= 10; a++) {
  // Try printing 1-9 using inside setTimeout
  setTimeout(() => console.log(`a=${a}`), 1000);
}

console.log(`Using var with IIFE`);
for (var b = 1; b <= 10; b++) {
  // Print 1-9 using inside setTimeout
  (function (i) {
    setTimeout(() => console.log(`b=${i}`), 100);
  })(b);
}

console.log(`Using let`);
for (let c = 1; c <= 10; c++) {
  // Try printing 1-9 using inside setTimeout
  setTimeout(() => console.log(`c=${c}`));
}

console.log(`Program Ends\n`);
