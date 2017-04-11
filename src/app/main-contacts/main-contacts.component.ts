import { Component, OnInit } from '@angular/core';
import { ContactsService } from "../services/contacts.service";

@Component({
  selector: 'app-main-contacts',
  templateUrl: './main-contacts.component.html',
  styleUrls: ['./main-contacts.component.css']
})
export class MainContactsComponent implements OnInit {

  contacts = [];
  searchItem = "";
  sortBool = false;

  constructor(private contactsService: ContactsService) {
    contactsService.getContacts().then((newInfo) => {
      this.contacts = newInfo;
    });
  }

  ngOnInit() {

  }

  getIndex(i) {
    console.log(i);
    console.log(this.contacts.length - 1 - i);
  }

  deleteContact(index) {
    console.log(index);
    console.log(this.contacts.length - 1 - index);
    this.contactsService.deleteContact(index).then((bool) => {
      this.contactsService.getContacts().then((newInfo) => {
        this.contacts = newInfo;
      });
    });
  }

  sortContacts() {
    if(this.sortBool) {
      this.sortBool = false;
      this.contactsService.getContacts().then((newInfo) => {
        this.contacts = newInfo;
      });
    } else {
      this.contactsService.sortDescending().then((data) => {
        this.contacts = data;
      });
      this.sortBool = true;
    }
  }

  searchContacts() {
    if (this.searchItem !== "") {
      this.sortBool = false;
      this.contactsService.searchContacts(this.searchItem).then((data) => {
        this.contacts = data;
      })
    } else {
      this.contactsService.getContacts().then((newInfo) => {
        this.contacts = newInfo;
      })
    }
  }

  // contacts = [
  //   {
  //     "firstName": "Paul",
  //     "lastName": "McCartney",
  //     "email": "paulmccartney@islife.com",
  //     "website": "thebeatles.com",
  //     "birthday": "06/18/42",
  //     "phone": "801-341-7285",
  //     "address": "123 W Corral Road"
  //   },
  //   {
  //     "firstName": "John",
  //     "lastName": "Lennon",
  //     "email": "paulmccartney@islife.com",
  //     "website": "thebeatles.com",
  //     "birthday": "06/18/42",
  //     "phone": "801-341-7285",
  //     "address": "123 W Corral Road"
  //   },
  //   {
  //     "firstName": "George",
  //     "lastName": "Harrison",
  //     "email": "paulmccartney@islife.com",
  //     "website": "thebeatles.com",
  //     "birthday": "06/18/42",
  //     "phone": "801-341-7285",
  //     "address": "123 W Corral Road"
  //   },
  //   {
  //     "firstName": "Ringo",
  //     "lastName": "Starr",
  //     "email": "paulmccartney@islife.com",
  //     "website": "thebeatles.com",
  //     "birthday": "06/18/42",
  //     "phone": "801-341-7285",
  //     "address": "123 W Corral Road"
  //   },
  //   {
  //     "firstName": "Frank",
  //     "lastName": "Sinatra",
  //     "email": "paulmccartney@islife.com",
  //     "website": "thebeatles.com",
  //     "birthday": "06/18/42",
  //     "phone": "801-341-7285",
  //     "address": "123 W Corral Road"
  //   },
  //   {
  //     "firstName": "Morten",
  //     "lastName": "Harket",
  //     "email": "paulmccartney@islife.com",
  //     "website": "thebeatles.com",
  //     "birthday": "06/18/42",
  //     "phone": "801-341-7285",
  //     "address": "123 W Corral Road"
  //   },
  //   {
  //     "firstName": "Magne",
  //     "lastName": "Furuholmen",
  //     "email": "paulmccartney@islife.com",
  //     "website": "thebeatles.com",
  //     "birthday": "06/18/42",
  //     "phone": "801-341-7285",
  //     "address": "123 W Corral Road"
  //   },
  //   {
  //     "firstName": "Pål",
  //     "lastName": "Waaktaar-Savoy",
  //     "email": "paulmccartney@islife.com",
  //     "website": "thebeatles.com",
  //     "birthday": "06/18/42",
  //     "phone": "801-341-7285",
  //     "address": "123 W Corral Road"
  //   },
  //   {
  //     "firstName": "Frank",
  //     "lastName": "Sinatra",
  //     "email": "paulmccartney@islife.com",
  //     "website": "thebeatles.com",
  //     "birthday": "06/18/42",
  //     "phone": "801-341-7285",
  //     "address": "123 W Corral Road"
  //   },
  //   {
  //     "firstName": "Billy Joe",
  //     "lastName": "Armstrong",
  //     "email": "paulmccartney@islife.com",
  //     "website": "thebeatles.com",
  //     "birthday": "06/18/42",
  //     "phone": "801-341-7285",
  //     "address": "123 W Corral Road"
  //   },
  //   {
  //     "firstName": "Steve",
  //     "lastName": "Tyler",
  //     "email": "paulmccartney@islife.com",
  //     "website": "thebeatles.com",
  //     "birthday": "06/18/42",
  //     "phone": "801-341-7285",
  //     "address": "123 W Corral Road"
  //   },
  //   {
  //     "firstName": "Roland",
  //     "lastName": "Orzabal",
  //     "email": "paulmccartney@islife.com",
  //     "website": "thebeatles.com",
  //     "birthday": "06/18/42",
  //     "phone": "801-341-7285",
  //     "address": "123 W Corral Road"
  //   },
  //   {
  //     "firstName": "Curt",
  //     "lastName": "Smith",
  //     "email": "paulmccartney@islife.com",
  //     "website": "thebeatles.com",
  //     "birthday": "06/18/42",
  //     "phone": "801-341-7285",
  //     "address": "123 W Corral Road"
  //   }
  // ];

}


