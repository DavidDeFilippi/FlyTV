import { Component, HostListener } from '@angular/core';
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
  diaParrilla: string = '';
  diaNombreyMesParrilla: any;
  nombreDias = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
  nombreMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  modalParrilla: any;
  aspck: number = 0;
  isMobile: any;
  statusChannels: any;
  DesktopMenuIsLocked: boolean = false;

  constructor(private channelService: ChannelsService, 
              private loadingCtrl: LoadingController, 
              private globalVar: GlobalVarService, 
              private so: ScreenOrientation, 
              private sanitizer: DomSanitizer, 
              private alertController: AlertController,
              private platform: Platform,
              private menuCtrl: MenuController) {}

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent){
    if(event.key === 'ArrowLeft'){
      this.DesktoptMenu(true);
    }else if(event.key === 'ArrowRight'){
      this.DesktoptMenu(false);
    }
  }

  async ionViewWillEnter() {

    this.isMobile = this.globalVar.isMobile();

    if(this.isMobile){
      this.lockToPortrait();

      if(this.globalVar.getNumberForAds() % 2 != 0){
        this.initialize();
        this.globalVar.setNumberForAds(this.globalVar.getNumberForAds() + 1);
      }else{
        this.globalVar.setNumberForAds(this.globalVar.getNumberForAds() + 1);
      }

      this.platform.ready().then(() => {
        StatusBar.show();
      });
    }

    new VideoHls('', 'stop', this.isMobile);
    if(this.globalVar.getFirstLoadingChannels()){
      await this.getChannels();
    }else{
      await this.getStatusChannels();
      await this.getParrilla();
    }

  }

  async getChannels() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando canales',
    });
    loading.present();
    this.channelService.getChannels().subscribe((data) => {
      this.channels = data;
      this.channelsBackUp = data;
      if(this.globalVar.getFirstLoadingChannels()){
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

  async getStatusChannels() {
    this.channelService.getStatusChannels().subscribe((data) => {
      this.statusChannels = data;
      for (let i = 0; i < this.statusChannels.length; i++) {
        if(this.channels[i].id == this.statusChannels[i].id){
          this.channels[i].estado = this.statusChannels[i].estado;
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
    this.diaNombreyMesParrilla = {dia: this.nombreDias[new Date(x[0].hora).getDay()], numeroDia: new Date(x[0].hora).getDate(), mes: this.nombreMeses[new Date(x[0].hora).getMonth()], year: new Date(x[0].hora).getFullYear()};
    return y;
  }

  async getCategory(c: string) {
    
    if (c === 'todos' || c === '' || c === undefined) {
      if(this.isMobile){

        this.globalVar.setGlobalCategory('todos');

        for (let i = 0; i < this.channels.length; i++) {
          this.channels[i].enabled = true;
        }

      }else{
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

    if(this.isMobile){
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

    console.log(status);

    if (status === 'notDetermined') {
      console.log('Display information before ads load first time');
    }

    AdMob.initialize({
      requestTrackingAuthorization: true,
      testingDevices: ['735978b4-219f-4d70-bade-7eb4b808ac5d'],
      initializeForTesting: false,
    });

    this.showInterstitial();
  }

  async showInterstitial(){

    const options: AdOptions = {
      adId: 'ca-app-pub-4427288659732696/1947824722',
      isTesting: false,
    }

    await AdMob.prepareInterstitial(options);
    await AdMob.showInterstitial();

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

  //MODAL PROGRAMACION

  setOpen(isOpen: boolean, ch?: any) {
    if(isOpen){
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
    }else{
      this.isModalOpen = isOpen;
      this.modalParrilla = [];
      this.channelModal = [];
      this.DesktopMenuIsLocked = false;
    } 
  }

  //Share para compartir a apps externas
  async openChannelUrl(url: string){
    await Share.share({
      title: 'Selecciona aplicacion de video',
      url: url,
      dialogTitle: 'Selecciona aplicacion de video',
    });
  }

  bounceBaloon() {
    this.aspck = this.aspck + 1;
    if(this.aspck == 20){
      this.aspck = 0;
      localStorage.setItem('xa88','1');
      this.getChannels();
    }
  }

  DesktoptMenu(x: boolean) {
    if(!this.DesktopMenuIsLocked){
      if(x){
        this.menuCtrl.open('first-menu');
      }else{
        this.menuCtrl.close('first-menu');
      }
    }
  }

  blockDesktopMenu(x: boolean){
      if(x){
        this.DesktopMenuIsLocked = true;
      }else{
        this.DesktopMenuIsLocked = false;
      }
  }

  emptyFunction(){
    return false;
  }

}
