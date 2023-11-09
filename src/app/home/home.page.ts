import { Component } from '@angular/core';
import { ChannelsService } from '../channels.service';
import { GlobalVarService } from '../global-var.service';
import { LoadingController, isPlatform } from '@ionic/angular';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import {
  AdMob,
  AdMobRewardItem,
  AdOptions,
  BannerAdOptions,
  BannerAdPosition,
  BannerAdSize,
  RewardAdOptions,
  RewardAdPluginEvents
} from '@capacitor-community/admob'

declare var VideoHls: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [ChannelsService]
})
export class HomePage {
  channels: any;
  channelsBackUp: any;
  rewardBlocked: any;
  category: any
  categories: any;
  parrilla: any;
  htmlSelectOption: any;
  selected_value: string = '';

  constructor(private channelService: ChannelsService, private loadingCtrl: LoadingController, private globalVar: GlobalVarService, private so: ScreenOrientation, private sanitizer: DomSanitizer) { }


  async ionViewWillEnter() {
    this.lockToPortrait();
    this.initialize();
    new VideoHls('', 'stop');
    this.getChannels();

  }

  async getChannels() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando canales',
    });
    loading.present();
    this.channelService.getChannels().subscribe((data) => {
      this.channels = data;
      this.channelsBackUp = data;
      this.getParrilla();
      this.category = this.globalVar.getGlobalCategory();
      this.listCategories();
      this.getCategory(this.category);
      loading.dismiss();
    });
  }

  async getParrilla() {
    this.channelService.getParrilla().subscribe((data) => {

      this.parrilla = data;
      
      for (let i = 0; i < this.channels.length; i++) {
        for (let j = 0; j < this.parrilla.length; j++) {
          if (this.channels[i].id == this.parrilla[j].id) {
            this.channels[i].parrilla = this.parrilla[j].parrilla;
            this.channels[i].transmitiendo.current = this.getCurrentPrograma(this.channels[i].parrilla);
            this.channels[i].transmitiendo.next = this.getNextPrograma(this.channels[i].parrilla);
          } else {
            this.channels[i].parrilla = [];
          }
        }
      }

      console.log(this.channels);

    });
  }

  getCurrentPrograma(x: any) {
    let y: string = '';
    let today = new Date();

    for (let i = 0; i < x.length; i++) {

      const inicio = new Date(x[i].hora);
      let fin;
      if (i < x.length - 1) {
        fin = new Date(x[i + 1].hora);
      } else {
        fin = new Date().setHours(today.getHours() + 1);
      }

      if (today > inicio && today < fin) {
        y = inicio.toLocaleTimeString().slice(0, -3) + ' ' + x[i].programa + '';
      }

    }
    return y;
  }

  getNextPrograma(x: any) {
    let y: string = '';
    let today = new Date();

    for (let i = 0; i < x.length - 1; i++) {
      const inicio = new Date(x[i].hora);
      const fin = new Date(x[i + 1].hora);

      if (today > inicio && today < fin) {
        y = fin.toLocaleTimeString().slice(0, -3) + ' ' + x[i + 1].programa + '';
      }
    }
    return y;
  }

  async getCategory(c: string) {
    if (c === 'todos' || c === '' || c === undefined) {
      this.channels = this.channelsBackUp;
      this.globalVar.setGlobalCategory('todos');
    } else {
      this.channels = [];
      for (var obj of this.channelsBackUp) {
        if (obj.categoria === c) {
          this.channels.push(obj);
        }
        this.globalVar.setGlobalCategory(c);
      }
    }

    this.htmlSelectOption = `<ion-select-option color="light" value="todos" class="ion-text-capitalize">Todos</ion-select-option>`;

    for (var x of this.categories) {
      this.htmlSelectOption = this.htmlSelectOption + `<ion-select-option color="light" value="${x}" class="ion-text-capitalize">${x}</ion-select-option>`;
    }

    this.htmlSelectOption = this.getSanitizedHtml(this.htmlSelectOption);
  }
  async listCategories() {
    this.categories = [];
    for (let i = 0; i < this.channels.length; i++) {
      this.categories.push(this.channels[i].categoria);
    }

    this.categories = [...new Set(this.categories)];
  }


  async initialize() {
    const { status } = await AdMob.trackingAuthorizationStatus();

    console.log(status);

    if (status === 'notDetermined') {
      console.log('Display information before ads load first time');
    }

    AdMob.initialize({
      requestTrackingAuthorization: true,
      testingDevices: ['735978b4-219f-4d70-bade-7eb4b808ac5d'],
      initializeForTesting: false,
    });

    this.showBanner();
  }

  async showBanner() {
    const adId = isPlatform('ios') ? 'ios-ad-ad' : 'android-ad-unit';

    const options: BannerAdOptions = {
      adId: 'ca-app-pub-4427288659732696/5842196102',
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: false,
    }

    await AdMob.showBanner(options);
  }

  async hideBanner() {
    // await AdMob.hideBanner();

    await AdMob.removeBanner();
  }

  async showRewardVideo() {

    this.rewardBlocked = true;

    AdMob.addListener(
      RewardAdPluginEvents.Rewarded,
      (reward: AdMobRewardItem) => {
        console.log('REWARD: ', reward);
      }
    );

    const options: RewardAdOptions = {
      adId: 'ca-app-pub-4427288659732696/9515865157',
      // npa: true,
      // ssv: {}
      isTesting: false,
    }

    await AdMob.prepareRewardVideoAd(options);
    await AdMob.showRewardVideoAd();

  }

  // Lock to portrait
  lockToPortrait() {
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
  }
  // Lock to landscape
  lockToLandscape() {
    this.so.lock(this.so.ORIENTATIONS.LANDSCAPE);
  }

  // Unlock screen orientation 
  unlockScreenOrientation() {
    this.so.unlock();
  }

  getSanitizedHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  handleChange(e: any) {
    // console.log('ionChange fired with value: ' + e.detail.value);
    this.getCategory(e.detail.value);
  }

}
