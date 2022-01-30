const csvtojsonV2 = require("csvtojson");

const csvFilePath = "./file.csv";
const csv = require("csvtojson");
csv()
  .fromFile(csvFilePath)
  .then((books) => {
    console.log(books);
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */
  });

// // Async / await usage
// const jsonArray = csv().fromFile(csvFilePath);

// 2)
// const csv = require("csvtojson");
// csv({
//   noheader: true,
//   output: "csv",
// })
//   .fromString([1, 2, 3, 4])
//   .then((csvRow) => {
//     console.log(csvRow); // => [["1","2","3"], ["4","5","6"], ["7","8","9"]]
//   });

// require csvtojson
/*
var csv = require("csvtojson");

// Convert a csv file with csvtojson
csv()
  .fromFile(csvFilePath)
  .then(function (jsonArrayObj) {
    //when parse finished, result will be emitted here.
    console.log(jsonArrayObj);
  });

// Parse large csv with stream / pipe (low mem consumption)
csv()
  .fromStream(readableStream)
  .subscribe(function (jsonObj) {
    //single json object will be emitted for each csv line
    // parse each json asynchronousely
    return new Promise(function (resolve, reject) {
      asyncStoreToDb(json, function () {
        resolve();
      });
    });
  });

//Use async / await
const jsonArray = await csv().fromFile(filePath);
*/

/*
const csvFilePath = "<path to csv file>";
const csv = require("csvtojson");
csv()
  .fromFile("./file2.csv")
  .then((jsonObj) => {
    console.log(jsonObj);
    
     // [
      //	{a:"1", b:"2", c:"3"},
      //	{a:"4", b:"5". c:"6"}
      //s]
  });

// Async / await usage
const jsonArray = csv().fromFile(csvFilePath);
*/
