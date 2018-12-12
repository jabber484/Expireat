import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	private uname = null;
	private pw = null;

	msgToggle = false
	msg = null

	constructor(private authService: AuthService) {}

	ngOnInit() {
	}

	validate($event, uname, pw){
		let msg = "Wrong Credential! Please try again!";
		$event.preventDefault()
		if(!this.authService.login(uname, pw)) this.showMessage(msg, 3)
	}

	showMessage(msg, duration){
		if(!this.msgToggle){
			this.msgToggle = true;
			this.msg = msg

			setTimeout(() => {
				console.log("timeout")
				this.msgToggle = false;
			}, duration*1000);
		}
	}
}


