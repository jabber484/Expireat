import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUSComponent implements OnInit {
  libraryUsed = [
    ["Express", "https://expressjs.com/"],
    ["Nodejs", "https://nodejs.org/en/"],
    ["Mongodb", "https://www.mongodb.com/"],
    ["Mongoose", "https://mongoosejs.com/"],
  	["Angular 7", "https://angular.io"],
    ["Bootstrap 4", "https://getbootstrap.com"],
    ["Angular Datatable", "https://l-lin.github.io/angular-datatables/"],
    ["Font Awesome (Icon)", "https://fontawesome.com"],
    ["Roboto (Font)", "https://fonts.google.com/"],
  ]

  todoList = [
    // ["Backend", "Whole thing"],
    // ["CRUD Trigger", "Admin page CRUD"],
    // ["Online Database", "Serializate online data"],
    ["Visible Response", "Visible Ajax result"],
    ["Data cache", "Store result after Ajax"],
    ["Admin System (Not required)", "Enhance security"],
    ["URL Direct", "Jump to section on load"],
  ]

  constructor() { }

  ngOnInit() {
  }

}
