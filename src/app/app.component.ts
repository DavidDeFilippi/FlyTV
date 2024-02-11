import { Component, ViewChild } from '@angular/core';
import { Optional } from '@angular/core';
import { IonRouterOutlet, Platform, AlertController } from '@ionic/angular';
import { App } from '@capacitor/app';
import { GlobalVarService } from './global-var.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
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
  @ViewChild(IonRouterOutlet) outlet: any;
  constructor(private platform: Platform, 
              private globalVar: GlobalVarService,
              private alertController: AlertController,
              @Optional() private routerOutlet?: IonRouterOutlet) {
    
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.outlet?.canGoBack() && !this.globalVar.isMobile()) {
        // App.exitApp();
        this.globalVar.setExitDialog(true);
        this.presentExitAlert();
      }
    });
  }

  async presentExitAlert() {
    const alert = await this.alertController.create({
      header: '¿Seguro que desea salir?',
      // subHeader: '¿Seguro que desea salir?',
      // message: '¿Seguro que desea salir?',
      buttons: this.alertButtons,
    });

    await alert.present();

    alert.onDidDismiss().then((data)=>{
      this.globalVar.setExitDialog(false);
    });
  }
}
