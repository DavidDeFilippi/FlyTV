import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ChannelsService } from '../channels.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.page.html',
  styleUrls: ['./iframe.page.scss'],
})
export class IframePage implements OnInit {
  id: any;
  channel: any;
  channels: any;
  iframe: any;
  constructor(
    private channelService: ChannelsService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer, 
    private so: ScreenOrientation) { }

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
      this.iframe = this.getSanitizedHtml(this.channel.url);
    });  
    
  }

  getSanitizedHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
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
