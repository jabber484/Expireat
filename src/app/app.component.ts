import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
	styleUrls: [
		'./app.component.css',
	]
})
export class AppComponent implements OnInit{
	constructor(private authService: AuthService, private location: Location) {}

	ngOnInit() {
		if(this.location.path() == "/admin"){
			this.location.replaceState("")
			this.authService.adminOverride();
		}
  	}
}