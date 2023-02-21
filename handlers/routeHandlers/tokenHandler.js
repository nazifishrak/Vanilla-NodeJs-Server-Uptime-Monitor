/*

Title: Token Handler
Description: Handler to handle token related routes
Author: Nazif Ishrak
Date: Jan 21,2023

 */

//dependencies

const data = require("../../lib/data");
// const { hash } = require("../../helpers/utilities");
const { parseJSON } = require("../../helpers/utilities");
//module scaffolding
const handle = {};

handle.tokenHandler = (reqProp, callback) => {
  const methods = ["get", "post", "put", "delete"];
  if (methods.indexOf(reqProp.method.toLowerCase()) > -1) {
    handle._token[reqProp.method.toLowerCase()](reqProp, callback);
  } else {
    callback(405);
  }
};
handle._token = {};

//POST
handle._token.post = (reqProp, callback) => {

};

//GET
handle._token.get = (reqProp, callback) => {

};
//PUT
handle._token.put = (reqProp, callback) => {

};
//DEL
handle._token.delete = (reqProp, callback) => {
  
};

module.exports = handle;
