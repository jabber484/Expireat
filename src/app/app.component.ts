import { Component, OnInit} from '@angular/core';
import { WOW } from 'wowjs/dist/wow.min';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../assets/css/switch.css']
})
export class AppComponent implements OnInit{
	cart = [[],[],[]];
	data = {
		food: [
			{title: "TULIP 午餐肉 340g", price: 15, date: "13/3/2019",img: "https://scontent.fhkg3-1.fna.fbcdn.net/v/t45.5328-0/c0.0.540.540/p180x540/37066920_1773789932700711_4165370828256444416_n.jpg?_nc_cat=109&_nc_ht=scontent.fhkg3-1.fna&oh=139caf8d065f3cd247f73f4d892ff5e4&oe=5C739A64"},
			{title: "Kettle 美國薯片 - 木燻海鹽味", price: 15, date: "17/11/2018",img: "https://scontent.fhkg3-2.fna.fbcdn.net/v/t45.5328-0/c0.0.540.540/p180x540/44323782_2194252373953418_1300811432064974848_n.jpg?_nc_cat=103&_nc_ht=scontent.fhkg3-2.fna&oh=4b94b30dd763f62194795ff87b8b867f&oe=5CAD0753"},	
		],
		drinks: [
			{title: "CocaCola 透明可樂 500ml", price: 5, date: "13/3/2019",img: "https://scontent.fhkg3-2.fna.fbcdn.net/v/t45.5328-0/c0.0.540.540/p180x540/39965343_2086513661419950_3275374564242096128_n.jpg?_nc_cat=102&_nc_ht=scontent.fhkg3-2.fna&oh=7e94e694f70dee9fd426169079a1c973&oe=5C81FC6C"},
			{title: "大森屋 蜆貝昆布湯10入", price: 12.00, date: "13/3/2019",img: "https://scontent.fhkg3-1.fna.fbcdn.net/v/t45.5328-0/c0.0.540.540/p180x540/42650786_1914903931909924_5361738452503101440_n.jpg?_nc_cat=110&_nc_ht=scontent.fhkg3-1.fna&oh=dcc1de0b05542bd88ce6e3b98a224e89&oe=5C69FAD4"},
		],
		ingredients: [
			{title: "Inka 有機白藜麥 450g", price: 35, date: "30/6/2019",img: "https://scontent.fhkg3-1.fna.fbcdn.net/v/t45.5328-0/c0.0.540.540/p180x540/41634704_1890221644397748_1816979111344603136_n.jpg?_nc_cat=104&_nc_ht=scontent.fhkg3-1.fna&oh=007d0b302f03493f656bceb49a11c092&oe=5C6D58B1"},
			{title: "Healthy Farm 有機紅藜麥 1KG", price: 98, date: "31/3/2020",img: "https://scontent.fhkg3-1.fna.fbcdn.net/v/t45.5328-0/c0.0.540.540/p180x540/43582013_2118571088167313_6496528507856748544_n.jpg?_nc_cat=107&_nc_ht=scontent.fhkg3-1.fna&oh=718de6bbd2b92d19c445b050c8e8b4a6&oe=5C699AF5"},
		],
	};

	finalList = [];

	ngOnInit() {
    	new WOW().init();

    	for (var i = 0, len = Object.keys(this.data).length; i < len; i++) {
	    	for (var j= 0, lenj = this.data[Object.keys(this.data)[i]].length; j < lenj; j++) {
		  		this.cart[i][j] = 0;
			}
		}
  	}

  	shoppingCart(which, i, v){
  		// let list = which == 0 ? this.food : which == 1 ? this.drinks : this.ingredients;
  		this.cart[which][i] = this.cart[which][i] == null ? 0 : this.cart[which][i] + v < 0 ? 0 : this.cart[which][i] + v;
  		console.log(this.cart);
  	}

  	UpdateCartList(){
  		this.finalList = [];
  		for (var i = 0, len = this.cart.length; i < len; i++) {
	    	for (var j= 0, lenj = this.cart[i].length; j < lenj; j++) {
		  		if(this.cart[i][j] > 0) this.finalList.push( 
		  			Object.assign( {}, this.data[Object.keys(this.data)[i]][j], {quantity: this.cart[i][j]} )
		  		);
			}
		}
  	}
}
