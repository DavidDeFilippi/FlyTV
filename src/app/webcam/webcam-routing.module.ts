import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebcamPage } from './webcam.page';

const routes: Routes = [
  {
    path: '',
    component: WebcamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebcamPageRoutingModule {}
