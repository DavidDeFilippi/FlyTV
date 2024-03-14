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
import { AppLauncher } from '@capacitor/app-launcher';
import { Optional } from '@angular/core';
import { App } from '@capacitor/app';

import {
  AdMob,
  AdMobRewardItem,
  AdOptions,
  ApplicationMutedOptions,
  ApplicationVolumeOptions,
  BannerAdOptions,
  BannerAdPosition,
  BannerAdSize,
  InterstitialAdPluginEvents,
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
  category: any
  categories: any;
  parrilla: any;
  htmlSelectOption: any;
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
  enableChannelPreview: boolean = false;
  ranChannel: any;
  previewAutorized: boolean = false;
  intervalChannelDuration: any;
  timeChannelPreview: any;
  isDesktopFullScreen: boolean = false;

  constructor(private channelService: ChannelsService,
    private loadingCtrl: LoadingController,
    private globalVar: GlobalVarService,
    private so: ScreenOrientation,
    private sanitizer: DomSanitizer,
    private alertController: AlertController,
    private platform: Platform,
    private menuCtrl: MenuController
  ) {}

  async ionViewWillEnter() {

    this.enableChannelPreview = true;

    new VideoHls('', 'stop', this.isMobile, 'videoPreview');
    new VideoHls('', 'stop', this.isMobile, 'videoDesktop');


    this.isMobile = this.globalVar.isMobile();

    if (this.isMobile) {
      this.lockToPortrait();
      this.platform.ready().then(() => {
        StatusBar.show();
      });
    }

    if (this.globalVar.getFirstLoadingChannels()) {
      if(!this.isMobile && localStorage.getItem('xa88') === null){
        localStorage.setItem('xa88', '1');
      }
      await this.getChannels();
    } else {
      await this.getStatusChannels();
      await this.getParrilla();

    }

  }

  // :::::: CARGA TODOS LOS CANALES Y SUS COMPLEMENTOS::::::::::
  async getChannels() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando canales',
    });
    loading.present();
    this.channelService.getChannels().subscribe((data) => {
      this.channels = data;
      this.channelsBackUp = data;
      if (this.globalVar.getFirstLoadingChannels()) {
        //La parrilla de los canales y el estado de estos sólo los carga al inicio de la app
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

// :::::::::::OBTIENE EL ESTADO DE LOS CANALES QUE EL SERVIDOR VERIFICA ACTIVAMENTE:::::::::::
  async getStatusChannels() {
    this.channelService.getStatusChannels().subscribe((data) => {
      this.statusChannels = data;
      for (let i = 0; i < this.channels.length; i++) {
        for (let j = 0; j < this.statusChannels.length; j++) {
          if (this.channels[i].id == this.statusChannels[j].id) {
            this.channels[i].estado = this.statusChannels[j].estado;
            this.channelsBackUp[i].estado = this.statusChannels[j].estado;
          }
        }
      }
    });
  }

  // ::::::::::OBTIENE DESDE EL SEVIDOR LA PROGRAMACION DEL DIA PARA LOS CANALES QUE LOS TENGA DISPONIBLE:::::::::
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

  // ::::::: REPRODUCE UN CANAL EN LA VISTA PREVIA EN UN TIEMPO DETERMINADO:::::::
  getPreviewChannel(id: string) {
    this.showAds();
    new VideoHls('', 'stop', this.isMobile, 'videoPreview');
    for (let i = 0; i < this.channels.length; i++) {
      if (this.channels[i].id === id && this.channels[i].iframe == false) {
        this.ranChannel = this.channels[i]
      }
    }
    this.previewAutorized = true;
    new VideoHls(this.ranChannel.url, 'play', this.isMobile, 'videoPreview');
    this.getRelojDuracionVistaPreviaCanales();
  }

  // :::::::::::::::::::::::DETERMINA CUANTO TIEMPO SE PROGRAMA A LA VISTA PREVIA::::::::::::::::::::
  //EL VALOR MAXIMO DE CAGRA ES 1 PARA LLEGAR AL 100%.
  // EL CALCULO SERIA 1 / (CANTIDAD DE SEGUNDOS QUE QUERAMOS QUE DURE LA VISTA PREVIA)
  // EL DELAY O MILISEGUNDOS DEL setInterval(()=>{},milisegundos) PUEDE SER MENOR PARA DARLE MAS SUAVIDAD
  // AL ion-progress-bar PERO SE DEBEN AJUSTAR LOS CALCULOS
  getRelojDuracionVistaPreviaCanales() {
    let onInterval = true;
    clearInterval(this.timeChannelPreview);
    this.intervalChannelDuration = 0;

    this.timeChannelPreview = setInterval(() => {
      if (this.intervalChannelDuration < 1) {
        this.intervalChannelDuration += 0.033333333;
      } else {
        if(onInterval){
          onInterval = false;
          new VideoHls('', 'pause', this.isMobile, 'videoPreview');
        }
      }
    }, 1000);
  }
  
  // ::::::::::::PARA DETENER LA VISTA PREVIA Y  DEJAR LA VISTA GENERICA DE SELECCION DE UN CANAL:::::::::::::
  stopPreviewChannel() {
    new VideoHls('', 'stop', this.isMobile, 'videoPreview');
    this.previewAutorized = false;
    clearInterval(this.timeChannelPreview);

  }

  // :::::::::::::DETERMINA QUE PROGRAMA SE ESTA TRANSMITIENDO EN UN CANAL::::::::::::::::
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

  // :::::::::::::DETERMINA QUE PROGRAMA SE TRANSMITIRA DESPUES EN UN CANAL::::::::::::::::
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

  // ::::::::::::LISTA TODAS LAS CATEGORIAS DE LOS CANALES DISPONIBLES::::::::
  async listCategories() {
    this.categories = [];
    for (let i = 0; i < this.channels.length; i++) {
      this.categories.push(this.channels[i].categoria);
    }

    this.categories = [...new Set(this.categories)];
  }

  // :::::::::::::::MUESTRA LOS CANALES DE LA CATEGORIA SELECCIONADA::::::::::
  async getCategory(c: string) {
    if (c === 'todos' || c === '' || c === undefined) {
        this.globalVar.setGlobalCategory('todos');
        for (let i = 0; i < this.channels.length; i++) {
          this.channels[i].enabled = true;
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

  // ::::::::::::::::::::::::::
  // :::::::::INICIO ADS:::::::
  // ::::::::::::::::::::::::::

  // :::::::::::INICIACION PARA LOS SERVICIOS DE GOOGLE ADMOB::::::::::::
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
    
    await AdMob.setApplicationMuted({muted: true});
  }
  // :::::::::::DETERMINA EN QUE MOMENTO SE MOSTRARA UN AD::::::::::::
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
  // :::::::::MUESTRA LA ADD DE PANTALLA COMPLETA CON DURACION MENOR A LAS DEMAS::::::::::
  async showInterstitial() {
    AdMob.addListener(InterstitialAdPluginEvents.Loaded, () => {
      // new VideoHls('', 'stop', this.isMobile, 'videoPreview');
    });
    AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
      setTimeout(() => {
        // new VideoHls('', 'resume', this.isMobile, 'videoPreview');
      });
    });

    const options: AdOptions = {
      adId: 'ca-app-pub-4427288659732696/1947824722',
      isTesting: false,
    }
    await AdMob.prepareInterstitial(options);
    await AdMob.showInterstitial();
  }
  // ::::::::::::::::::::::::::
  // :::::::::FIN ADS::::::::::
  // ::::::::::::::::::::::::::

  // :::::::: PARA FILTRAR LAS CATEGORIAS::::::::::
  handleChange(e: any) {
    // console.log('ionChange fired with value: ' + e.detail.value);
    this.getCategory(e.detail.value);
    if (!this.isMobile) {
      this.openDesktoptMenu(false);
    }
  }

  //:::::::ABRE MODAL PARA VER LA PROGRAMACION DE UN CANAL:::::::::
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

  //:::::::ABRE MODAL PARA COMPARTIR LA APP:::::::::
  openShareAppModal(isOpen: boolean) {
    this.isModalShareAppOpen = isOpen;
  }

  //::::::::PARA COMPARTIR CON APPS DE VIDEO EXTERNAS (SIRVE OPCIONALMENTE PARA URL DE VIDEOS HTTP):::::::::
  async openChannelUrl(url: string, id: string) {
    const canopen = await AppLauncher.canOpenUrl({ url: 'org.videolan.vlc' });
    this.stopPreviewChannel();
    setTimeout(async () => {
      if (this.globalVar.getNumberForAds() % 2 != 0 && localStorage.getItem('xa88') === null) {
        this.simpleLoading(5000, '');
        await this.showAds();
      } else {
        this.globalVar.setNumberForAds(this.globalVar.getNumberForAds() + 1);
        switch (id) {
          case 'chilevision':
            this.channelService.getChilevision().subscribe(async (data) => {
              let t = data;
              url = 'https://mdstrm.com/live-stream-playlist/63ee47e1daeeb80a30d98ef4.m3u8?access_token=' + t.token;
              if (canopen.value) {
                await this.simpleLoading(5000, '');
                window.open('vlc://' + url, "_blank");
              } else {
                await Share.share({
                  title: 'Selecciona aplicacion de video',
                  url: url,
                  dialogTitle: 'Selecciona aplicacion de video',
                });
              }
            });
            break;
          case 'canal13':
            this.channelService.getCanal13().subscribe(async (data) => {
              let t = data;
              url = 'https://origin.dpsgo.com/ssai/event/bFL1IVq9RNGlWQaqgiFuNw/master.m3u8?auth-token=' + t.data.authToken;
              if (canopen.value) {
                await this.simpleLoading(5000, '');
                window.open('vlc://' + url, "_blank");
              } else {
                await Share.share({
                  title: 'Selecciona aplicacion de video',
                  url: url,
                  dialogTitle: 'Selecciona aplicacion de video',
                });
              }
            });
            break;
          default:
            if (canopen.value) {
              await this.simpleLoading(5000, '');
              window.open('vlc://' + url, "_blank");
            } else {
              await Share.share({
                title: 'Selecciona aplicacion de video',
                url: url,
                dialogTitle: 'Selecciona aplicacion de video',
              });
            }
        }
      }
    }, 1);

  }

  //::::::FUNCIONES PARA VERSION ANDROID TV Y DESKTOP::::::
  
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if ((event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Backspace' || event.key === 'Escape') && !this.globalVar.getExitDialog() && this.isDesktopFullScreen) {
      this.isDesktopFullScreen = false;
    }
  }

  openDesktoptMenu(x: boolean) {
    if (!this.DesktopMenuIsLocked) {
      if (x) {
        this.menuCtrl.open('first-menu');
      } else {
        this.menuCtrl.close('first-menu');
      }
    }
  }

  playDesktopChannel(id: string){

    let deskChannel = [];

    for (let i = 0; i < this.channels.length; i++) {
      if (this.channels[i].id === id && this.channels[i].iframe == false) {
        deskChannel = this.channels[i]
      }
    }

    new VideoHls(deskChannel.url, 'play', this.isMobile, 'videoDesktop');

    setTimeout(()=>{
    this.isDesktopFullScreen = true;
    },3000);

  }

  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  // :::::::::::::::::::::FUNCIONES GENERICAS::::::::::::::::
  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::


  // :::::::::::: PARA ABRIR SITIOS WEB EXTERNOS:::::::::
  async openWebSite(website: string) {
    window.open(website, "_blank");
  }

  // :::::::::::: PARA CREAR UNA ANIMACION DE CARGA. PUEDE SER CON O SIN MENSAJE Y SE CONFIGURA LA DURACION::::::::
  async simpleLoading(milliseconds: number, message: string) {
    const loading = await this.loadingCtrl.create({
      message: message,
      duration: milliseconds,
    });
    loading.present();
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

    // :::::::FUNCIONES PARA MANEJAR LA ORIENTACION DE LA PANTALLA:::::::::
    lockToPortrait() {
      this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
    }
    lockToLandscape() {
      this.so.lock(this.so.ORIENTATIONS.LANDSCAPE);
    }
    unlockScreenOrientation() {
      this.so.unlock();
    }
    // :::::::FIN AL COMENTARIO ANTERIOR:::::::::::
  
  // ::::::::ESTO "LIMPIA EL CODIGO HTML GENERADO PROGRAMATICAMENTE PARA RENDERIZARLO EN EL DOCUMENTO":::::::::::::
    getSanitizedHtml(html: string): SafeHtml {
      return this.sanitizer.bypassSecurityTrustHtml(html);
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

  //:::::::SOLO PARA EXCEPCIONES EN CASO QUE SE NECESITE QUE EL CURSOR QUEDE EN EL LUGAR DONDE SE ASIGNE ESTA FUNCION::::: 
  emptyFunction() {
    return false;
  }

}
