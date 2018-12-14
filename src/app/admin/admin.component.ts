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
	event_colDef = [
		{
			title: 'Event ID',
			data: 'eid',
			visible: false,
            searchable: false
		}, {			
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
	user_colDef = [
		// {
		// 	title: 'User ID',
		// 	data: ''
		// }, 
		{
			title: 'Username',
			data: 'username'
		}, {
			title: 'Password',
			data: 'pw'
		}
	]

	// sample
	host = "http://localhost:8080";
	CSVsampleURL = "/assets/csv_sample.csv";

	eventListURL = "/event";
	private userDataURL = 'http://localhost:8080/user';
	flushDataURL = "/event/flush";
	uploadCSVURL = "/event/csv";

	editorToggle = false
	editorData = {}
	editorCol = []
	editorTarget = 0

	uploadCSV(files) {
		// Upload
		this.fileToUpload = files.item(0);
		const formData: FormData = new FormData();
      	formData.append('file', this.fileToUpload, this.fileToUpload.name);

		this.http.post(this.uploadCSVURL, formData).subscribe((data) => {
			console.log(data);
			this.loadDataFromSrc(0)
		});
	}

	flush_eventdata(){
		// Flush
		this.http.get(this.flushDataURL).subscribe((data) => {
			// Reload
			this.loadDataFromSrc(0)
		});
	}

	// Data_get
	loadDataFromSrc(target=null) {
		document.documentElement.scrollTop = 0
		this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
		  	dtElement.dtInstance.then((dtInstance: any) => {
		  		if(index == this.editorTarget || index == target){
			  		dtInstance.destroy();
					// Call the dtTrigger to rerender again
					this.dtTrigger[index].next();
					console.log("Reload" + index)
				}
		  	});
		});
	}

	data_commit(){
		console.log(this.editorData);
		this.http.post([this.eventListURL, this.userDataURL][this.editorTarget], this.editorData, httpOptions)
		 	.subscribe(
				data => {
					this.editorToggle = false;
					this.loadDataFromSrc()
					console.log("Data committed.");
					//further action
				},
				error => {
					console.log("Error in data commit.");
				}
			);
	}

	data_delete(){
		let url = ""
		if(this.editorTarget == 0) {
			url = this.eventListURL + "/" + this.editorData["eid"]
		} else {

		}

		this.http.delete(url, httpOptions)
		 	.subscribe(
				data => {
					this.editorToggle = false;
					this.loadDataFromSrc()
					console.log("Data deleted.");
				},
				error => {
					console.log("Error in data deletion.");
				}
			);

			// return this.http.delete(this.userDataURL+ "/" + this.userData[id]['username'] 
			// 						+ "/" + this.userData[i]['pw'], httpOptions).subscribe(
			// 		data =>{
			// 			this.loadDataFromSrc(which);
			// 		},
			// 		error =>{
			// 			console.log("Error in data delete.");
			// 		}
			// 	);
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
			// console.log(id);
			// this.http.delete(this.userDataURL + "delete/" + id).subscribe((data) => {
			// 	this.loadDataFromSrc(which)
			// });
				

	}

	fillEditor(which, data={}){
		this.editorToggle = true;
		this.editorCol = [this.event_colDef, this.user_colDef][which]
		this.editorTarget = which
		this.editorData = data
	}

	constructor(private http: HttpClient) {
		this.eventListURL = this.host + this.eventListURL
		this.flushDataURL = this.host + this.flushDataURL
		this.uploadCSVURL = this.host + this.uploadCSVURL
	}

	ngOnInit(): void {
		this.eventdtOptions = {
			order: [[ 3, "desc" ]],
			autoWidth: false,
			ajax: this.eventListURL,
			columns: this.event_colDef,
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				const self = this;
				$('td', row).unbind('click');
				$('td', row).bind('click', () => {
					self.fillEditor(0, data);
				});
				return row;
			}
	    };
		this.userdtOptions = {
			ajax: this.userDataURL,
			columns: this.user_colDef,
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				const self = this;
				$('td', row).unbind('click');
				$('td', row).bind('click', () => {
					self.fillEditor(1, data);
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
