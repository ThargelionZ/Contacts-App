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
    console.log(data);
    return data;
  }

  extractData(res) {
    let initial = res._body;
    initial = JSON.parse(initial);
    initial = initial.contacts;
    return initial;
  }


  createContact() {
    
  }

  editContact() {

  }

  deleteContact() {

  }
}
