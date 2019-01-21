import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { CheckSetupPage } from '../check-setup/check-setup';
import { LogPage } from '../log/log';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public http: HttpClient,
              private storage: Storage, public alertController: AlertController,) {
  }
  alert;
  token;
  mat;
  labelFirst;
  labelSecond;
  statusFirst;
  statusSecond;
  password = "";

  ionViewDidEnter(){
    this.getToken();
  }

  getToken(){
    this.storage.get('token').then((val) => {this.token = val; this.update()});
  }

  update(){
    let body = {
      token: this.token,
    }

    let headers = {
      'Content-Type' : 'application/json'
    }

    let request = this.http.post('http://127.0.0.1:5000/Api/App/getArdulocks',body,{headers:headers});
    request.subscribe((response) => this.getDevice(response), (error) => {
      if(error.status != 401){
          this.sessionExspired();  
          this.alertController.create({
            title: "Sessione Scaduta",
            buttons: ['Chiudi',]
          }).present();
      }
      else{
       this.password=""; 
       this.alertController.create({
        title: "Errore Imprevisto",
        buttons: ['Chiudi',]
      });
      }
    });

  }

  add(){
    this.alert = this.alertController.create({
      title: 'Inserisci la password di sicurezza',
      buttons: [{
                text:'Conferma',
                handler: data => { this.password = data.password },
              }],
      inputs: [
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password',
        }
      ],
    });
    this.alert.onDidDismiss(()=>{
      this.navCtrl.push(CheckSetupPage);
    });
    if(this.password=="") this.alert.present();
    else this.navCtrl.push(CheckSetupPage);
  }

  getPassowrd(){
      let alert = this.alertController.create({
        title: 'Inserisci la password di sicurezza',
        buttons: [{
                  text:'Conferma',
                  handler: data => { this.password = data.password },
                }],
        inputs: [
          {
            name: 'password',
            placeholder: 'Password',
            type: 'password',
          }
        ],
      });
      alert.onDidDismiss(() => {
        this.sendStatusChange();
      })
      if(this.password=="") alert.present();
      else this.sendStatusChange()
  }

  change(){
    this.getPassowrd();
  }

  sendStatusChange(){
    let body = {
      token: this.token,
      first: this.statusFirst,
      second: this.statusSecond,
      password: this.password,
    };

    let headers = {
      'Content-Type' : 'application/json'
    };

    let request = this.http.post('http://127.0.0.1:5000/Api/App/setStatus',body,{headers:headers});
      request.subscribe(() => {}, (error) => {
        let alert2;
        if(error.status = 400){
          alert2 =  this.alertController.create({
            title: "Password Errata",
            buttons: ['Chiudi',]
          });
        }
        else{
          alert2 = this.alertController.create({
            title: "Errore Imprevisto",
            buttons: ['Chiudi',]
          });
        }
        alert2.present();
        this.password='';
    });
  }

  log(){
    this.navCtrl.push(LogPage);
  }

  lock(){
    if(!(this.statusFirst && this.statusSecond)) {
      this.statusFirst = true;
      this.statusSecond = true;
      this.getPassowrd();
    }
    else {
      
      this.statusFirst = false;
      this.statusSecond = false;
      this.getPassowrd();
    }
  }

  sessionExspired(){
    this.storage.clear(); 
    this.navCtrl.setRoot(LoginPage);
  }

  getDevice(device){
    this.mat = device.mat;
    this.labelFirst = device.labelFirstSensor;
    this.labelSecond = device.labelSecondSensor;
    this.statusFirst = device.statusFirstSensor;
    this.statusSecond = device.statusSecondSensor;
  }
}
