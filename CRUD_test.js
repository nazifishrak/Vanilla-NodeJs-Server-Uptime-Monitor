const data = require("./lib/data");



// data.create("test", "new_file", { name: "Syed Nazif Ishrak", age: 21 }, (err) =>
//   console.log("error was" + err)
// );


// data.read('test','new_file', (err,data)=>{console.log(data);})
// data.update("test", "new_file", { name: "Syed Nazif Ishrak", age: 21 }, (err) =>
// console.log("error was" + err)
// );
data.delete('test','new_file', (err,data)=>{console.log(data);})

