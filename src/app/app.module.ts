import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataTablesModule } from 'angular-datatables';

import { Login } from './app.component';
import { EventComponent } from './event/event.component';
import { AdminComponent } from './admin/admin.component';
import { AboutUSComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [
    Login,
    EventComponent,
    AdminComponent,
    AboutUSComponent,
  ],
  imports: [
    BrowserModule,
  	DataTablesModule,
  ],
  providers: [],
  bootstrap: [Login],
  // entryComponents: [LandingComponent]
})
export class AppModule {  }
