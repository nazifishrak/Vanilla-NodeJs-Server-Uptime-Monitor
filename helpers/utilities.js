/*

Title: Utilities
Description: Relevant utility functions
Author: Nazif Ishrak
Date: Jan 10, 2023

 */

//dependencies

const crypto = require("node:crypto");
const environemnt = require("./environment");

const utilities = {};
//parses JSON string to Object

/**
 *
 * @param {string} jsonStr
 * @returns {object}
 */
utilities.parseJSON = (jsonStr) => {
  let output;
  try {
    output = JSON.parse(jsonStr);
  } catch {
    output = {};
  }
  return output;
};

//Hashes a string
utilities.hash = (str) => {
  if (typeof str === "string" && str.length > 0) {
    let hash = crypto
      .createHmac("sha256", environemnt.secretKey)
      .update(str)
      .digest("hex");

    return hash;
  } else {
    return false;
  }
};

//Creates and retunrs a random string
utilities.createRandomString = (str_len) => {
  let length = typeof str_len === "number" && str_len > 0 ? str_len : false;

  if (length) {
    //raw random string generator
    let possibleChars = "abcdefghijklmnopqrstuvwxyz1234567890";
    let output ='';
    for (let i = 0; i < str_len; i++) {
      let random = Math.floor(Math.random() * possibleChars.length);
      let randomCharachter = possibleChars.charAt(random);
      output+=randomCharachter;
    }
    return output;
  }
};

module.exports = utilities;
