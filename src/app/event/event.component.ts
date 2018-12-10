import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
	dtOptions: DataTables.Settings = {};

	commentBuffer = null
	commentBoxToggle = false
	currentEventName = ""

  	constructor() { }

  	showCommentBox(name){
  		// reset
  		this.commentBuffer = null;

  		// load event stuff
  		this.currentEventName = name;

  		this.commentBoxToggle = true;
  	}

  	submitComment(){
  		console.log(this.commentBuffer)
  	}

  	eventCLickHandler(info: any): void {
		this.commentBoxToggle = true
		this.showCommentBox(info.name) // should be id
	}

	ngOnInit() {
		this.dtOptions = {
			ajax: 'assets/eventList_sample.json',
			columns: [{
				title: 'Activity name',
				data: 'name'
			}, {
				title: 'Type',
				data: 'type'
			}, {
				title: 'Date',
				data: 'data'
			}, {
				title: 'Venue',
				data: 'venue'
			}, {
				title: 'Quota',
				data: 'quota'
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
