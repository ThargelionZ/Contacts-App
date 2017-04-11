import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CreateContactsComponent } from './create-contacts/create-contacts.component';
import { ContactsService } from './services/contacts.service';
import { MainContactsComponent } from './main-contacts/main-contacts.component';
import { HomeComponent } from './home/home.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';

const appRoutes: Routes = [
  { path: 'createContacts', component: CreateContactsComponent},
  { path: 'myContacts', component: MainContactsComponent},
  { path: 'contactDetail/:index', component: ContactDetailComponent},
  { path: 'editContact/:index', component: EditContactComponent},
  //{ path: 'appComponent', component: AppComponent},
  { path: '', component: HomeComponent},
  { path: '', redirectTo: 'HomeComponent', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    CreateContactsComponent,
    MainContactsComponent,
    HomeComponent,
    ContactDetailComponent,
    EditContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ContactsService
  ],
  bootstrap: [AppComponent] //This is the component that the app starts on.
})
export class AppModule { }
