import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ChannelsService } from '../channels.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Share } from '@capacitor/share';

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
  constructor(private channelService: ChannelsService,
              private activatedRoute: ActivatedRoute, 
              private so: ScreenOrientation,
              private platform: Platform,
              private toastController: ToastController) { }

  ngOnInit() {
    this.unlockScreenOrientation();
    
    //:::::::: STATUS BAR ::::::::::
    this.platform.ready().then(() => {
        StatusBar.hide();
      });
      
    this.id = this.activatedRoute.snapshot.queryParamMap.get('id');
    this.current = this.activatedRoute.snapshot.queryParamMap.get('current');
    this.next = this.activatedRoute.snapshot.queryParamMap.get('next');

    this.channelService.getChannels().subscribe((data) => {
      this.channels = data;
      for (var obj of this.channels) {
        if(this.id == obj.id){
          this.channel = obj;
          break;
        }
      }
      switch (this.channel.id) {
        case 'chilevision':
          this.channelService.getChilevision().subscribe((data) =>{
            let t = data;
            this.channel.url = 'https://mdstrm.com/live-stream-playlist/63ee47e1daeeb80a30d98ef4.m3u8?access_token='+t.token;
            new VideoHls(this.channel.url, 'play');
            this.presentToast('bottom');
          });
        break;
        case 'canal13':
          this.channelService.getCanal13().subscribe((data) =>{
            let t = data;
            this.channel.url = 'https://origin.dpsgo.com/ssai/event/bFL1IVq9RNGlWQaqgiFuNw/master.m3u8?auth-token='+t.data.authToken;
            new VideoHls(this.channel.url, 'play');
            this.presentToast('bottom');
          });
        break;
        default:
          new VideoHls(this.channel.url, 'play');
          this.presentToast('bottom');
      }
    });  
    
  }

    // Lock to portrait
    lockToPortrait(){
      this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
    }
    // Lock to landscape
    lockToLandscape(){
      this.so.lock(this.so.ORIENTATIONS.LANDSCAPE);
    }
  
    // Unlock screen orientation 
    unlockScreenOrientation(){
      this.so.unlock();
    }

    //muestra la info del canal al entrar
    async presentToast(position: 'top' | 'middle' | 'bottom') {
      const toast = await this.toastController.create({
        header: this.channel.name,
        message: this.current !== '' ? '- ' + this.current.slice(6) + '<br>- '+ this.next : '',
        duration: 3000,
        position: position,
        color: 'light',
        cssClass: 'custom-toast'
      });
  
      await toast.present();
    }

    async openChannelUrl(){
      // window.open(this.channel.url, "_blank");
      await Share.share({
        title: 'Selecciona aplicacion de video',
        url: this.channel.url,
        dialogTitle: 'Selecciona aplicacion de video',
      });
    }

}
