import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarService {

  constructor(private platform: Platform) { }

  private globalCategory: string = '';
  private numberForAds: number = 1;
  private firstLoadingChannels: boolean = true;
  private isExitDialog: boolean = false;

  public getGlobalCategory() {
    return this.globalCategory;
  }

  public setGlobalCategory(globalCategory: any) {
    this.globalCategory = globalCategory;
  }

  public getNumberForAds() {
    return this.numberForAds;
  }

  public setNumberForAds(numberForAds: any) {
    this.numberForAds = numberForAds;
  }

  public getFirstLoadingChannels() {
    return this.firstLoadingChannels;
  }

  public setFirstLoadingChannels(firstLoadingChannels: boolean) {
    this.firstLoadingChannels = firstLoadingChannels;
  }

  public getExitDialog() {
    return this.isExitDialog;
  }

  public setExitDialog(isExitDialog: boolean) {
    this.isExitDialog = isExitDialog;
  }

  public isMobile(){
    if(this.platform.platforms().includes('mobile')){
      return true;
    }else{
      return false;
    }
  }

}
