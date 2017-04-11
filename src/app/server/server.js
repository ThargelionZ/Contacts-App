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
  let contacts = getContacts();
  contacts = sortAscending(contacts);
  res.end(contacts);
});


app.get('/sortDescending', function (req, res) {
  let contacts = getContacts();
  contacts = sortDescending(contacts);
  res.end(contacts);
});

app.post('/createContact', function (req, res) {
  let contacts = getContacts();
  contacts = JSON.parse(contacts);
  contacts.contacts.push(req.body);
  contacts = JSON.stringify(contacts);
  contacts = sortAscending(contacts);
  fs.writeFileSync("contacts.json", contacts);
  res.end();
  });

app.delete('/deleteContact/:index', function(req, res) {
  let contacts = getContacts();
  contacts = JSON.parse(contacts);
  console.log(contacts);
  contacts.contacts.splice(req.params.index, 1);
  console.log(req.params.index);
  console.log(contacts);
  contacts = JSON.stringify(contacts);
  fs.writeFileSync("contacts.json", contacts);
  res.end();
});

app.put('/editContact', function(req, res) {
  let contacts = {
    contacts: req.body
  };
  contacts = JSON.stringify(contacts);
  contacts = sortAscending(contacts);
  fs.writeFileSync("contacts.json", contacts);
  res.end();
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
      if (contacts.contacts[j + 1].firstName.toLowerCase() < contacts.contacts[j].firstName.toLowerCase()) {
        temp = contacts.contacts[j];
        contacts.contacts[j] = contacts.contacts[j + 1];
        contacts.contacts[j + 1] = temp;
      }
    }
  }
  contacts = JSON.stringify(contacts);
  return contacts;
}

function sortDescending(JSONcontacts) {
  let contacts = JSON.parse(JSONcontacts);
  var temp;
  for(var i = 0, l = contacts.contacts.length; i < l; i++){
    for(var j = 0, l = contacts.contacts.length - 1; j < l; j++) {
      if (contacts.contacts[j + 1].firstName.toLowerCase() > contacts.contacts[j].firstName.toLowerCase()) {
        temp = contacts.contacts[j];
        contacts.contacts[j] = contacts.contacts[j + 1];
        contacts.contacts[j + 1] = temp;
      }
    }
  }
  contacts = JSON.stringify(contacts);
  return contacts;
}
