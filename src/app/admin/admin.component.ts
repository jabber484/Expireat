import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';

const httpOptions ={
	headers: new HttpHeaders({'Content-Type': 'application/json'})
};

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
	host = "http://localhost:8080";
	eventListURL = "/assets/eventList_sample.json";
	// userDataURL = "/assets/userData_sample.json";
	CSVsampleURL = "/assets/userData_sample.json";

	// eventListURL = "/eventList/;
	private userDataURL = 'http://localhost:8080/user';
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
      "pw": null,
      "id": null
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

			console.log(this.userData[i]);
			return this.http.post(this.userDataURL,{
				"username":this.userData[i]['username'],
				"pw":this.userData[i]['pw'],
				"id":this.userData[i]['id']
			},httpOptions).subscribe(
				data => {
					console.log(data['username']);
					console.log(data['hpw']);
					this.loadDataFromSrc(which)
					//further action
				},
				error => {
					console.log("Error in data commit.");
				}
			);
			// this.http.post(this.userDataURL + "set", { payload: this.userData[i] }).subscribe((data) => {
				// this.loadDataFromSrc(which)
			// });

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
			return this.http.delete(this.userDataURL+ "/" + this.userData[id]['username'] 
									+ "/" + this.userData[i]['pw'], httpOptions).subscribe(
					data =>{
						this.loadDataFromSrc(which);
					},
					error =>{
						console.log("Error in data delete.");
					}
				);
			// return this.http.delete(this.userDataURL,new RequestOptions({
			// 	headers: new HttpHeaders({'Content-Type': 'application/json'}),
			// 	body: 
			// 	"username": this.userData[id]['username'],
			// 	"pw": this.userData[i]['pw']}).subscribe(
			// 		data =>{
			// 			this.loadDataFromSrc(which);
			// 		},
			// 		error =>{
			// 			console.log("Error in data delete.");
			// 		}
			// 	);
			};
			// console.log(id);
			// this.http.delete(this.userDataURL + "delete/" + id).subscribe((data) => {
			// 	this.loadDataFromSrc(which)
			// });
				

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
