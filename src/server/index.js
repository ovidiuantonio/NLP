const dotenv = require("dotenv");
dotenv.config();
var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
var aylien = require("aylien_textapi");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("dist"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve('dist/index.html'));
});

app.get('/test', function (req, res) {
  res.send(mockAPIResponse)
});

app.get("/article", (req, res) => {
  var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY,
  });
  textapi.sentiment(
    {
      "url": req.body.text,
    }
  );
});

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
  console.log("App listening on port 3000!");
});
