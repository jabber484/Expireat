import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
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
	id = ""
	favList = []

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
		},httpOptions).pipe(
			map(data => {
				console.log(data);
				this.isAuth = data['isAuth'];
				this.username = data['userName'];
				this.id = data['_id'];
				this.favList = data['favList'];
			}
		))
	}

	logout(){
		this.username = ""
		this.id = ""
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
