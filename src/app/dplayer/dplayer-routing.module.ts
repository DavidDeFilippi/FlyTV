import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DplayerPage } from './dplayer.page';

const routes: Routes = [
  {
    path: '',
    component: DplayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DplayerPageRoutingModule {}
