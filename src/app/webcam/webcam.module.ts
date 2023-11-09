import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebcamPageRoutingModule } from './webcam-routing.module';

import { WebcamPage } from './webcam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WebcamPageRoutingModule
  ],
  declarations: [WebcamPage]
})
export class WebcamPageModule {}
