/**
 * Created by mylesparker on 4/3/17.
 */

var fs = require("fs");

var express = require("express");

var app = express();

var cors = require("cors");

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get('/products/:id', function (req, res, next) {
  res.json({msg: "This is CORS-enabled for all origins."});
});

app.get('/contacts', function (req, res) {
  //res.sendFile('/Users/mylesparker/WebstormProjects/contactsApp/src/app/server/contacts.json');
  let contacts = getContacts();
  contacts = sortAscending(contacts);
  //console.log(contacts);
  res.end(contacts);
});

// app.post('/', function (req, res) {
//   res.sendfile("contacts.json");
// });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

function getContacts() {
  let contacts = fs.readFileSync("./contacts.json", "UTF-8");
  return contacts;
}

function sortAscending(JSONcontacts) {
  let contacts = JSON.parse(JSONcontacts);
  var temp;
  for(var i = 0, l = contacts.contacts.length; i < l; i++){
    for(var j = 0, l = contacts.contacts.length - 1; j < l; j++) {
      if (contacts.contacts[j + 1].firstName < contacts.contacts[j].firstName) {
        temp = contacts.contacts[j];
        contacts.contacts[j] = contacts.contacts[j + 1];
        contacts.contacts[j + 1] = temp;
      }
    }
  }
  contacts = JSON.stringify(contacts);
  return contacts;
}


