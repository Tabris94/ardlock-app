import { Component, Injectable} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegistrationPage} from '../registration/registration';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

@Injectable()
export class LoginPage {

  formgroup: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public formbuilder: FormBuilder, public http: HttpClient,
              private storage: Storage,) {
    this.formgroup = this.formbuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.compose([Validators.minLength(6), Validators.required])],
    });
    this.email = this.formgroup.controls['email'];
    this.password  = this.formgroup.controls['password'];
  }

  ionViewDidEnter(){
    this.storage.get('token').then((val) =>{ if(val) this.navCtrl.push(HomePage)});
  }

  send(){
    let body = {
      email: this.email.value,
      password: this.password.value,
    }

    let headers = {
      'Content-Type' : 'application/json'
    };

    let request = this.http.post('http://3.89.126.2:5000/Api/App/login',body,{headers:headers});
    request.subscribe((response) => this.memorize(response), (error) => console.log(error.status))

  }

  memorize(token){
    this.storage.set('token', token.token);
    this.storage.set('email', this.email.value);
    this.navCtrl.push(HomePage);
  }

  move(){
    this.navCtrl.push(RegistrationPage);
  }
}
