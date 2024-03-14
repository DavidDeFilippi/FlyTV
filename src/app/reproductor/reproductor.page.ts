import { Component, OnInit, AfterViewInit } from '@angular/core';
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
export class ReproductorPage implements OnInit, AfterViewInit {
  id: any;
  channels: any;
  channel: any = {id: '',name: '', url: '', current: '', next: '', logo: ''};
  isMobile: any;
  
  private platform: string = 'web';
  private videoPlayer: any;
  private handlerPlay: any;
  private handlerPause: any;
  private handlerEnded: any;
  private handlerReady: any;
  private handlerExit: any;

  constructor(private channelService: ChannelsService,
    private activatedRoute: ActivatedRoute,
    private so: ScreenOrientation,
    private plt: Platform,
    private navRoute: Router,
    private toastController: ToastController,
    private globalVar: GlobalVarService) { }

  ngOnInit() {
    this.isMobile = this.globalVar.isMobile();

    if (this.isMobile) {
      this.unlockScreenOrientation();
    }

    this.channel.id = this.activatedRoute.snapshot.queryParamMap.get('id');
    this.channel.name = this.activatedRoute.snapshot.queryParamMap.get('name');
    this.channel.url = this.activatedRoute.snapshot.queryParamMap.get('url');
    this.channel.current = this.activatedRoute.snapshot.queryParamMap.get('current');
    this.channel.next = this.activatedRoute.snapshot.queryParamMap.get('next');
    this.channel.logo = this.activatedRoute.snapshot.queryParamMap.get('logo');

    this.globalVar.setNumberForAds(this.globalVar.getNumberForAds() + 1);

  }

  async ngAfterViewInit() {
    const info = await Device.getInfo();
    this.platform = info.platform;
    this.videoPlayer = CapacitorVideoPlayer;
    // add plugin listeners
    await this.addListenersToPlayerPlugin();
    const props: any = {};
    props.mode = "fullscreen";
    props.url = this.channel.url;
    props.playerId = 'fullscreen';
    props.componentTag = 'app-reproductor';
    props.title = this.channel.name;
    props.smallTitle = this.channel.current+'\n'+this.channel.next;
    props.artwork = this.channel.logo;
    const res: any = await this.videoPlayer.initPlayer(props);
  }

  async ngOnDestroy(): Promise<void> {
    // Remove the plugin listeners
    await this.handlerPlay.remove();
    await this.handlerPause.remove();
    await this.handlerEnded.remove();
    await this.handlerReady.remove();
    await this.handlerExit.remove();
    await this.videoPlayer.stopAllPlayers();
    return;
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
    this.navRoute.navigate(['/home']);
    return;
  }

  // :::::::FUNCIONES PARA MANEJAR LA ORIENTACION DE LA PANTALLA:::::::::
  // Unlock screen orientation 
  unlockScreenOrientation() {
    this.so.unlock();
  }
}
