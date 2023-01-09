/* 
Title: Vanilla Node Server Uptime Monitor Application
Description: A REST API THAT WILL MONITOR UP/DOWN time of url/links
Author: Nazif Ishrak
Date: January 8, 2023
*/

// dependencies
const http = require("node:http");

const { reqResHandler } = require("./helpers/reqRespHandler");
//scaffolded module {app obj}
const app = {};

//config
app.config = {
  port: 3000,
};


app.reqResHandler = reqResHandler;
//create a server

app.createServer = () => {
  const server = http.createServer(app.reqResHandler);

  server.listen(app.config.port, () => {
    console.log(`listening to port ${app.config.port}`);
  });
};

app.createServer();
