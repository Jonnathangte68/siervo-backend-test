module.exports.printErrorMessage = function(msg, type = null, ...args) {
  const clc = require("cli-color");
  const error = clc.red.bold;
  const warn = clc.yellow;
  const notice = clc.blue;
  switch (type) {
    case 0:
      console.log(warn(msg), ...args);
      break;
    case 1:
      console.log(notice(msg), ...args);
      break;
    default:
      console.log(error(msg), ...args);
      break;
  }
  return 1;
};

// function printSeparatorLine() {
//   let line = "*";
//   for (let j = 0; j < 30; j++) {
//     line += "-";
//   }
//   line += "*";
//   printMessage(line);
// }

module.exports.printMessage = function(msg, ...args) {
  console.log(msg, ...args);
};
