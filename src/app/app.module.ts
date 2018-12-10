import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { AdminComponent } from './admin/admin.component';
import { AboutUSComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    AdminComponent,
    AboutUSComponent,
  ],
  imports: [
    BrowserModule,
  	DataTablesModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  // entryComponents: [LandingComponent]
})
export class AppModule {  }