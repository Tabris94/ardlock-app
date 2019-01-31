import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
})

export class SetupPage {
  step = 1;
  formgroup: FormGroup;
  passwordAccount: AbstractControl;
  label1: AbstractControl;
  label2: AbstractControl;
  password: AbstractControl;
  passwordConfirm: AbstractControl;
  ssid: AbstractControl;
  passwordWifi: AbstractControl;
  wrongAccountPassword = false;
  passwordDoesntMatch = false;
  email;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formbuilder: FormBuilder, public http: HttpClient, 
              public storage: Storage) {
      this.formgroup = this.formbuilder.group({
        passwordAccount: ['',Validators.required],
        label1: ['',Validators.required],
        label2: ['',Validators.required],
        password: ['',Validators.compose([Validators.minLength(6), Validators.required])],
        passwordConfirm: ['',Validators.compose([Validators.minLength(6), Validators.required])],
        ssid: ['', Validators.required],
        passwordWifi: ['', Validators.required],
      });
      this.passwordAccount = this.formgroup.controls['passwordAccount'];
      this.label1 = this.formgroup.controls['label1'];
      this.label2 = this.formgroup.controls['label2'];
      this.password  = this.formgroup.controls['password'];
      this.passwordConfirm = this.formgroup.controls['passwordConfirm'];
      this.ssid= this.formgroup.controls['ssid'];
      this.passwordWifi= this.formgroup.controls['passwordWifi'];
      this.storage.get('email').then((val) => this.email = val);
  }

  ionViewDidLoad() {
  }

  stepForward(){
    switch(this.step){
      case 1: this.step++; break;
      case 2: this.checkPassword(); break;
      case 3: this.send(); break;
    }
  }

  checkPassword(){
    if(this.password.value == this.passwordConfirm.value) this.step++;
    else this.passwordDoesntMatch = true;
  }

  send(){
    let body = {
      email: this.email,     
      SSID: this.ssid.value,
      pwd: this.passwordWifi.value,
      label1: this.label1.value,
      label2: this.label2.value,
      password: this.password.value,
    }
    this.http.post('http://192.168.0.1:80',JSON.stringify(body)).subscribe(() => {this.navCtrl.push(HomePage)});
  }

}
