import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ContactsService {

  constructor(private http: Http) { }
  // In order to use the service elsewhere you must import it and use constructor(private contactsService: ContactsService) {}

  getContacts() {
    var data = this.http.get("http://localhost:3000/contacts")
      .toPromise().then(this.extractData);
    return data;
  }

  extractData(res) {
    let initial = res._body;
    initial = JSON.parse(initial);
    initial = initial.contacts;
    return initial;
  }


  createContact(contact) {
    this.http.post("http://localhost:3000/createContact", contact)
      .toPromise().then();
  }

  editContact(contact) {
    return this.http.put("http://localhost:3000/editContact", contact, contact)
      .toPromise().then(() => {
        return true;
    });
  }

  deleteContact(index) {
    return this.http.delete("http://localhost:3000/deleteContact/" + index)
      .toPromise().then(() => {
      return true;
    });
  }

  searchContacts(searchItem) {
    return this.http.put('http://localhost:3000/searchContacts/' + searchItem, searchItem).toPromise().then((res) => {
      let contacts = JSON.parse(res['_body']);
      contacts = contacts.contacts;
      return contacts;
    })
  }

  sortAscending() {

  }

  sortDescending() {
    return this.http.get("http://localhost:3000/sortDescending")
      .toPromise().then((data) => {
        let contacts = data['_body'];
        contacts = JSON.parse(contacts);
        return contacts.contacts;
      })
  }
}

/*-----------------------------------------------
  This is sparta
-----------------------------------------------*/
