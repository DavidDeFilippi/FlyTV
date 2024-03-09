import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ChannelsService } from '../channels.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { GlobalVarService } from '../global-var.service';
import { AppLauncher } from '@capacitor/app-launcher';
import { Device } from '@capacitor/device';
import { CapacitorVideoPlayer } from 'capacitor-video-player';


declare var VideoHls: any;

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.page.html',
  styleUrls: ['./reproductor.page.scss'],
  providers: [ChannelsService]

})
export class ReproductorPage implements OnInit {
  id: any;
  channel: any;
  channels: any;
  current: any;
  next: any;
  isMobile: any;
  videoPlayer: any;
  devicePlatform: string = 'web';
  handlerPlay: any;
  handlerPause: any;
  handlerEnded: any;
  handlerReady: any;
  handlerExit: any;

  constructor(private channelService: ChannelsService,
    private activatedRoute: ActivatedRoute,
    private so: ScreenOrientation,
    private platform: Platform,
    private navRoute: Router,
    private toastController: ToastController,
    private globalVar: GlobalVarService) { }

  ngOnInit() {

    // new VideoHls('', 'stop', this.isMobile, 'video');


    this.isMobile = this.globalVar.isMobile();

    if (this.isMobile) {
      //:::::::: STATUS BAR ::::::::::
      // this.platform.ready().then(() => {
      //   StatusBar.setStyle({style: Style.Dark});
      //   StatusBar.hide();
      this.unlockScreenOrientation();
    }

    this.id = this.activatedRoute.snapshot.queryParamMap.get('id');
    this.current = this.activatedRoute.snapshot.queryParamMap.get('current');
    this.next = this.activatedRoute.snapshot.queryParamMap.get('next');

    this.channelService.getChannels().subscribe((data) => {
      this.channels = data;
      for (var obj of this.channels) {
        if (this.id == obj.id) {
          this.channel = obj;
          break;
        }
      }
      switch (this.channel.id) {
        case 'chilevision':
          this.channelService.getChilevision().subscribe((data) => {
            let t = data;
            this.channel.url = 'https://mdstrm.com/live-stream-playlist/63ee47e1daeeb80a30d98ef4.m3u8?access_token=' + t.token;
            // new VideoHls(this.channel.url, 'play', this.isMobile, 'video');
            // this.presentToast('bottom');
            this.playVideo();

          });
          break;
        // case 'canal13':
        //   this.channelService.getCanal13().subscribe((data) => {
        //     let t = data;
        //     this.channel.url = 'https://origin.dpsgo.com/ssai/event/bFL1IVq9RNGlWQaqgiFuNw/master.m3u8?auth-token=' + t.data.authToken;
        //     // new VideoHls(this.channel.url, 'play', this.isMobile, 'video');
        //     // this.presentToast('bottom');
        //     this.playVideo();

        //   });
        //   break;
        default:
          // new VideoHls(this.channel.url, 'play', this.isMobile, 'video');
          // this.presentToast('bottom');
          this.playVideo();
      }
    });
  }

  async playVideo() {
    const info = await Device.getInfo();
    this.devicePlatform = info.platform;
    this.videoPlayer = CapacitorVideoPlayer;
    // add plugin listeners
    await this.addListenersToPlayerPlugin();
    const props: any = {};
    props.mode = "fullscreen";
    props.url = this.channel.url;
    props.playerId = 'fullscreen';
    props.componentTag = 'app-reproductor';
    props.pipEnabled = true;
    props.displayMode = "all";
    props.title = this.channel.name;
    props.smallTitle = this.current+'\n - '+this.next;
    props.artwork = this.channel.logo;

    // if(this.channel.subtitle != null) props.subtitle = this.channel.subtitle;
    // if(this.channel.stlang != null) props.stlang = this.channel.stlang;
    const res: any = await this.videoPlayer.initPlayer(props);
  }


  // *******************
  // Private Functions *
  // *******************

  // Define the plugin listeners
  private async addListenersToPlayerPlugin(): Promise<void> {
    this.handlerPlay = await this.videoPlayer.addListener('jeepCapVideoPlayerPlay',
      (data: any) => {
        const fromPlayerId = data.fromPlayerId;
        const currentTime = data.currentTime;
        console.log(`<<<< onPlay in ViewerVideo ${fromPlayerId} ct: ${currentTime}`);
      }, false);
    this.handlerPause = await this.videoPlayer.addListener('jeepCapVideoPlayerPause',
      (data: any) => {
        const fromPlayerId = data.fromPlayerId;
        const currentTime = data.currentTime;
        console.log(`<<<< onPause in ViewerVideo ${fromPlayerId} ct: ${currentTime}`);
      }, false);
    this.handlerEnded = await this.videoPlayer.addListener('jeepCapVideoPlayerEnded',
      (data: any) => {
        const fromPlayerId = data.fromPlayerId;
        const currentTime = data.currentTime;
        console.log(`<<<< onEnded in ViewerVideo ${fromPlayerId} ct: ${currentTime}`);
        this.playerLeave();
      }, false);
    this.handlerExit = await this.videoPlayer.addListener('jeepCapVideoPlayerExit',
      (data: any) => {
        const dismiss = data.dismiss;
        console.log(`<<<< onExit in ViewerVideo ${dismiss}`);
        this.playerLeave();
      }, false);
    this.handlerReady = await this.videoPlayer.addListener('jeepCapVideoPlayerReady',
      (data: any) => {
        const fromPlayerId = data.fromPlayerId;
        const currentTime = data.currentTime;
        console.log(`<<<< onReady in ViewerVideo ${fromPlayerId} ct: ${currentTime}`);
      }, false);
    return;
  }
  // Action when the player ended or exit
  private playerLeave() {
    this.videoPlayer.exitPlayer();
    this.navRoute.navigate(['/home']);
    return;
  }


  // :::::::FUNCIONES PARA MANEJAR LA ORIENTACION DE LA PANTALLA:::::::::
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

  //muestra la info del canal al entrar
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      header: this.channel.name,
      message: this.current !== '' ? '- ' + this.current.slice(6) + '<br>- ' + this.next : '',
      duration: 3000,
      position: position,
      color: 'light',
      cssClass: 'custom-toast'
    });

    await toast.present();
  }

  async openChannelUrl() {

    const canopen = await AppLauncher.canOpenUrl({ url: 'org.videolan.vlc' });

    this.globalVar.setNumberForAds(this.globalVar.getNumberForAds() + 1);
    switch (this.channel.id) {
      case 'chilevision':
        this.channelService.getChilevision().subscribe(async (data) => {
          let t = data;
          this.channel.url = 'https://mdstrm.com/live-stream-playlist/63ee47e1daeeb80a30d98ef4.m3u8?access_token=' + t.token;
          if (canopen.value) {
            window.open('vlc://' + this.channel.url, "_blank");
          } else {
            await Share.share({
              title: 'Selecciona aplicacion de video',
              url: this.channel.url,
              dialogTitle: 'Selecciona aplicacion de video',
            });
          }
        });
        break;
      // case 'canal13':
      //   this.channelService.getCanal13().subscribe(async (data) => {
      //     let t = data;
      //     this.channel.url = 'https://origin.dpsgo.com/ssai/event/bFL1IVq9RNGlWQaqgiFuNw/master.m3u8?auth-token=' + t.data.authToken;
      //     if (canopen.value) {
      //       window.open('vlc://' + this.channel.url, "_blank");
      //     } else {
      //       await Share.share({
      //         title: 'Selecciona aplicacion de video',
      //         url: this.channel.url,
      //         dialogTitle: 'Selecciona aplicacion de video',
      //       });
      //     }
      //   });
        break;
      default:
        if (canopen.value) {
          window.open('vlc://' + this.channel.url, "_blank");
        } else {
          await Share.share({
            title: 'Selecciona aplicacion de video',
            url: this.channel.url,
            dialogTitle: 'Selecciona aplicacion de video',
          });
        }
    }

  }

}
