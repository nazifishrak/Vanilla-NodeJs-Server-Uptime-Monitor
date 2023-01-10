/*

Title: Environment Variables
Description: Handle all environemnt variables
Author: Nazif Ishrak
Date: Jan 9 2023

 */

//module scaffolding
const environments = {};

environments.staging = {
  port: 3000,
  envName: "staging",
};

environments.production = {
  port: 5000,
  envName: "production",
};

//determine which environment was passed
const currentEnvironemnt =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

//export corresponding environment object
environmentToExport =
  typeof environments[currentEnvironemnt] === "object"
    ? environments[currentEnvironemnt]
    : environments.staging;

module.exports = environmentToExport;
