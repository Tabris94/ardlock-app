import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetupPage } from '../setup/setup';
import { HttpClient} from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-check-setup',
  templateUrl: 'check-setup.html',
})
export class CheckSetupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {  
    let body = {
      isAvaiable: 'getStatus'
    }
    this.http.post('http://192.168.0.1:80',JSON.stringify(body)).subscribe(() => {this.navCtrl.push(SetupPage)});
  }

}
