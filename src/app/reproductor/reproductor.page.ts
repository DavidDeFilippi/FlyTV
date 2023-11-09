import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ChannelsService } from '../channels.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';


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
  constructor(private channelService: ChannelsService,private activatedRoute: ActivatedRoute, private so: ScreenOrientation) { }

  ngOnInit() {
    this.unlockScreenOrientation();
    this.id = this.activatedRoute.snapshot.queryParamMap.get('id');

    this.channelService.getChannels().subscribe((data) => {
      this.channels = data;
      for (var obj of this.channels) {
        if(this.id == obj.id){
          this.channel = obj;
          break;
        }
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
}
