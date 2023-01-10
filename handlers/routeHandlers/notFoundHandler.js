/*

Title: Not Found Handler
Description: 404 Handler
Author: Nazif Ishrak
Date: Jan 9 2023

 */

//module scaffolding
const handler = {};

handler.notFoundHandler = (reqProp, callback) => {
  callback(404, {
    message: "Requested url NOT found",
  });
};

module.exports = handler;
