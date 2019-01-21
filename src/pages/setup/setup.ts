import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
})

export class SetupPage {

  step = 0;
  formgroup: FormGroup;
  passwordAccount: AbstractControl;
  label1: AbstractControl;
  label2: AbstractControl;
  password: AbstractControl;
  passwordConfirm: AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formbuilder: FormBuilder,) {
      this.formgroup = this.formbuilder.group({
        passwordAccount: ['',Validators.required],
        label1: ['',Validators.required],
        label2: ['',Validators.required],
        password: ['',Validators.compose([Validators.minLength(6), Validators.required])],
        passwordConfirm: ['',Validators.compose([Validators.minLength(6), Validators.required])],
      });
      this.passwordAccount = this.formgroup.controls['passwordAccount'];
      this.label1 = this.formgroup.controls['label1'];
      this.label2 = this.formgroup.controls['label2'];
      this.password  = this.formgroup.controls['password'];
      this.passwordConfirm = this.formgroup.controls['passwordConfirm'];
  }

  ionViewDidLoad() {
  }

  stepForward(){
    switch(this.step){
      case 0 : this.checkPassword(); break;
      case 1 : console.log("Step2"); this.step++; break;
      case 2 : this.checkPasswordConfirm(); break;
      case 3 : this.send(); break;
    }
  }

  checkPassword(){
    console.log("Step1");
    this.step++;
  }

  checkPasswordConfirm(){
    this.send();
  }

  send(){
    console.log("Step3");
  }

}
