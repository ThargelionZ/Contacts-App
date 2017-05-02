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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const url = 'mongodb://localhost:27017/contactsDatabase';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to mongo server: " + url);
  //var collection = db.collection('contacts');
  //removeDocument(db, function() {});
  //insertDocuments(db, function() {});
  //db.dropDatabase();
  //findDocuments(db, function() {});

  app.get('/products/:id', function (req, res, next) {
    res.json({msg: "This is CORS-enabled for all origins."});
  });

  app.get('/contacts', function (req, res) {
    getContacts(function(contacts) {
        contacts = JSON.stringify(contacts);
        contacts = sortAscending(contacts);
        res.end(contacts);
      }
    );
  });

  app.get('/sortDescending', function (req, res) {
    getContacts(function(contacts) {
      contacts = JSON.stringify(contacts);
      contacts = sortDescending(contacts);
      res.end(contacts);
    });
  });

  app.post('/createContact', function (req, res) {
    getContacts(function(contacts) {
      //contacts = JSON.parse(contacts);
      contacts.contacts.push(req.body);
      //fs.writeFileSync("contacts.json", contacts);
      contacts = JSON.stringify(contacts);
      console.log(req.body);
      contacts = sortAscending(contacts);
      // Get the documents collection
      var collection = db.collection('contacts');
      contacts = JSON.parse(contacts);
      // Insert some documents
      collection.insertMany([{
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        website: req.body.website,
        birthday: req.body.birthday,
        address: req.body.address
      }], function(err, result) {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          assert.equal(1, result.ops.length);
          console.log("Inserted 15 documents into the collection");
          //callback(result);
        });
      console.log(contacts.contacts);
      res.end();
    });
  });

  app.delete('/deleteContact/:index', function(req, res) {
    getContacts(function(contacts) {
      //contacts = JSON.stringify(contacts);
      //console.log(contacts);
      //contacts = JSON.parse(contacts);
      console.log(contacts.contacts[req.params.index]);
      console.log(contacts.contacts[req.params.index].firstName);
      console.log(req.params.index);
      //console.log(contacts);
      //contacts = JSON.stringify(contacts);
      //fs.writeFileSync("contacts.json", contacts);
      //Get the documents collection
      var collection = db.collection('contacts');
      // Delete document where a is 3
      console.log(contacts.contacts);
      console.log(contacts.contacts[req.params.index].firstName);
      collection.deleteOne({firstName: contacts.contacts[req.params.index].firstName}, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Removed the document with the field a equal to 3");
        //callback(result);
      });
      contacts.contacts.splice(req.params.index, 1);
      // contacts = JSON.stringify(contacts);
      // contacts = sortAscending(contacts);
      // contacts = JSON.parse(contacts);
      res.end();
      });
  });

  app.put('/editContact/:index', function(req, res) {
    getContacts(function(contacts) {
      // let contacts = {
      //   contacts: req.body
      // };
      console.log(req.params.index);
      //console.log(req.body);
      //contacts = JSON.stringify(contacts);
      //contacts = sortAscending(contacts);
      //fs.writeFileSync("contacts.json", contacts);
      //Get the documents collection
      var collection = db.collection('contacts');
      // Update document where a is 2, set b equal to 1
      collection.updateOne({firstName: contacts.contacts[req.params.index].firstName}
        , { $set: {
          firstName: req.body[req.params.index].firstName,
          lastName: req.body[req.params.index].lastName,
          email: req.body[req.params.index].email,
          phone: req.body[req.params.index].phone,
          website: req.body[req.params.index].website,
          birthday: req.body[req.params.index].birthday,
          address: req.body[req.params.index].address
        } }, function(err, result) {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          console.log("Updated the document with the field a equal to 2");
          console.log(req.body);
          //callback(result);
        });
      res.end();
    });

  });

  app.put('/searchContacts/:searchItem', function(req, res) {
    // var newContacts = {contacts: []};
    // var contacts = getContacts();
    // contacts = JSON.parse(contacts);
    // for (var i = 0; i < contacts.contacts.length; i++) {
    //   for (var j in contacts.contacts[i]) {
    //     if (j == 'firstName' || j == 'lastName') {
    //       if (contacts.contacts[i][j].toLowerCase().indexOf(req.params.searchItem.toLowerCase()) != -1) {
    //         newContacts.contacts.push(contacts.contacts[i]);
    //         break;
    //       }
    //     }
    //   }
    // }
    // newContacts = JSON.stringify(newContacts);
    // newContacts = sortAscending(newContacts);
    // res.end(newContacts);

    var newContacts = {contacts:[]};
    // var contacts = getContacts();
    // contacts = JSON.parse(contacts);
    // for(var i = 0; i < contacts.contacts.length; i++) {
    //   for(var j in contacts.contacts[i]) {
    //     if(j == 'firstName' || j == 'lastName') {
    //       if(contacts.contacts[i][j].toLowerCase().indexOf(req.params.searchParam.toLowerCase()) != -1 ) {
    //         newContacts.contacts.push(contacts.contacts[i]);
    //         break;
    //       }
    //     }
    //   }
    // }
    // newContacts = JSON.stringify(newContacts);

    searchContacts(function(data) {
      data = JSON.stringify(data);
      newContacts = sortAscending(data);
      res.end(newContacts);
    });

    function searchContacts(callback) {
      var collection = db.collection('contacts');
      var searchItem = req.params.searchItem;
      collection.find(
        {
          $or: [
            {
              firstName: { $regex: new RegExp("^" + searchItem, "i") }
            },
            {
              lastName: { $regex: new RegExp("^" + searchItem, "i") }
            }
          ]
        }
      ).toArray(function(err, contact) {
        var contacts = {contacts: contact};
        callback(contacts);
      })

    }
  });



// app.post('/', function (req, res) {
//   res.sendfile("contacts.json");
// });
  function getContacts(callback) {
    // let contacts = fs.readFileSync("./contacts.json", "UTF-8");

    var collection = db.collection('contacts');

    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      //console.log(docs);
      let contacts = {
        contacts: docs
      };
      //console.log(docs[0].contacts);
      callback(contacts);
    });

    // return contacts;
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

  function insertDocuments (db, callback) {
    // Get the documents collection
    var collection = db.collection('contacts');
    let contacts = getContacts();
    contacts = JSON.parse(contacts);
    // Insert some documents
    console.log(contacts.contacts);
    collection.insertMany(
      contacts.contacts
    , function(err, result) {
      assert.equal(err, null);
      assert.equal(15, result.result.n);
      assert.equal(15, result.ops.length);
      console.log("Inserted 15 documents into the collection");
      callback(result);
    });
  };
//
  function findDocuments(db, callback) {
    // Get the documents collection
    var collection = db.collection('contacts');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      let contacts = docs;
      //console.log(docs);
      //console.log(docs[0].contacts);
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
// var removeDocument = function(db, callback) {
//   // Get the documents collection
//   var collection = db.collection('contacts');
//   // Delete document where a is 3
//   collection.deleteOne({}, function(err, result) {
//     assert.equal(err, null);
//     assert.equal(1, result.result.n);
//     console.log("Removed the document with the field a equal to 3");
//     callback(result);
//   });
// };

  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
});





