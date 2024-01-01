import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { SafePipeModule } from 'safe-pipe';

import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule,BrowserModule, IonicModule.forRoot({ innerHTMLTemplatesEnabled: true }), AppRoutingModule, SafePipeModule, HttpClientModule],
  providers: [ScreenOrientation, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
