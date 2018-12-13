import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions ={
	headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})

export class AuthService {
	private userUrl = 'http://localhost:8080/user';
	private isAdmin = false
	private isAuth = false
	username = ""

	constructor(
		private http: HttpClient
	) {	}

	adminOverride(){
		this.username = "Admin"
		this.isAuth = true
		this.isAdmin = true
	}

	login(uname,pw) {
		console.log(uname, pw)
		const url = `${this.userUrl}/login`;
		return this.http.post(url,{	
			"uname": uname,
			"pw": pw
		},httpOptions).subscribe(
			data => {
				console.log(data['isAuth']);
				this.isAuth = data['isAuth'];
			},
			error => {
				console.log("Error")
			}
		);
		// if(uname == "1"){
		// 	this.isAuth = true;
		// }
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
