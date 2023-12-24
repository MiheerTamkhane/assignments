const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "a.txt");
console.log("start");

fs.writeFile(filePath, "hello there 3324", "utf-8", () => {});

fs.readFile(filePath, "utf-8", function (err, data) {
  console.log("inside");
  console.log(data);
});

// let a = 0;
// for (let i = 0; i < 1000000000; i++) {
//   a = a + 1;
// }
console.log("end");
