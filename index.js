/* 
Title: Vanilla Node Server Uptime Monitor Application
Description: A REST API THAT WILL MONITOR UP/DOWN time of url/links
Author: Nazif Ishrak
Date: January 8, 2023
*/

// dependencies
const http = require("node:http");
const url = require("node:url");
//scaffolded module {app obj}
const app = {};

//config
app.config = {
  port: 3000,
};

//create a server

app.createServer = () => {
  const server = http.createServer((req, res) => {
    //req handler
    //get and parse url
    const urlLink = req.url; //URL from the req obj
    const parsedUrl = url.parse(urlLink, true); //true: includes the query str too
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, ""); //REGEX that removes / from the front and back of the path
    const method = req.method.toLowerCase(); //returns the type of req i.e GET POST etc
    const queryStringObj = parsedUrl.query;
    const headersObject = req.headers;

    //resp handler
    res.end("Test");
  });

  server.listen(app.config.port, () => {
    console.log(`listening to port ${app.config.port}`);
  });
};

app.createServer();
