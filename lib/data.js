//dependencies

const fs = require("node:fs");
const path = require("node:path");
//module scaffolding
const lib = {};

//base directory of data folder
lib.baseDir = path.join(__dirname, "/../.data/");

//write data to file
lib.create = (dir, file, data, callback) => {
  //open file for writing
  fs.open(
    lib.baseDir + dir + "/" + file + ".json",
    "wx",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        //convert data to str
        const strData = JSON.stringify(data);

        //write data to file and then close
        fs.writeFile(fileDescriptor, strData, (err) => {
          if (!err) {
            fs.close(fileDescriptor, (err) => {
              if (!err) {
                callback(false);
              } else {
                callback("Error closing the new file");
              }
            });
          } else {
            callback("Error writing to new file");
          }
        });
      } else {
        callback("Could not create new file, it may already exist");
      }
    }
  );
};

module.exports = lib;
