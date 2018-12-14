import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient , HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
	dtOptions: DataTables.Settings = {};
	objectKeys = Object.keys;

	commentLoading = true
	commentBuffer = null

	postCommentBuffer = []
	commentBoxToggle = false
	currentEventData = {}
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

	host = "http://localhost:8080";
	commentURL= "/event/comment";
	eventListURL = "/event";

  	constructor(private authService: AuthService, private http: HttpClient) {}

  	showCommentBox(data){
  		// reset
  		this.commentBuffer = null;
		this.commentLoading = true

  		// load event stuff
  		this.currentEventData = data;
  		this.commentBoxToggle = true;
  		this.http.get(this.host + this.commentURL+"/"+this.currentEventData["eid"]).subscribe((data) => {
			this.commentLoading = false
			this.postCommentBuffer = data['data']
			console.log(data);
		});
  	}

  	submitComment(){
		this.commentLoading = true
  		console.log(this.commentBuffer)
  		this.http.post(this.host + this.commentURL, 
  			{
  				eid: this.currentEventData["eid"],
  				author: this.authService.username,
  				content: this.commentBuffer,
  			})
  		.subscribe((data) => {
			this.http.get(this.host + this.commentURL+"/"+this.currentEventData["eid"]).subscribe((data) => {
				this.postCommentBuffer = data['data']
				this.commentBuffer = null
				this.commentLoading = false
			});
		});
  	}

  	eventCLickHandler(data: any): void {
		this.commentBoxToggle = true
		this.showCommentBox(data)
	}

	ngOnInit() {
		this.dtOptions = {
			ajax: this.host + this.eventListURL,
			order: [[ 2, "desc" ]],
			autoWidth: false,
			columns: [{
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
			}],
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				const self = this;
				// Unbind first in order to avoid any duplicate handler
				// (see https://github.com/l-lin/angular-datatables/issues/87)
				$('td', row).unbind('click');
				$('td', row).bind('click', () => {
					self.eventCLickHandler(data);
				});
				return row;
			}
	    };
  	}
}
