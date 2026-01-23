/**
 * Here a logger() method build in 3 steps, first 2 steps returns a function & final step returns the log msg
 * base method accepts the module name & returns a method which accepts msg level as param
 * final method accepts the msg, combines module+leve+msg with Date-time & returns the consolidated string
 * @param {*} module
 * @returns
 */
function logger(module) {
  return function (level) {
    return function (msg) {
      return `${new Date().toISOString()} [${module}] [${level}] ${msg}`;
    };
  };
}

const authLogger = logger("AUTH");

console.log(authLogger("Error")("401 - Unable to identify user"));
console.log(
  authLogger("Error")("403 - User is not allowed to perform this operation"),
);
console.log(authLogger("Info")("200 - User logged-in successfully"));
