import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DplayerPageRoutingModule } from './dplayer-routing.module';

import { DplayerPage } from './dplayer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DplayerPageRoutingModule
  ],
  declarations: [DplayerPage]
})
export class DplayerPageModule {}
