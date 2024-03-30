import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVarService } from '../global-var.service';
import { ChannelsService } from '../channels.service';
import { App } from '@capacitor/app';
import { IonRouterOutlet, Platform, AlertController } from '@ionic/angular';

declare var VideoHls: any;
declare var setMenuActive: any;
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
        console.log('Alert canceled');
      },
    },
    {
      text: 'SI',
      role: 'confirm',
      handler: () => {
        App.exitApp();
        console.log('Alert confirmed');
      },
    },
  ];

  isMobile: boolean = false;
  channels: any;
  setTimeoutMenu: any;
  clickPlay: boolean = false;
  menuIsActive: boolean = false;
  channeIinfo: any;

  @ViewChild(IonRouterOutlet) outlet: any;
  constructor(
    private router: Router,
    private globalVar: GlobalVarService,
    private channelService: ChannelsService,
    private alertController: AlertController,
    private platform: Platform,

  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (!this.outlet?.canGoBack()) {
        // App.exitApp();
        if (!this.globalVar.isMobile()) {
          this.globalVar.setExitDialog(true);
        }
        this.presentExitAlert();
      }
    });
  }

  ngOnInit() {
    this.isMobile = this.globalVar.isMobile();

    if (this.isMobile) {
      this.router.navigate(['/home']);
    } else {
      clearInterval(this.setTimeoutMenu);
      this.getChannels();
    }

  }

  getChannels() {
    this.channelService.getChannels().subscribe((data) => {
      this.channels = data;
      this.getLastChannel();
      this.setMenuActive();

    });
  }

  playChannel(ch: any) {
    this.channeIinfo = ch;
    clearInterval(this.setTimeoutMenu);
    new setMenuActive(true);
    new VideoHls('', 'stop', this.isMobile, 'videoDesktop');
    new VideoHls(ch.url, 'play', this.isMobile, 'videoDesktop');
    localStorage.setItem('lastchannel', ch.id);
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
    for (let i = 0; i < this.channels.length; i++) {
      if (this.channels[i].id == id) {
        ch = this.channels[i];
        break;
      }
    }
    this.playChannel(ch);
  }

  setMenuActive() {
    clearInterval(this.setTimeoutMenu);
    new setMenuActive(true);
    this.menuIsActive = true;
    this.setTimeoutMenu = setTimeout(() => {
      new setMenuActive(false);
      this.menuIsActive = false;
    }, 3000);
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if ((event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Enter') && !this.globalVar.getExitDialog()) {
      if (!this.menuIsActive && event.key === 'ArrowLeft') {
        this.setMenuActive();
      } else {
        if (this.menuIsActive) {
          this.setMenuActive();
        } else {
          event.stopPropagation();
        }

      }
    }
  }

  async presentExitAlert() {
    const alert = await this.alertController.create({
      header: '¿Seguro que deseas salir?',
      // subHeader: '¿Seguro que desea salir?',
      // message: '¿Seguro que desea salir?',
      buttons: this.alertButtons,
    });

    await alert.present();

    alert.onDidDismiss().then((data) => {
      this.globalVar.setExitDialog(false);
    });
  }

}
