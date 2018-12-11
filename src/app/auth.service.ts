import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
	private isAdmin = false
	private isAuth = false
	username = ""

	constructor() {	}

	adminOverride(){
		this.username = "Admin"
		this.isAuth = true
		this.isAdmin = true
	}

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
		this.isAdmin = false
	}

	getAuth(){

		return this.isAuth;
	}

	getAdminStatus(){

		return this.isAdmin;
	}
}
