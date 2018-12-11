import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.css']
})
export class UserActionComponent implements OnInit {
	print = console.log;
	objectKeys = Object.keys;

	showMobileNav = false;
	currentSection = "EVENT CATALOG"
	currentIndex = 0

	siteNavigation = {
		"EVENT CATALOG": ["Event List"],
		"ADMIN FEATURE": ["Event data","User data", "Flush Data", "Upload CSV"],
		"ABOUT THIS PROJECT": ["Workload Distribution", "Basic How-To", "Data Schemas", "Frameworks & Libraries", "Academic Honesty", "To-Do"]
	}

	constructor(private authService: AuthService) {
		if(!this.authService.getAdminStatus()){
			delete this.siteNavigation["ADMIN FEATURE"]
		}
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
  		this.showMobileNav = false;
  		this.currentSection = section;
  		this.currentIndex = index;
  	}
}
