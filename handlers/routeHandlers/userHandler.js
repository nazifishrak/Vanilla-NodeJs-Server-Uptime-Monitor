/*

Title: User Handler
Description: Handler to handle user related routes
Author: Nazif Ishrak
Date: Jan 10,2023

 */

//dependencies

const data = require("../../lib/data");
const { hash } = require("../../helpers/utilities");
//module scaffolding
const handle = {};

handle.userHandler = (reqProp, callback) => {
  const methods = ["get", "post", "put", "delete"];
  if (methods.indexOf(reqProp.method.toLowerCase()) > -1) {
    handle._users[reqProp.method.toLowerCase()](reqProp, callback);
  } else {
    callback(405);
  }
};
handle._users = {};

//POST
handle._users.post = (reqProp, callback) => {
  const fName = reqProp.body.firstName;
  const lName = reqProp.body.lastName;
  const phone_num = reqProp.body.phone;
  const pass = reqProp.body.password;

  const firstName =
    typeof fName === "string" && fName.trim().length > 0 ? fName : false;

  const lastName =
    typeof lName === "string" && lName.trim().length > 0 ? lName : false;

  const phone =
    typeof phone_num === "string" && phone_num.trim().length === 11
      ? phone_num
      : false;

  const password =
    typeof pass === "string" && pass.trim().length > 0 ? pass : false;

  if (firstName && lastName && phone && password) {
    //Check if that user does not already exist
    data.read("users", phone, (err, user) => {
      //if theere is err then it means the user does not exist, so we add
      if (err) {
        let userObject = {
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          password: hash(password),
        };
      } else {
        callback(500, {
          error: "A user already exists with the same phone number",
        });
      }
    });
  } else {
    callback(400, {
      error: "You have a problem in your request",
    });
  }
};

//GET
handle._users.get = (reqProp, callback) => {
  callback(200);
};
//PUT
handle._users.put = (reqProp, callback) => {};
//DEL
handle._users.delete = (reqProp, callback) => {};

module.exports = handle;
