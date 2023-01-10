/* 
Title: Vanilla Node Server Uptime Monitor Application
Description: A REST API THAT WILL MONITOR UP/DOWN time of url/links
Author: Nazif Ishrak
Date: January 8, 2023
*/

// dependencies
const http = require("node:http");

const { reqResHandler } = require("./helpers/reqRespHandler");
const environments = require("./helpers/environment");
const data = require("./lib/data");


//scaffolded module {app obj}
const app = {};

// @TODO
//testing file system
/*
data.create("test", "new_file", { name: "Nazif Ishrak", age: 21 }, (err) =>
  console.log("error was" + err)
);
*/
app.reqResHandler = reqResHandler;
//create a server

app.createServer = () => {
  const server = http.createServer(app.reqResHandler);

  server.listen(environments.port, () => {
    console.log(`listening to port ${environments.port}`);
  });
};

app.createServer();
