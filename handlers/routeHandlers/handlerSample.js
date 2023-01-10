/*

Title: Sample Handler
Description: Sample Handler
Author: Nazif Ishrak
Date: Jan 9 2023

 */

//module scaffolding
const handle = {};

handle.sampleHandler = (reqProp, callback) => {
  console.log(reqProp);
  callback(200, {
    message: "test URL",
  });
};

module.exports = handle;
