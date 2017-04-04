/**
 * Created by mylesparker on 4/3/17.
 */

var fs = require("fs");

var express = require("express");

var app = express();

//app.listen(3000);

fs.readFile("contacts.json", "UTF-8", function(err, data) {
  if(err) throw err;
  let contacts = data;
  JSON.parse()
};
