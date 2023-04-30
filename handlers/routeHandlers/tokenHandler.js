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
const { createRandomString } = require("../../helpers/utilities");
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
          error: "Password is not valid",
        });
      }
    });
  }
};

//GET
handle._token.get = (reqProp, callback) => {
  //check if the id  is valid

  const idProp = reqProp.queryStringObj.id;
  const id =
    typeof idProp === "string" && idProp.trim().length === 20 ? idProp : false;
  if (id) {
    // Lookup the token
    data.read("tokens", id, (err, token_data) => {
      //spread operator on parsed object does deep copy when assigned
      const token = { ...parseJSON(token_data) };
      if (!err && token) {
        callback(200, token);
      } else {
        callback(404, { error: "requested token was not found" });
      }
    });
  } else {
    callback(404, { error: "requested token was not found" });
  }
};
//PUT: Update the token by extending the expiry time i.e refreshing the token
handle._token.put = (reqProp, callback) => {
  const idProp = reqProp.body.id;

  const id =
    typeof idProp === "string" && idProp.trim().length === 20 ? idProp : false;

  const extendProp = reqProp.body.extend;

  const extend =
    typeof extendProp === "boolean" && extendProp === true ? extendProp : false;

  if (id && extend) {
    data.read("tokens", id, (err, tokenData) => {

      let tokenObj = parseJSON(tokenData);
      if (tokenObj.expires > Date.now()) {
        tokenObj.expires = Date.now()+60*10*1000;
        //storing updated token
        data.update('tokens', id, tokenObj, (err2)=>{
          if (!err2){
            callback(200);
          } else{
            callback(500, {
              error: "There was a server side error"
            })
          }
        })


      } else {
        callback(400, {
          error: "token already expired",
        });
      }
    });
  } else {
    callback(400, {
      error: "There was a problem in your req from token.put",
    });
  }
};
//DEL
handle._token.delete = (reqProp, callback) => {  const idProp = reqProp.queryStringObj.id;
  const id =
    typeof idProp === "string" && idProp.trim().length === 20
      ? idProp
      : false;

  if (id) {
    //lookup the file with the given phone number

    data.read("tokens", id, (err, tokenData) => {
      if (!err && tokenData) {
        data.delete("tokens", id, (err) => {
          if (!err) {
            callback(200, { message: "Deletion of token successful" });
          } else {
            callback(500, {
              error: "There was an error while deleting (check nested)",
            });
          }
        });
      } else {
        callback(500, { error: "There was a server side error" });
      }
    });
  } else {
    callback(400, { error: "There was a problem in your delete request" });
  }
};

module.exports = handle;
