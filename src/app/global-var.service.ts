import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarService {

  constructor() { }

  private globalCategory: string = '';

  public getGlobalCategory() {
    return this.globalCategory;
  }

  public setGlobalCategory(globalCategory: any) {
    this.globalCategory = globalCategory;
  }

}
