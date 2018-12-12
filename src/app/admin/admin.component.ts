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
	// eventListURL = "/assets/eventList_sample.json";
	userDataURL = "/assets/userData_sample.json";
	// CSVsampleURL = "/assets/userData_sample.json";

	host = "http://localhost:8080";
	eventListURL = "/event";
	// userDataURL = "/userData/";
	flushDataURL = "/event/flush";
	uploadCSVURL = "/event/csv";

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

	uploadCSV(files) {
		// Upload
		this.fileToUpload = files.item(0);
		const formData: FormData = new FormData();
      	formData.append('file', this.fileToUpload, this.fileToUpload.name);

		this.http.post(this.uploadCSVURL, formData).subscribe((data) => {
			console.log(data);
			this.loadDataFromSrc("event")
		});
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
			this.http.post(this.eventListURL, { payload: this.eventData[i] }).subscribe((data) => {
				this.loadDataFromSrc(which)
			});
		}
		else if(which=="user"){
			this.http.post(this.userDataURL, { payload: this.userData[i] }).subscribe((data) => {
				this.loadDataFromSrc(which)
			});
		}
	}

	data_delete(which, i){
		let id = i;
		if(which=="event"){
			this.http.delete(this.eventListURL + "/" + id).subscribe((data) => {
				this.loadDataFromSrc(which)
			});
		}
		else if(which=="user"){
			this.http.delete(this.userDataURL + "/" + id).subscribe((data) => {
				this.loadDataFromSrc(which)
			});
		}		
	}

	constructor(private http: HttpClient) {
		this.eventListURL = this.host + this.eventListURL
		this.flushDataURL = this.host + this.flushDataURL
		this.uploadCSVURL = this.host + this.uploadCSVURL
	}

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
