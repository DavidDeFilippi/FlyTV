import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ChannelsService } from '../channels.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';

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
  constructor(private channelService: ChannelsService,
              private activatedRoute: ActivatedRoute, 
              private so: ScreenOrientation,
              private platform: Platform) { }

  ngOnInit() {
    this.unlockScreenOrientation();

    this.platform.ready().then(() => {
        StatusBar.hide();
      });
      
    this.id = this.activatedRoute.snapshot.queryParamMap.get('id');

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
            });
          break;

          case 'canal13':
            this.channelService.getCanal13().subscribe((data) =>{
              let t = data;
              this.channel.url = 'https://origin.dpsgo.com/ssai/event/bFL1IVq9RNGlWQaqgiFuNw/master.m3u8?auth-token='+t.token;
            });
          break;
      }
      new VideoHls(this.channel.url, 'play');
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

    //:::::::: STATUS BAR ::::::::::
}
