import { Component, HostListener, ViewChild } from '@angular/core';
import { ChannelsService } from '../channels.service';
import { GlobalVarService } from '../global-var.service';
import { LoadingController, isPlatform } from '@ionic/angular';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AlertController } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { MenuController } from '@ionic/angular';
import { Optional } from '@angular/core';
import { App } from '@capacitor/app';

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
  channelModal: any;
  isModalOpen = false;
  isModalShareAppOpen = false;
  diaParrilla: string = '';
  diaNombreyMesParrilla: any;
  nombreDias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  nombreMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  modalParrilla: any;
  aspck: number = 0;
  isMobile: any;
  statusChannels: any;
  DesktopMenuIsLocked: boolean = false;
  dateYear = new Date().getFullYear();

  constructor(private channelService: ChannelsService,
    private loadingCtrl: LoadingController,
    private globalVar: GlobalVarService,
    private so: ScreenOrientation,
    private sanitizer: DomSanitizer,
    private alertController: AlertController,
    private platform: Platform,
    private menuCtrl: MenuController
    ) { }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' && !this.globalVar.getExitDialog()) {
      this.openDesktoptMenu(true);
    } else if (event.key === 'ArrowRight') {
      this.openDesktoptMenu(false);
    }
  }

  async ionViewWillEnter() {

    this.isMobile = this.globalVar.isMobile();

    if (this.isMobile) {
      this.lockToPortrait();
      this.platform.ready().then(() => {
        StatusBar.show();
      });
    }
    new VideoHls('', 'stop', this.isMobile);
    if (this.globalVar.getFirstLoadingChannels()) {
      await this.getChannels();
    } else {
      await this.getStatusChannels();
      await this.getParrilla();
    }
    this.showAds();
  }

  async getChannels() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando canales',
    });
    loading.present();
    this.channelService.getChannels().subscribe((data) => {
      this.channels = data;
      this.channelsBackUp = data;
      if (this.globalVar.getFirstLoadingChannels()) {
        this.getParrilla();
        this.getStatusChannels();
      }
      this.category = this.globalVar.getGlobalCategory();
      this.listCategories();
      this.getCategory(this.category);
      loading.dismiss();
      this.globalVar.setFirstLoadingChannels(false);
    });

  }
  async updateChannels() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando canales',
    });
    loading.present();
    this.channelService.getChannels().subscribe((data) => {
      this.channels = data;
      this.channelsBackUp = data;
      this.getParrilla();
      this.getStatusChannels();
      this.category = this.globalVar.getGlobalCategory();
      this.listCategories();
      this.getCategory(this.category);
      loading.dismiss();
      this.globalVar.setFirstLoadingChannels(false);
    });
  }

  async getStatusChannels() {
    this.channelService.getStatusChannels().subscribe((data) => {
      this.statusChannels = data;
      for (let i = 0; i < this.channels.length; i++) {
        for (let j = 0; j < this.statusChannels.length; j++) {
          if (this.channels[i].id == this.statusChannels[j].id) {
            this.channels[i].estado = this.statusChannels[j].estado;
          }
        }
      }
    });
  }

  async getParrilla() {
    this.channelService.getParrilla().subscribe((data) => {

      this.parrilla = data;

      for (let i = 0; i < this.channels.length; i++) {
        this.channels[i].parrilla = [];
        for (let j = 0; j < this.parrilla.length; j++) {
          if (this.channels[i].id == this.parrilla[j].id) {

            this.channels[i].parrilla = this.parrilla[j].parrilla;
            this.channelsBackUp[i].parrilla = this.parrilla[j].parrilla;

            this.channels[i].transmitiendo.current = this.getCurrentPrograma(this.parrilla[j].parrilla);
            this.channels[i].transmitiendo.next = this.getNextPrograma(this.parrilla[j].parrilla);


            this.channelsBackUp[i].transmitiendo.current = this.getCurrentPrograma(this.parrilla[j].parrilla);
            this.channelsBackUp[i].transmitiendo.next = this.getNextPrograma(this.parrilla[j].parrilla);
          }
        }
      }
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
        y = x[i].horaNormal + ' ' + x[i].programa + '';
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
        y = x[i + 1].horaNormal + ' ' + x[i + 1].programa + '';
      }
    }
    this.diaParrilla = new Date(x[0].hora).toLocaleDateString();
    this.diaNombreyMesParrilla = { dia: this.nombreDias[new Date(x[0].hora).getDay()], numeroDia: new Date(x[0].hora).getDate(), mes: this.nombreMeses[new Date(x[0].hora).getMonth()], year: new Date(x[0].hora).getFullYear() };
    return y;
  }

  async getCategory(c: string) {

    if (c === 'todos' || c === '' || c === undefined) {
      if (this.isMobile) {

        this.globalVar.setGlobalCategory('todos');

        for (let i = 0; i < this.channels.length; i++) {
          this.channels[i].enabled = true;
        }

      } else {
        this.globalVar.setGlobalCategory(this.categories[0]);

        this.category = this.globalVar.getGlobalCategory();

        for (let i = 0; i < this.channels.length; i++) {
          if (this.channels[i].categoria === this.globalVar.getGlobalCategory()) {
            this.channels[i].enabled = true;
          } else {
            this.channels[i].enabled = false;
          }

        }

      }

    } else {

      for (let i = 0; i < this.channels.length; i++) {
        if (this.channels[i].categoria === c) {
          this.channels[i].enabled = true;
        } else {
          this.channels[i].enabled = false;
        }

      }

      this.category = c;

    }

    this.globalVar.setGlobalCategory(c);

    if (this.isMobile) {
      this.htmlSelectOption = `<ion-select-option color="light" value="todos" class="ion-text-capitalize">Todos</ion-select-option>`;

      for (var x of this.categories) {
        this.htmlSelectOption = this.htmlSelectOption + `<ion-select-option color="light" value="${x}" class="ion-text-capitalize">${x}</ion-select-option>`;
      }

      this.htmlSelectOption = this.getSanitizedHtml(this.htmlSelectOption);
    }
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

    // console.log(status);

    if (status === 'notDetermined') {
      // console.log('Display information before ads load first time');
    }

    AdMob.initialize({
      requestTrackingAuthorization: true,
      testingDevices: ['735978b4-219f-4d70-bade-7eb4b808ac5d'],
      initializeForTesting: false,
    });
  }

  async showInterstitial() {

    const options: AdOptions = {
      adId: 'ca-app-pub-4427288659732696/1947824722',
      isTesting: false,
    }

    await AdMob.prepareInterstitial(options);
    await AdMob.showInterstitial();
  }


  //::::::No se usa pero hay que revisarlo ya que no se ejecuta::::::::::
  // async showRewardVideo() {

  //   AdMob.addListener(
  //     RewardAdPluginEvents.Rewarded,
  //     (reward: AdMobRewardItem) => {
  //       console.log('REWARD: ', reward);
  //     }
  //   );

  //   const options: RewardAdOptions = {
  //     adId: 'ca-app-pub-4427288659732696/5982400519',
  //     isTesting: false,
  //   }

  //   await AdMob.prepareRewardVideoAd(options);
  //   await AdMob.showRewardVideoAd();
  // }

  async showAds() {
    if (this.isMobile) {
        this.initialize();
      if (this.globalVar.getNumberForAds() % 2 != 0 && localStorage.getItem('xa88') === null) {
        await this.showInterstitial();
        this.globalVar.setNumberForAds(this.globalVar.getNumberForAds() + 1);
      } else {
        this.globalVar.setNumberForAds(this.globalVar.getNumberForAds() + 1);
      }
    }
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

  //MODAL PROGRAMACION DEL CANAL O PARRILLA O COMO SE LLAME

  setOpen(isOpen: boolean, ch?: any) {
    if (isOpen) {
      this.channelModal = ch;
      this.channelModal.diaParrilla = this.diaParrilla;
      this.channelModal.dia = this.diaNombreyMesParrilla.dia;
      this.channelModal.numeroDia = this.diaNombreyMesParrilla.numeroDia;
      this.channelModal.mes = this.diaNombreyMesParrilla.mes;
      this.channelModal.year = this.diaNombreyMesParrilla.year;
      this.modalParrilla = this.channelModal.parrilla;
      this.isModalOpen = isOpen;
      this.modalParrilla.current = ch.transmitiendo;
      this.DesktopMenuIsLocked = true;
    } else {
      this.isModalOpen = isOpen;
      this.modalParrilla = [];
      this.channelModal = [];
      this.DesktopMenuIsLocked = false;
    }
  }

  //:::::::ABRE MODAL PARA COMPARTIR LA APP CON POTENCIALES USUARIOS:::::::::
  openShareAppModal(isOpen: boolean) {
    this.isModalShareAppOpen = isOpen;
  }

  //::::::::PARA COMPARTIR CON APPS DE VIDEO EXTERNAS:::::::::
  async openChannelUrl(url: string, id: string) {
    if(this.globalVar.getNumberForAds() % 2 != 0  && localStorage.getItem('xa88') === null){
      const loading = await this.loadingCtrl.create({
        // message: 'Cargando canales',
        duration: 5000,
      });
      loading.present();
      await this.showAds();
    }else{
      this.globalVar.setNumberForAds(this.globalVar.getNumberForAds() + 1);
      switch (id) {
        case 'chilevision':
          this.channelService.getChilevision().subscribe(async (data) => {
            let t = data;
            url = 'https://mdstrm.com/live-stream-playlist/63ee47e1daeeb80a30d98ef4.m3u8?access_token=' + t.token;
            await Share.share({
              title: 'Selecciona aplicacion de video',
              url: url,
              dialogTitle: 'Selecciona aplicacion de video',
            });
          });
          break;
        case 'canal13':
          this.channelService.getCanal13().subscribe(async (data) => {
            let t = data;
            url = 'https://origin.dpsgo.com/ssai/event/bFL1IVq9RNGlWQaqgiFuNw/master.m3u8?auth-token=' + t.data.authToken;
            await Share.share({
              title: 'Selecciona aplicacion de video',
              url: url,
              dialogTitle: 'Selecciona aplicacion de video',
            });
          });
          break;
        default:
          await Share.share({
            title: 'Selecciona aplicacion de video',
            url: url,
            dialogTitle: 'Selecciona aplicacion de video',
          });
      }
    }

  }

  //:::::::PARA COMPARTIR EN REDES SOCIALES::::::
  async openShareApp() {
    await Share.share({
      title: 'Comparténos!',
      url: 'https://play.google.com/store/apps/details?id=com.defilippi.flytv',
      dialogTitle: 'Selecciona aplicacion',
      text: 'Prueba la aplicacion de Tv En vivo Fly TV, disponible en Google Play',
    });
  }

  //::::::PARA QUE REBOTE LA PELOTA::::::
  bounceBaloon() {
    this.aspck = this.aspck + 1;
    if (this.aspck == 20) {
      this.aspck = 0;
      localStorage.setItem('xa88', '1');
      this.updateChannels();
    }
  }

  //::::::ABRE EL MENU DE CATEGORIAS EN LA VERSION DESKTOP O ATV::::::
  openDesktoptMenu(x: boolean) {
    if (!this.DesktopMenuIsLocked) {
      if (x) {
        this.menuCtrl.open('first-menu');
      } else {
        this.menuCtrl.close('first-menu');
      }
    }
  }
  
  //:::::::SOLO PARA EXCEPCIONES EN CASO QUE SE NECESITE QUE EL CURSOR QUEDE EN EL LUGAR DONDE SE ASIGNE ESTA FUNCION::::: 
  emptyFunction() {
    return false;
  }
}
