import { Component, HostListener, ViewChild } from '@angular/core';
import { ChannelsService } from '../channels.service';
import { GlobalVarService } from '../global-var.service';
import { InfiniteScrollCustomEvent, LoadingController, isPlatform } from '@ionic/angular';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AlertController } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { MenuController } from '@ionic/angular';
import { AppLauncher } from '@capacitor/app-launcher';
import { Router } from '@angular/router';
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

  public alertButtons = [
    {
      text: 'Quiero Donar',
      role: 'confirm',
      handler: () => {
        localStorage.setItem('dismisseddonation', '1');
        this.openWebSite('https://link.mercadopago.cl/sorbeteapps');
      },
    },
    {
      text: 'Cerrar',
      role: 'cancel',
      handler: () => {
        localStorage.setItem('dismisseddonation', '1');
      },
    },
  ];
  public vlcAlertButtons = [
    {
      text: 'Descargar',
      role: 'confirm',
      handler: () => {
        localStorage.setItem('dismisseddonation', '1');
        this.openWebSite('https://play.google.com/store/apps/details?id=org.videolan.vlc&hl=es&gl=US&pli=1');
      },
    },
    {
      text: 'Cerrar',
      role: 'cancel',
      handler: () => {

      },
    },
  ];

  channels: any;
  appSettings: any;
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
  coloresLog = { verde: '\x1b[32m%s\x1b[0m', amarillo: '\x1b[33m%s\x1b[0m', rojo: '\x1b[31m%s\x1b[0m' };
  modalParrilla: any;
  aspck: number = 0;
  isMobile: any;
  DesktopMenuIsLocked: boolean = false;
  currentYear = new Date().getFullYear();
  ranChannel: any;
  previewAutorized: boolean = false;
  isDesktopFullScreen: boolean = false;
  intervalTransmitiendo: any;
  intervalGetChilevision: any;
  intervalCanal13: any;
  logData: any;
  notificationRead: boolean = true;
  playerOptions: any = {};
  deviceInfo: string = this.platform.platforms().toString();

  constructor(
    private channelService: ChannelsService,
    private loadingCtrl: LoadingController,
    private globalVar: GlobalVarService,
    private so: ScreenOrientation,
    private sanitizer: DomSanitizer,
    private alertController: AlertController,
    private platform: Platform,
    private menuCtrl: MenuController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.isMobile = this.globalVar.isMobile();

    if (!this.isMobile) {
      localStorage.setItem('xa88', '1');
      this.router.navigate(['/dplayer']);
    }
  }

  async ionViewWillEnter() {
    if (this.isMobile) {
      this.getAppSettings();
      //AdMob
      this.initialize();
      this.lockToPortrait();
      this.platform.ready().then(() => {
        StatusBar.show();
      });

      if (this.globalVar.getFirstLoadingChannels()) {
        await this.getChannels();
      } else {
        await this.getTransmitiendo();
      }
      setTimeout(() => {
        this.getLocalStorage();
        if (localStorage.getItem('played') == '1') {
          if (localStorage.getItem('dismisseddonation') == null) {
            this.presentDonationAlert();
          }
        }
      }, 1000);
    }
  }

  ionViewWillLeave() {
    clearInterval(this.intervalTransmitiendo);
    clearInterval(this.intervalGetChilevision);
    clearInterval(this.intervalCanal13);
  }

  // :::::: CARGA TODOS LOS CANALES Y SUS COMPLEMENTOS::::::::::
  async getChannels() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando canales',
    });
    loading.present();
    this.channelService.getChannels().subscribe((data) => {
      this.channels = data;
      this.getChilevision();
      this.getCanal13();
      this.category = this.globalVar.getGlobalCategory();
      this.listCategories();
      this.getCategory(this.category);
      if (this.globalVar.getFirstLoadingChannels()) {
        this.getTransmitiendo();
        this.globalVar.setFirstLoadingChannels(false);
      }
      loading.dismiss();
    });

  }

  async updateChannels() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando canales',
    });
    loading.present();
    this.channelService.getChannels().subscribe((data) => {
      this.channels = data;
      this.getTransmitiendo();
      this.category = this.globalVar.getGlobalCategory();
      this.listCategories();
      this.getCategory(this.category);
      this.getTransmitiendo();
      loading.dismiss();
      this.globalVar.setFirstLoadingChannels(false);
    });
  }

  getChilevision() {
    clearInterval(this.intervalGetChilevision);

    this.channelService.getChilevision().subscribe(async (data) => {
      let t = data;
      for (let i = 0; i < this.channels.length; i++) {
        if (this.channels[i].id === 'chilevision') {
          this.channels[i].url = 'https://mdstrm.com/live-stream-playlist/63ee47e1daeeb80a30d98ef4.m3u8?access_token=' + t.token;
          break;
        }
      }
    });

    this.intervalGetChilevision = setInterval(() => {
      this.channelService.getChilevision().subscribe(async (data) => {
        let t = data;
        for (let i = 0; i < this.channels.length; i++) {
          if (this.channels[i].id === 'chilevision') {
            this.channels[i].url = 'https://mdstrm.com/live-stream-playlist/63ee47e1daeeb80a30d98ef4.m3u8?access_token=' + t.token;
            break;
          }
        }
      });
    }, 140000);
  }

  getCanal13() {
    clearInterval(this.intervalCanal13);

    this.channelService.getCanal13().subscribe(async (data) => {
      let t = data;
      for (let i = 0; i < this.channels.length; i++) {
        if (this.channels[i].id === 'canal132') {
          this.channels[i].url = 'https://origin.dpsgo.com/ssai/event/bFL1IVq9RNGlWQaqgiFuNw/master.m3u8?auth-token=' + t.data.authToken;
          break;
        }
      }
    });

    this.intervalCanal13 = setInterval(() => {
      this.channelService.getCanal13().subscribe(async (data) => {
        let t = data;
        for (let i = 0; i < this.channels.length; i++) {
          if (this.channels[i].id === 'canal132') {
            this.channels[i].url = 'https://origin.dpsgo.com/ssai/event/bFL1IVq9RNGlWQaqgiFuNw/master.m3u8?auth-token=' + t.data.authToken;
            break;
          }
        }
      });
    }, 90000);

  }

  //:::::::CONFIGURACIONES DE LA APP QUE VIENEN DESE LA API::::::::
  async getAppSettings() {
    this.channelService.getAppSettings().subscribe((data) => {
      this.appSettings = data;
    });
  }

  // ::::::::::MUESTRA LO QUE ESTAN DANDO EN CADA CANAL:::::::::
  async getTransmitiendo() {
    clearInterval(this.intervalTransmitiendo);
    for (let i = 0; i < this.channels.length; i++) {
      if (this.channels[i].parrilla) {
        this.channels[i].transmitiendo.current = this.getCurrentPrograma(this.channels[i].parrilla);
        this.channels[i].transmitiendo.next = this.getNextPrograma(this.channels[i].parrilla);
      }
    }

    this.intervalTransmitiendo = setInterval(() => {
      for (let i = 0; i < this.channels.length; i++) {
        if (this.channels[i].parrilla) {
          this.channels[i].transmitiendo.current = this.getCurrentPrograma(this.channels[i].parrilla);
          this.channels[i].transmitiendo.next = this.getNextPrograma(this.channels[i].parrilla);
        }
      }
    }, 60000);
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
  }

  // ::::::::::::PARA DETENER LA VISTA PREVIA Y  DEJAR LA VISTA GENERICA DE SELECCION DE UN CANAL:::::::::::::
  stopPreviewChannel() {
    new VideoHls('', 'stop', this.isMobile, 'videoPreview');
    this.previewAutorized = false;
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
    c = c == '' ? 'nacionales' : c;
    // if (c === 'todos' || c === '' || c === undefined) {
    //   this.globalVar.setGlobalCategory('todos');
    //   for (let i = 0; i < this.channels.length; i++) {
    //     this.channels[i].enabled = true;
    //   }
    // } else {
    for (let i = 0; i < this.channels.length; i++) {
      if (this.channels[i].categoria === c) {
        this.channels[i].enabled = true;
      } else {
        this.channels[i].enabled = false;
      }
    }
    this.category = c;
    // }
    this.globalVar.setGlobalCategory(c);
    // this.htmlSelectOption = `<ion-select-option color="light" value="todos" class="ion-text-capitalize">Todos</ion-select-option>`;
    // for (var x of this.categories) {
    //   this.htmlSelectOption = this.htmlSelectOption + `<ion-select-option color="light" value="${x}" class="ion-text-capitalize">${x}</ion-select-option>`;
    // }
    // this.htmlSelectOption = this.getSanitizedHtml(this.htmlSelectOption);
  }

  getLocalStorage() {
    this.channelService.getVersionLog().subscribe((data) => {
      this.logData = data[0];
      this.logData.description = this.getSanitizedHtml('Version ' + this.logData.version + '<br><br>' + this.logData.description);

      if (localStorage.getItem('lognumber') == null) {
        localStorage.setItem('lognumber', this.logData.logiD);
        this.notificationRead = false;
      } else {
        if (Number(localStorage.getItem('lognumber')) < this.logData.logiD) {
          localStorage.setItem('lognumber', this.logData.logiD);
          this.notificationRead = false;
        }
      }
    });

    if (localStorage.getItem('pip') == null) {
      localStorage.setItem('pip', '1');
    }

    if (localStorage.getItem('bgroundAudio') == null) {
      localStorage.setItem('bgroundAudio', '0');
    }

    this.playerOptions.pip = localStorage.getItem('pip') == '1' ? true : false;
    this.playerOptions.bgroundAudio = localStorage.getItem('bgroundAudio') == '1' ? true : false;

    this.globalVar.setPlayerpip(this.playerOptions.pip);
    this.globalVar.setplayerBgAudio(this.playerOptions.bgroundAudio);

  }

  // ::::::::::::::::::::::::::
  // :::::::::INICIO ADS:::::::
  // ::::::::::::::::::::::::::

  // :::::::::::INICIACION PARA LOS SERVICIOS DE GOOGLE ADMOB::::::::::::
  async initialize() {
    const { status } = await AdMob.trackingAuthorizationStatus();

    if (status === 'notDetermined') {
    }

    AdMob.initialize({
      requestTrackingAuthorization: true,
      testingDevices: ['735978b4-219f-4d70-bade-7eb4b808ac5d'],
      initializeForTesting: false,
    });

    AdMob.setApplicationMuted({ muted: true });
  }
  // :::::::::::DETERMINA EN QUE MOMENTO SE MOSTRARA UN AD::::::::::::
  async showAds() {
    if (this.globalVar.getNumberForAds() % 2 != 0 && localStorage.getItem('xa88') === null) {
      if (this.appSettings.ads) {
        await this.showInterstitial();
      }
      this.globalVar.setNumberForAds(this.globalVar.getNumberForAds() + 1);
    } else {
      this.globalVar.setNumberForAds(this.globalVar.getNumberForAds() + 1);
    }
  }
  // :::::::::MUESTRA LA ADD DE PANTALLA COMPLETA CON DURACION MENOR A LAS DEMAS::::::::::
  async showInterstitial() {

    const options: AdOptions = {
      adId: 'ca-app-pub-4427288659732696/1947824722',
      isTesting: false,
    }
    await AdMob.prepareInterstitial(options);
    await AdMob.showInterstitial();
  }
  //::::::::::MUESTRA EL BANNER ADD:::::::::::::
  async showBanner() {
    const options: BannerAdOptions = {
      adId: 'ca-app-pub-4427288659732696/1021994519',
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      // isTesting: true
      // npa: true
    };
    AdMob.showBanner(options);
  }
  // ::::::::::::::::::::::::::
  // :::::::::FIN ADS::::::::::
  // ::::::::::::::::::::::::::

  // :::::::: PARA FILTRAR LAS CATEGORIAS::::::::::
  handleChange(e: any) {
    this.getCategory(e.detail.value);
  }

  // :::::::: Para las opciones del reproductor::::::::::
  playerOptionsChange(e: any, a: string) {
    switch (a) {
      case 'pip':
        this.playerOptions.pip = localStorage.setItem('pip', e.detail.checked == true ? '1' : '0');
        this.globalVar.setPlayerpip(e.detail.checked);
        break;
      case 'bgroundAudio':
        this.playerOptions.pip = localStorage.setItem('bgroundAudio', e.detail.checked == true ? '1' : '0');
        this.globalVar.setplayerBgAudio(e.detail.checked);
        break;
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
      if (this.globalVar.getNumberForAds() % 2 != 0 && localStorage.getItem('xa88') === null && this.appSettings.ads == true) {
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
                this.presentVLCAlert();
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
                this.presentVLCAlert();
              }
            });
            break;
          default:
            if (canopen.value) {
              await this.simpleLoading(5000, '');
              window.open('vlc://' + url, "_blank");
            } else {
              this.presentVLCAlert();
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

  playDesktopChannel(id: string) {

    let deskChannel = [];

    for (let i = 0; i < this.channels.length; i++) {
      if (this.channels[i].id === id && this.channels[i].iframe == false) {
        deskChannel = this.channels[i]
      }
    }

    new VideoHls(deskChannel.url, 'play', this.isMobile, 'videoDesktop');

    setTimeout(() => {
      this.isDesktopFullScreen = true;
    }, 3000);

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

  //:::::::::::::::ALERTA EMERGENTE PARA DONACIONES::::::::::::
  async presentDonationAlert() {
    const alert = await this.alertController.create({
      header: 'Ayudanos con una donación',
      subHeader: 'Sorbete Apps necesita tu ayuda.',
      message: '¡Hola! Ayudanos a impulsar nuestro proyecto. Cualquier donación nos sería de ayuda para mantenernos atentos a esta aplicación.</br>El botón te llevará a mercado pago donde puedes ingresar un monto desde $1CLP.</br></br><img src="assets/mercadopago.jpg" />',
      buttons: this.alertButtons,
      cssClass: 'donation-alert',
      backdropDismiss: false,
    });

    await alert.present();

    alert.onDidDismiss().then((data) => {
      // this.globalVar.setExitDialog(false);
    });
  }

  //:::::::::::::::ALERTA PARA DESCARGAR VLC::::::::::::
  async presentVLCAlert() {
    const alert = await this.alertController.create({
      header: 'Canales VLC',
      // subHeader: 'Sorbete Apps necesita tu ayuda.',
      message: '</br><img src="assets/vlc.webp"/><br><br>Para ver este canal debes tener instalado el reproductor VLC for Android disponible en Google Play.',
      buttons: this.vlcAlertButtons,
      cssClass: 'donation-alert',
      backdropDismiss: false,
    });

    await alert.present();

    alert.onDidDismiss().then((data) => {
      // this.globalVar.setExitDialog(false);
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
