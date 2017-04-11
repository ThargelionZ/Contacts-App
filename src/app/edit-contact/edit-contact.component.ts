import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ContactsService} from "../services/contacts.service";

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  contacts = [];

  contactIndex;

  firstName;
  lastName;
  email;
  phone;
  website;
  birthday;
  address;

  constructor(private _route: ActivatedRoute, private contactsService: ContactsService) {
    this.contactIndex = _route.snapshot.params["index"];

    contactsService.getContacts().then((newInfo) => {
      this.contacts = newInfo;
      this.firstName = this.contacts[this.contactIndex].firstName;
      this.lastName = this.contacts[this.contactIndex].lastName;
      this.email = this.contacts[this.contactIndex].email;
      this.phone = this.contacts[this.contactIndex].phone;
      this.website = this.contacts[this.contactIndex].website;
      this.birthday = this.contacts[this.contactIndex].birthday;
      this.address = this.contacts[this.contactIndex].address;
    });
  }

  ngOnInit() {

  }

  editContact() {
    var contact = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      website: this.website,
      birthday: this.birthday,
      address: this.address
    };
    this.contacts[this.contactIndex] = contact;
    this.contactsService.editContact(this.contacts).then();
  }

}
