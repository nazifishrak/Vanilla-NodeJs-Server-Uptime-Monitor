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
      .createHmac("sha256", environemnt[process.env.NODE_ENV].secretKey)
      .update(str)
      .digest("hex");

    return hash;
  } else{
    return false;
  }
};

module.exports = utilities;
