import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarService {

  constructor() { }

  private globalCategory: string = '';
  private numberForAds: number = 1;

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

}
