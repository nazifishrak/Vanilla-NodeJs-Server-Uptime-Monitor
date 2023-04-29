/*

Title: Token Handler
Description: Handler to handle token related routes
Author: Nazif Ishrak
Date: Jan 21,2023

 */

//dependencies

const data = require("../../lib/data");
const { hash } = require("../../helpers/utilities");
const { parseJSON } = require("../../helpers/utilities");
const {createRandomString} = require("../../helpers/utilities")
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
  const phone_num = reqProp.body.phone;
  const pass = reqProp.body.password;
  const phone =
    typeof phone_num === "string" && phone_num.trim().length === 11
      ? phone_num
      : false;

  const password =
    typeof pass === "string" && pass.trim().length > 0 ? pass : false;

  if (phone && password) {
    //Check if that user does not already exist
    data.read("users", phone, (err1, userData) => {
      //if theere is err then it means the user does not exist, so we add
      let hashedPassword = hash(password);
      if (hashedPassword === parseJSON(userData).password) {
        //Generate a random token for the user
        let tokenId = createRandomString(20);
        console.log(tokenId);
        //currrent time + 1 hr in ms
        let expires = Date.now() + 60 * 60 * 1000;

        let tokenObject = {
          phone: phone,
          id: tokenId,
          expires: expires,
        };

        // storing token in data base
        //use data librar functions
        data.create("tokens", tokenId, tokenObject, (err2) => {
          if (!err2) {
            callback(200, tokenObject);
          } else {
            
            callback(500, { error: "There was a problem in server side." });
          }
        });
      } else {
        callback(400, {
          error: "Password is not valid"
        })
      }
    });
  }
};

//GET
handle._token.get = (reqProp, callback) => {};
//PUT
handle._token.put = (reqProp, callback) => {};
//DEL
handle._token.delete = (reqProp, callback) => {};

module.exports = handle;
