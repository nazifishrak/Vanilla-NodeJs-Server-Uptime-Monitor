/* 
Title: Handles Request Response
Author: Nazif Ishrak
Date: January 9, 2023
*/
//dependencies
const url = require("node:url");
const { StringDecoder } = require("node:string_decoder");
const routes = require("../routes");
const {
  notFoundHandler,
} = require("../handlers/routeHandlers/notFoundHandler");
//module scaffolding
const handler = {};

handler.reqResHandler = (req, res) => {
  //req handler
  //get and parse url
  const urlLink = req.url; //URL from the req obj
  const parsedUrl = url.parse(urlLink, true); //true: includes the query str too
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, ""); //REGEX that removes / from the front and back of the path
  const method = req.method.toLowerCase(); //returns the type of req i.e GET POST etc
  const queryStringObj = parsedUrl.query;
  const headersObject = req.headers;

  const reqProp = {
    urlLink,
    parsedUrl,
    path,
    trimmedPath,
    method,
    queryStringObj,
    headersObject,
  };

  const decoder = new StringDecoder("utf-8");

  let realTimeData = "";

  //checks if the trimmed path is in our routes else notFoundHandler is selected
  //selected handler is a function from one of the route modules
  const selectedHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;

  selectedHandler(reqProp, (statusCode, payload) => {
    //Guarding types 
    statusCode = typeof statusCode === "number" ? statusCode : 500;
    payload = typeof payload === "object" ? payload : {};
    //payload needs to be sent as an string JSON, so used stringify
    payloadstr = JSON.stringify(payload);

    res.writeHead(statusCode);
    res.write(payloadstr);
    res.end();
  });
  req.on("data", (buffer) => {
    realTimeData += decoder.write(buffer);
  });

  req.on("end", () => {
    realTimeData += decoder.end();
    //resp handler
    console.log(realTimeData); // after the event ends we will get the full data
    res.end("hello " + realTimeData);
  });
};

module.exports = handler;
