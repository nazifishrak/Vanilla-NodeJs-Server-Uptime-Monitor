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


//scaffolded module {app obj}
const app = {};


app.reqResHandler = reqResHandler;
//create a server

app.createServer = () => {
  const server = http.createServer(app.reqResHandler);

  server.listen(environments.port, () => {
    console.log(`listening to port ${environments.port}`);
  });
};

app.createServer();
