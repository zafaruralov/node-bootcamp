const csvtojson = require("csvtojson");
const fs = require("fs");

const csvFilePath = "file.csv";

csvtojson()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    console.log(jsonObj);

    fs.writeFileSync(
      "output.json",
      JSON.stringify(jsonObj),
      "utf-8",
      function (err) {
        console.log(err);
      }
    );
  });
