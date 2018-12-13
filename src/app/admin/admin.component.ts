import { AfterViewInit, OnDestroy, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

const httpOptions ={
	headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements AfterViewInit, OnDestroy, OnInit {
	objectKeys = Object.keys;
	eventdtOptions: DataTables.Settings = {};
	userdtOptions: DataTables.Settings = {};
	fileToUpload: File = null;

	@ViewChildren(DataTableDirective)
	dtElements: QueryList<DataTableDirective>;
	dtTrigger: Subject<DataTableDirective>[] = [new Subject(),new Subject()];

	// sample
	host = "http://localhost:8080";
	// eventListURL = "/assets/eventList_sample.json";
	// userDataURL = "/assets/userData_sample.json";
	CSVsampleURL = "/assets/userData_sample.json";

	eventListURL = "/event";
	private userDataURL = 'http://localhost:8080/user';
	flushDataURL = "/event/flush";
	uploadCSVURL = "/event/csv";

	editorToggle = false
	editorData = {}
	// eventData = [];
	// eventDataTemplate = {
	// 	"name": null,
	// 	"type": null,
	// 	"date": null,
	// 	"venue": null,
	// 	"contact": null
	// };
	// userData = [];
	// userDataTemplate = {
 //      "username": null,
 //      "pw": null
	// };

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


		// console.log(this.eventData, this.userData);
		// if(which=="event"){
		// 	this.eventData.push(Object.assign({}, this.eventDataTemplate))
		// }
		// else if(which=="user"){
		// 	this.userData.push(Object.assign({}, this.userDataTemplate))
		// }
	}
	
	// Data_get
	loadDataFromSrc(which=null) {
		this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
		  	dtElement.dtInstance.then((dtInstance: any) => {
		  		dtInstance.destroy();
				// Call the dtTrigger to rerender again
				this.dtTrigger[index].next();
				console.log("Reload" + index)
		  	});
		});
	}

	data_commit(which, i){
		// if(which=="event"){
		// 	this.http.post(this.eventListURL, { payload: this.eventData[i] }).subscribe((data) => {
		// 		this.loadDataFromSrc(which)
		// 	});
		// }
		// else if(which=="user"){

		// 	console.log(this.userData[i]);
		// 	return this.http.post(this.userDataURL,{
		// 		"username":this.userData[i]['username'],
		// 		"pw":this.userData[i]['pw']
		// 	},httpOptions).subscribe(
		// 		data => {
		// 			console.log(data['username']);
		// 			console.log(data['hpw']);
		// 			this.loadDataFromSrc(which)
		// 			//further action
		// 		},
		// 		error => {
		// 			console.log("Error in data commit.");
		// 		}
		// 	);
			// this.http.post(this.userDataURL + "set", { payload: this.userData[i] }).subscribe((data) => {
				// this.loadDataFromSrc(which)
			// });

		// }
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

	fillEditor(which, colDef, data){
		this.editorData = data;
	}

	constructor(private http: HttpClient) {
		this.eventListURL = this.host + this.eventListURL
		this.flushDataURL = this.host + this.flushDataURL
		this.uploadCSVURL = this.host + this.uploadCSVURL
	}

	ngOnInit(): void {
		var event_colDef = [
			{
				title: 'Activity name',
				data: 'name'
			}, {
				title: 'Type',
				data: 'type'
			}, {
				title: 'Date',
				data: 'date'
			}, {
				title: 'Venue',
				data: 'venue'
			}, {
				title: 'Contact',
				data: 'contact',
				width: "20%"
			}
		]
		var user_colDef = [
			{
				title: 'Username',
				data: 'username'
			}, {
				title: 'Password',
				data: 'pw'
			}
		]

		this.eventdtOptions = {
			order: [[ 2, "desc" ]],
			autoWidth: false,
			ajax: this.eventListURL,
			columns: event_colDef,
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				const self = this;
				// Unbind first in order to avoid any duplicate handler
				// (see https://github.com/l-lin/angular-datatables/issues/87)
				$('td', row).unbind('click');
				$('td', row).bind('click', () => {
					this.editorToggle = true;
					self.fillEditor("event", event_colDef, data);
				});
				return row;
			}
	    };
		this.userdtOptions = {
			ajax: this.userDataURL,
			columns: user_colDef,
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				const self = this;
				// Unbind first in order to avoid any duplicate handler
				// (see https://github.com/l-lin/angular-datatables/issues/87)
				$('td', row).unbind('click');
				$('td', row).bind('click', () => {
					this.editorToggle = true;
					self.fillEditor("user", user_colDef, data);
				});
				return row;
			}
	    };
	}

	ngAfterViewInit(): void {
		this.dtTrigger[0].next();
		this.dtTrigger[1].next();
	}

	ngOnDestroy(): void {
		// Do not forget to unsubscribe the event
		this.dtTrigger[0].unsubscribe();
		this.dtTrigger[1].unsubscribe();
	}
}
