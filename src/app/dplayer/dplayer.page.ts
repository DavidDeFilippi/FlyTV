import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVarService } from '../global-var.service';
import { ChannelsService } from '../channels.service';
import { App } from '@capacitor/app';
import { IonRouterOutlet, Platform, AlertController } from '@ionic/angular';
import { AppLauncher } from '@capacitor/app-launcher';

declare var VideoHls: any;

@Component({
  selector: 'app-dplayer',
  templateUrl: './dplayer.page.html',
  styleUrls: ['./dplayer.page.scss'],
})
export class DplayerPage implements OnInit {
  public alertButtons = [
    {
      text: 'NO',
      role: 'cancel',
      handler: () => {
      },
    },
    {
      text: 'SI',
      role: 'confirm',
      handler: () => {
        App.exitApp();
      },
    },
  ];

  isMobile: boolean = false;
  channels: any = [];
  channelsFull: any;
  premium: any;
  nacionales: any;
  entretencion: any;
  noticias: any;
  category: any
  categories: any;
  setTimeoutMenu: any;
  clickPlay: boolean = false;
  menuIsActive: boolean = false;
  channeIinfo: any;
  intervalTransmitiendo: any;
  diaParrilla: string = '';
  diaNombreyMesParrilla: any;
  nombreDias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  nombreMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  isMenuLeft: boolean = false;
  isMenuMiddle: boolean = true;
  isMenuRight: boolean = false;

  @ViewChild(IonRouterOutlet) outlet: any;
  constructor(
    private router: Router,
    private globalVar: GlobalVarService,
    private channelService: ChannelsService,
    private alertController: AlertController,
    private platform: Platform,
  ) {
    this.platform.backButton.subscribeWithPriority(9, () => {
      if (!this.outlet?.canGoBack()) {
        // App.exitApp();
        if(this.isMenuMiddle){
          if (!this.globalVar.isMobile()) {
            this.globalVar.setExitDialog(true);
          }
          this.presentExitAlert();
        }else{
          this.isMenuLeft = false;
          this.isMenuMiddle = true;
          this.isMenuRight = false;
        }
        
      }
    });
  }

  ngOnInit() {
    this.isMobile = this.globalVar.isMobile();

    if (this.isMobile) {
      this.router.navigate(['/home']);
    } else {
      clearTimeout(this.setTimeoutMenu);
      this.getChannels();
    }

  }

  ionViewWillLeave() {
    clearInterval(this.intervalTransmitiendo);
  }

  getChannels() {
    this.channelService.getChannels().subscribe((data) => {
      this.channelsFull = data;
      // this.nacionales = this.channels.filter(function(c: any){
      //   return c.categoria === 'nacionales';
      // });
      // this.premium = this.channels.filter(function(c: any){
      //   return c.categoria === 'premium';
      // });
      // this.noticias = this.channels.filter(function(c: any){
      //   return c.categoria === 'noticias';
      // });
      this.listCategories();
      this.getCategory();
      this.getTransmitiendo();
      this.getLastChannel();

    });
  }

  playChannel(ch: any) {
    this.channeIinfo = ch;
    clearTimeout(this.setTimeoutMenu);
    new VideoHls('', 'stop', this.isMobile, 'videoDesktop');
    new VideoHls(ch.url, 'play', this.isMobile, 'videoDesktop');
    localStorage.setItem('lastchannel', ch.id);
    // this.isMenuLeft = false;
    // this.isMenuMiddle = true;
    // this.isMenuRight = false;
  }

  async getTransmitiendo() {
    clearInterval(this.intervalTransmitiendo);
    for (let i = 0; i < this.channelsFull.length; i++) {
      if (this.channelsFull[i].parrilla) {
        this.channelsFull[i].transmitiendo.current = this.getCurrentPrograma(this.channelsFull[i].parrilla);
        this.channelsFull[i].transmitiendo.next = this.getNextPrograma(this.channelsFull[i].parrilla);
      }
    }

    this.intervalTransmitiendo = setInterval(() => {
      for (let i = 0; i < this.channels.length; i++) {
        if (this.channelsFull[i].parrilla) {
          this.channelsFull[i].transmitiendo.current = this.getCurrentPrograma(this.channelsFull[i].parrilla);
          this.channelsFull[i].transmitiendo.next = this.getNextPrograma(this.channelsFull[i].parrilla);
        }
      }
    }, 30000);
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

  getLastChannel() {
    let ch: any;
    let id: any;
    if (localStorage.getItem('lastchannel') == null) {
      id = 'canal13';
    } else {
      id = localStorage.getItem('lastchannel');
    }
    localStorage.setItem('lastchannel', id);
    for (let i = 0; i < this.channelsFull.length; i++) {
      if (this.channelsFull[i].id == id) {
        ch = this.channelsFull[i];
        this.channeIinfo = this.channelsFull[i];
        break;
      }
    }
    this.playChannel(ch);
  }

  // ::::::::::::LISTA TODAS LAS CATEGORIAS DE LOS CANALES DISPONIBLES::::::::
  async listCategories() {

    this.categories = [];
    for (let i = 0; i < this.channelsFull.length; i++) {
      this.categories.push(this.channelsFull[i].categoria);
    }

    this.categories = [...new Set(this.categories)];
  }

  getCategory(category?: string) {
    category = !category || category === '' ? 'premium' : category;

    this.channels = [];

    for (let i = 0; i < this.channelsFull.length; i++) {
      if (this.channelsFull[i].categoria === category) {
        this.channels.push(this.channelsFull[i]);
      }
    }

    this.isMenuLeft = true;
    this.isMenuMiddle = false;
    this.isMenuRight = false;

  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if ((event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Enter') && !this.globalVar.getExitDialog()) {
      event.stopImmediatePropagation();

      if (event.key === 'ArrowRight') {

        if (this.isMenuMiddle) {
          this.isMenuLeft = false;
          this.isMenuMiddle = false;
          this.isMenuRight = true;
        }

        if (this.isMenuLeft) {
          this.isMenuLeft = false;
          this.isMenuMiddle = true;
          this.isMenuRight = false;
        }

      } else {
        event.stopPropagation();
      }

      if (event.key === 'ArrowLeft') {


        if (this.isMenuMiddle) {
          this.isMenuLeft = true;
          this.isMenuMiddle = false;
          this.isMenuRight = false;
        }

        if (this.isMenuRight) {
          this.isMenuLeft = false;
          this.isMenuMiddle = true;
          this.isMenuRight = false;
        }

      } else {
        event.stopPropagation();
      }

    }
  }

  async presentExitAlert() {
    const alert = await this.alertController.create({
      header: '¿Seguro que deseas salir?',
      buttons: this.alertButtons,
    });

    await alert.present();

    alert.onDidDismiss().then((data) => {
      this.globalVar.setExitDialog(false);
    });
  }

  //::::::::PARA COMPARTIR CON APPS DE VIDEO EXTERNAS (SIRVE OPCIONALMENTE PARA URL DE VIDEOS HTTP):::::::::
  async openChannelUrl(url: string) {
      const canopen = await AppLauncher.canOpenUrl({ url: 'org.videolan.vlc' });
      if (canopen.value) {
        window.open('vlc://' + url, "_blank");
      }
  }

}
