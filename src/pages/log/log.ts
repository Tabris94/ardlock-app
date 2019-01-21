import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-log',
  templateUrl: 'log.html',
})

@Injectable()
export class LogPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private storage: Storage,) {
  }

  token;
  logs = [];

  getToken(){
    this.storage.get('token').then((val) =>  {this.token = val; this.get();});
  }

  ionViewDidLoad() {
    this.getToken()
  }

  get(){
    let headers = {
      'Content-Type' : 'application/json'
    }
    let body ={
      token: this.token
    }
    let request = this.http.post('http://127.0.0.1:5000/Api/App/getLog',body,{headers:headers});
    request.subscribe((response) => { console.log(response)});
  }

  back(){
    this.navCtrl.push(HomePage);
  }

}
