import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	dtOptions: DataTables.Settings = {};

	constructor() { }

	ngOnInit(): void {
		this.dtOptions = {
			"columnDefs": [
				{ "width": "20%", "targets": 0 }
			],
			"ordering": false,
			"searching": false
	    };
	}
}
