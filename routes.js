/*

Title: Routes
Description: Routing for the App
Author: Nazif Ishrak
Date: Jan 9, 2023

 */

//dependencies
const { sampleHandler } = require("./handlers/routeHandlers/handlerSample");
const { userHandler } = require("./handlers/routeHandlers/userHandler");
const {tokenHandler} = require("./handlers/routeHandlers/tokenHandler");
//Stores the mapping for which keyword should trigger which function
const routes = {
  test_sample: sampleHandler,
  user: userHandler,
  token: tokenHandler,
};

module.exports = routes;
