import { Component, ViewChild } from '@angular/core';
import { Optional } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { GlobalVarService } from './global-var.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonRouterOutlet) outlet: any;
  constructor(private platform: Platform, 
              private globalVar: GlobalVarService,
              @Optional() private routerOutlet?: IonRouterOutlet) {
    
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.outlet?.canGoBack() && !this.globalVar.isMobile()) {
        App.exitApp();
      }
    });
  }
}
