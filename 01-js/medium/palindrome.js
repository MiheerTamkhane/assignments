/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  if (str === "") {
    return true;
  }
  let cleanStr = str.replace(/[^\w]/g, "").toLowerCase();
  if (!str) {
    return false;
  }
  return cleanStr === cleanStr.split("").reverse().join("");
}

module.exports = isPalindrome;
