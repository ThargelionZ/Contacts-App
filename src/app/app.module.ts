import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CreateContactsComponent } from './create-contacts/create-contacts.component';
import { ContactsService } from './services/contacts.service';

const appRoutes: Routes = [
  { path: 'createContacts', component: CreateContactsComponent},
  //{ path: 'appComponent', component: AppComponent},
  { path: '', redirectTo: 'appComponent', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    CreateContactsComponent
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
