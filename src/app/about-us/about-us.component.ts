import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUSComponent implements OnInit {
  libraryUsed = [
  	["Angular 7", "https://angular.io"],
    ["Bootstrap 4", "https://getbootstrap.com"],
    ["Angular Datatable", "https://l-lin.github.io/angular-datatables/"],
    ["Font Awesome (Icon)", "https://fontawesome.com"],
    ["Roboto (Font)", "https://fonts.google.com/"],
  ]

  todoList = [
    ["Backend", "Whole thing"],
    ["CRUD Trigger", "Admin page CRUD"],
    ["Online Database", "Serializate online data"],
    ["Moblie Navigation", "No idea what to do now"],
  ]

  constructor() { }

  ngOnInit() {
  }

}
