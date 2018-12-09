import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [
		'./app.component.css',
	]
})
export class Login implements OnInit{
	objectKeys = Object.keys;
	currentSection = "EVENT CATALOG"
	currentIndex = 0

  	isAuth = true
	username = "Niggatron"

	siteNavigation = {
		"EVENT CATALOG": ["Event List"],
		"ADMIN FEATURE": ["Flush Data", "Upload CSV"],
		"ABOUT THIS PROJECT": ["Workload Distribution", "Basic “How-To”",  "Data Schemas", "Frameworks & Libraries", "Academic Honesty"]
	}

	
	ngOnInit() {
  	}

  	navigation_event_click(section, index){
  		this.currentSection = section;
  		this.currentIndex = index;
  	}
}