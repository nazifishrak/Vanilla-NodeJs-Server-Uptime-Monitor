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

        //@TODO: Modify to eliminate the callback hell
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
        callback(`Could not create new file, it may already exist ${err}`);
      }
    }
  );
};

//read data from file

lib.read = (dir, file, callback) => {
  fs.readFile(
    lib.baseDir + dir + "/" + file + ".json",
    "utf-8",
    (err, data) => {
      callback(err, data);
    }
  );
};

//update existing file
lib.update = (dir, file, data, callback) => {
  //opening the file
  fs.open(
    lib.baseDir + dir + "/" + file + ".json",
    "r+",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        const strData = JSON.stringify(data);
        //truncate the file
        fs.ftruncate(fileDescriptor, (err) => { //truncate is deprecated, so used ftruncate
          if (!err) {
            //write to the file and close it
            fs.writeFile(fileDescriptor, strData, (err) => {
              if (!err) {
                fs.close(fileDescriptor, (err) => {
                  if (!err) {
                    callback(false);
                  } else {
                    callback("Error closing file in lib.update");
                  }
                });
              } else {
                callback("Error writing to file, in lib.update");
              }
            });
          } else {
            console.log("Error in truncating file, in lib.update");
          }
        });
      } else {
        console.log(err + " Error in updating, file not found");
      }
    }
  );
};


//delete file
lib.delete=(dir,file,callback)=>{
    fs.unlink(lib.baseDir + dir + "/" + file + ".json", (err)=>{
        if(!err){
            callback(false);
        } else{
            callback(`Error deleting file`)
        }
    })
}

module.exports = lib;
