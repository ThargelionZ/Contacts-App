import { Component, OnInit } from '@angular/core';
import { ContactsService } from "../services/contacts.service";

@Component({
  selector: 'create-contacts',
  templateUrl: './create-contacts.component.html',
  styleUrls: ['./create-contacts.component.css']
})
export class CreateContactsComponent implements OnInit {
  firstName;
  lastName;
  email;
  phone;
  website;
  birthday;
  address;

  constructor(private contactsService: ContactsService) {

  }

  ngOnInit() {

  }



  createContacts() {
    let contact = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      website: this.website,
      birthday: this.birthday,
      address: this.address
    }
    this.contactsService.createContact(contact);

    this.firstName = undefined;
    this.lastName = undefined;
    this.email = undefined;
    this.phone = undefined;
    this.website = undefined;
    this.birthday = undefined;
    this.address = undefined;
  }
}
