const users = [
  { firstName: "Soumya", lastName: "Dey", age: 31 },
  { firstName: "Saikot", lastName: "Basak", age: 34 },
  { firstName: "Sagar", lastName: "B", age: 23 },
  { firstName: "Karthik", lastName: "PB", age: 34 },
  { firstName: "Keshav", lastName: "Kumar", age: 35 },
  { firstName: "Pratyush", lastName: "P", age: 31 },
];

// Use of map()
const fullNames = users.map((user) => `${user.firstName} ${user.lastName}`);
console.log(`First names of users: [${fullNames}]`);

// Use of filter()
let usersOlderOrEquals34 = users
  .filter((user) => user.age >= 34)
  .map((user) => user.firstName);
console.log(
  `Users older than or equals 34 (using filter + map): [${usersOlderOrEquals34}]`
);

usersOlderOrEquals34 = users.reduce((acc, user) => {
  if (user.age >= 34) {
    acc.push(user.firstName);
  }
  return acc;
}, []);
console.log(
  `Users older than or equals 34 (using reduce): [${usersOlderOrEquals34}]`
);

// Use of reduce() ---> age frequency
const countOfUsersBySameAge = users.reduce((acc, currUser) => {
  acc.set(currUser.age, (acc.get(currUser.age) || 0) + 1);
  return acc;
}, new Map());

console.log(`Age frequency: `, countOfUsersBySameAge);
