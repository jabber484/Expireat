import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataTablesModule } from 'angular-datatables';

import { Login } from './app.component';

@NgModule({
  declarations: [
    Login,
  ],
  imports: [
    BrowserModule,
  	DataTablesModule,
  ],
  providers: [],
  bootstrap: [Login],
  // entryComponents: [LandingComponent]
})
export class AppModule { }
