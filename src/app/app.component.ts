import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [
		'./app.component.css',
	]
})
export class Login implements OnInit{
	print = console.log;
	objectKeys = Object.keys;

	showMobileNav = false;
	currentSection = "ADMIN FEATURE"
	currentIndex = 0

  	isAuth = true
	username = "Niggatron"

	siteNavigation = {
		"EVENT CATALOG": ["Event List"],
		"ADMIN FEATURE": ["Event data","User data", "Flush Data", "Upload CSV"],
		"ABOUT THIS PROJECT": ["Workload Distribution", "Basic How-To", "Data Schemas", "Frameworks & Libraries", "Academic Honesty", "To-Do"]
	}
	
	ngOnInit() {
  	}

  	moblieNavToggle(){
  		this.showMobileNav = !this.showMobileNav;
  	}

  	stringToID(input){
		return input.replace(" ", "").toLowerCase();
  	}

  	navigation_event_click(section, index){
  		this.currentSection = section;
  		this.currentIndex = index;
  	}
}