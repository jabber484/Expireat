import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	private isAuth = false
	username = ""

	constructor() { }

	login(uname,pw) {
		console.log(uname, pw)
		if(uname == "1"){
			this.isAuth = true;
		}

		return this.isAuth;
	}

	logout(){
		this.username = ""
		this.isAuth = false
	}

	getAuth(){

		return this.isAuth;
	}
}
