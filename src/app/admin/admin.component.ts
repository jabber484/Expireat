import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	objectKeys = Object.keys;
	eventdtOptions: DataTables.Settings = {};
	userdtOptions: DataTables.Settings = {};
	fileToUpload: File = null;

	// sample
	eventListURL = "/assets/eventList_sample.json";
	userDataURL = "/assets/userData_sample.json";
	CSVsampleURL = "/assets/userData_sample.json";

	// eventListURL = "/eventList/;
	// userDataURL = "/userData/";
	flushDataURL = "/flush";
	uploadCSVURL = "/csv";

	eventData = [];
	eventDataTemplate = {
		"name": null,
		"type": null,
		"data": null,
		"venue": null,
		"quota": null
	};
	userData = [];
	userDataTemplate = {
      "username": null,
      "pw": null
	};

	uploadCSV(file) {
		this.fileToUpload = file.item(0);
		console.log(this.fileToUpload)
		// Upload
			this.loadDataFromSrc()
	}

	flush_eventdata(){
		// Flush
		this.http.get(this.flushDataURL).subscribe((data) => {
			// Reload
			this.loadDataFromSrc()
		});
	}

	data_add(which){
		console.log(this.eventData, this.userData);
		if(which=="event"){
			this.eventData.push(Object.assign({}, this.eventDataTemplate))
		}
		else if(which=="user"){
			this.userData.push(Object.assign({}, this.userDataTemplate))
		}
	}
	
	// Data_get
	loadDataFromSrc(which=null) {
		if(which==null || which=="event"){
			this.http.get(this.eventListURL).subscribe((data) => {
				this.eventData = data['data']
		    	this.eventData.push(Object.assign({}, this.eventDataTemplate))
			});
		}
		if(which==null || which=="user"){
		    this.http.get(this.userDataURL).subscribe((data) => { 
		    	this.userData = data['data']
		    	this.userData.push(Object.assign({}, this.userDataTemplate))
			});
		}
	}

	data_commit(which, i){
		if(which=="event"){
			this.http.post(this.eventListURL + "set", { payload: this.eventData[i] }).subscribe((data) => {
				this.loadDataFromSrc(which)
			});
		}
		else if(which=="user"){
			this.http.post(this.userDataURL + "set", { payload: this.userData[i] }).subscribe((data) => {
				this.loadDataFromSrc(which)
			});
		}
	}

	data_delete(which, i){
		let id = i;
		if(which=="event"){
			this.http.delete(this.eventListURL + "delete/" + id).subscribe((data) => {
				this.loadDataFromSrc(which)
			});
		}
		else if(which=="user"){
			this.http.delete(this.userDataURL + "delete/" + id).subscribe((data) => {
				this.loadDataFromSrc(which)
			});
		}		
	}

	constructor(private http: HttpClient) { }

	ngOnInit(): void {
		this.loadDataFromSrc()
		this.eventdtOptions = {
			"ordering": false,
			"searching": false
	    };
		this.userdtOptions = {
			"ordering": false,
			"searching": false
	    };
	}
}
