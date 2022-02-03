/*
const csvtojson = require("csvtojson");
const fs = require("fs");

const csvFilePath = "file.csv";

csvtojson()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    console.log(jsonObj);

    fs.writeFile(
      "output.json",
      JSON.stringify(jsonObj),
      "utf-8",
      function (err) {
        console.log(err);
      }
    );
  });
*/

/////////////////////////////
//CRUD

const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const usersRouter = require("./routes/userRoutes");

const PORT = 5000;

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("HELLO "));

app.use("/users", usersRouter);

//

app.listen(PORT, () => {
  console.log(`listening on port ${PORT} `);
});
