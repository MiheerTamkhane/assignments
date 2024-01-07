const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "clean.txt");

fs.readFile(filePath, "utf-8", (err, data) => {
  console.log(data);
  let updatedString = data.split(" ").filter(Boolean).join(" ");
  console.log(updatedString);
  fs.writeFile(filePath, updatedString, "utf-8", () => {});
});
