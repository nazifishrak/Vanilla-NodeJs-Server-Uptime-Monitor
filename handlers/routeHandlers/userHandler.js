/*

Title: User Handler
Description: Handler to handle user related routes
Author: Nazif Ishrak
Date: Jan 10,2023

 */

//dependencies

const data = require("../../lib/data");
const { hash } = require("../../helpers/utilities");
const { parseJSON } = require("../../helpers/utilities");
const tokenHandler=require('./tokenHandler')
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

        data.create("users", phone, userObject, (err) => {
          if (!err) {
            callback(200, {
              message: "User was created successfully",
            });
          } else {
            callback(500, { error: "Could not create user" });
          }
        });
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

  
  //check if the phone number is valid

  const phone_num = reqProp.queryStringObj.phone;
  const phone =
    typeof phone_num === "string" && phone_num.trim().length === 11
      ? phone_num
      : false;
  if (phone) {
//verify token
let token = typeof(reqProp.headersObject.token) ==='string'? reqProp.headersObject.token: false;

tokenHandler._token.verifyToken(token, phone, (tokenId)=>{
if(tokenId){
    // Lookup the user
    data.read("users", phone, (err, user) => {
      if (!err && user) {
        //spread operator on parsed object does deep copy when assigned
        const temp_user = { ...parseJSON(user) };
        delete temp_user.password;
        callback(200, temp_user);
      } else {
        callback(404);
      }
    });
} else{
  callback(403, {
    error: "User authentication failed"
  })
}
})
/////////////
  } else {
    callback(404, { error: "requested user was not found" });
  }
};
//PUT
handle._users.put = (reqProp, callback) => {
  const fName = reqProp.body.firstName;
  const lName = reqProp.body.lastName;
  const phone_num = reqProp.body.phone;
  const pass = reqProp.body.password;

  const firstName =
    typeof fName === "string" && fName.trim().length > 0 ? fName : false;

  const lastName =
    typeof lName === "string" && lName.trim().length > 0 ? lName : false;

  const password =
    typeof pass === "string" && pass.trim().length > 0 ? pass : false;

  const phone =
    typeof phone_num === "string" && phone_num.trim().length === 11
      ? phone_num
      : false;

  if (phone) {
    if (firstName || lastName || password) {
      //look up the user and check if it exists
      data.read("users", phone, (error, udata) => {
        const user = { ...parseJSON(udata) };
        if (!error && user) {
          if (firstName) {
            user.firstName = firstName;
          }
          if (lastName) {
            user.lastName = lastName;
          }
          if (password) {
            user.password = hash(password);
          }

          //store to filesystem/database
          data.update("users", phone, user, (err) => {
            if (!err) {
              callback(200, { message: "User was updated successfully" });
            } else {
              callback(500, {
                error: "There was a problem in the server side",
              });
            }
          });
        } else {
          callback(400, {
            error: "You have a problem in your reuqest",
          });
        }
      });
    } else {
      callback(400, { error: "you have problem in your request" });
    }
  } else {
    callback(400, { error: "invalid phone number please try again." });
  }
};
//DEL
handle._users.delete = (reqProp, callback) => {
  const phone_num = reqProp.queryStringObj.phone;
  const phone =
    typeof phone_num === "string" && phone_num.trim().length === 11
      ? phone_num
      : false;

  if (phone) {
    //lookup the file with the given phone number

    data.read("users", phone, (err, udata) => {
      if (!err && udata) {
        data.delete("users", phone, (err) => {
          if (!err) {
            callback(200, { message: "Deletion of user successful" });
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
