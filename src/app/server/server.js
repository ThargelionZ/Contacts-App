/**
 * Created by mylesparker on 4/3/17.
 */

const fs = require("fs");

const express = require("express");
const app = express();

const cors = require("cors");

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const bodyParser = require('body-parser');

const url = 'mongodb://localhost:27017/contactsDatabase';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to mongo server: " + url);
  removeDocument(db, function() {});
  //insertDocuments(db, function() {});
  //db.dropDatabase();
  findDocuments(db, function() {});
  db.close();
});

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

app.put('/searchContacts/:searchItem', function(req, res) {
  var newContacts = {contacts: []};
  var contacts = getContacts();
  contacts = JSON.parse(contacts);
  for (var i = 0; i < contacts.contacts.length; i++) {
    for (var j in contacts.contacts[i]) {
      if (j == 'firstName' || j == 'lastName') {
        if (contacts.contacts[i][j].toLowerCase().indexOf(req.params.searchItem.toLowerCase()) != -1) {
          newContacts.contacts.push(contacts.contacts[i]);
          break;
        }
      }
    }
  }
  newContacts = JSON.stringify(newContacts);
  newContacts = sortAscending(newContacts);
  res.end(newContacts);
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

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('contacts');
  let contacts = getContacts();
  contacts = JSON.parse(contacts);
  // Insert some documents
  collection.insertMany([
    {a: 1}, {b: 2}, {c: 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
};
//
var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('contacts');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
};
//
// var findDocuments = function(db, callback) {
//   // Get the documents collection
//   var collection = db.collection('documents');
//   // Find some documents
//   collection.find({'a': 3}).toArray(function(err, docs) {
//     assert.equal(err, null);
//     console.log("Found the following records");
//     console.log(docs);
//     callback(docs);
//   });
// };
//
// var updateDocument = function(db, callback) {
//   // Get the documents collection
//   var collection = db.collection('documents');
//   // Update document where a is 2, set b equal to 1
//   collection.updateOne({ a : 2 }
//     , { $set: { b : 1 } }, function(err, result) {
//       assert.equal(err, null);
//       assert.equal(1, result.result.n);
//       console.log("Updated the document with the field a equal to 2");
//       callback(result);
//     });
// };
//
var removeDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('contacts');
  // Delete document where a is 3
  collection.deleteOne({}, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document with the field a equal to 3");
    callback(result);
  });
};


