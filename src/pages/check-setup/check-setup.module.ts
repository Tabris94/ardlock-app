import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckSetupPage } from './check-setup';

@NgModule({
  declarations: [
    CheckSetupPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckSetupPage),
  ],
})
export class CheckSetupPageModule {}
