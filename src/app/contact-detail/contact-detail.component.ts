import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from "../services/contacts.service";

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contactIndex;
  contacts = [];
  bool = false;

  constructor(private _route: ActivatedRoute, private contactsService: ContactsService) {
    this.contactIndex = _route.snapshot.params["index"];
    contactsService.getContacts().then((newInfo) => {
      this.contacts = newInfo;
      console.log(this.contacts);
      console.log(this.contactIndex);
      console.log(this.contacts[this.contactIndex]);
      console.log(this.contacts[this.contactIndex].firstName);
      this.bool = true;
    });
  }

  ngOnInit() {

  }

}
