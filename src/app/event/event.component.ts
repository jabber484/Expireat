import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
	dtOptions: DataTables.Settings = {};

  	constructor() { }

	ngOnInit() {
		this.dtOptions = {
	      ajax: 'https://www.lcsd.gov.hk/datagovhk/event/leisure_prog.json',
	      columns: [{
	        title: 'ID',
	        data: 'id'
	      }, {
	        title: 'First name',
	        data: 'firstName'
	      }, {
	        title: 'Last name',
	        data: 'lastName'
	      }]
	    };
  	}

}
