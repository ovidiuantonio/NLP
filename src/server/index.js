const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
var bodyParser = require('body-parser');
const express = require('express');
var cors = require('cors');
const app = express();
var aylienAPI = require('aylien_textapi');

var textapi = new aylienAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('dist'));


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}

app.listen(port); {
  console.log('App listening on port 8080!')
};



app.get('/', function (req, res) {
  res.sendFile(path.resolve('./dist/index.html'))
});


app.post('/article', function (req, res) {
  textapi.sentiment({
    url: req.body.text,
    mode: 'document'
  }, function (error, response) {
    console.log('inside post function');
    console.log(response);
    res.send(response)
    if (error === null) {
      console.log('inside error');
      console.log(response);
    }
  })
});

module.exports = app;