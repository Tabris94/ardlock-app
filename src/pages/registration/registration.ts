import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http'

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})

@Injectable()
export class RegistrationPage {

  formgroup: FormGroup;
  firstname: AbstractControl;
  lastname: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  passwordconfirm: AbstractControl;
  flag = false;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public formbuilder: FormBuilder, public http: HttpClient) {
  
    this.formgroup = this.formbuilder.group({
      firstname: ['', Validators.required],
      lastname: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.compose([Validators.minLength(6), Validators.required])],
      passwordconfirm: ['',Validators.compose([Validators.minLength(6), Validators.required])],
    })

    this.firstname = this.formgroup.controls['firstname'];
    this.lastname = this.formgroup.controls['lastname'];
    this.email = this.formgroup.controls['email'];
    this.password  = this.formgroup.controls['password'];
    this.passwordconfirm = this.formgroup.controls['passwordconfirm'];
  }
  
  validate(){
    if(this.password.value!=this.passwordconfirm.value) this.flag=true;
    else this.send();
  }

  send(){
    let body = {
      email: this.email.value,
      first_name: this.firstname.value,
      last_name: this.lastname.value,
      password: this.password.value,
    }

    let headers = {
      'Content-Type' : 'application/json'
    }

    let request = this.http.post('http://127.0.0.1:5000/Api/App/registration',body,{headers:headers});
    request.subscribe((response) => console.log(response));
  }
}
