import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

//Mobile

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'reproductor',
    loadChildren: () => import('./reproductor/reproductor.module').then( m => m.ReproductorPageModule)
  },
  {
    path: 'iframe',
    loadChildren: () => import('./iframe/iframe.module').then( m => m.IframePageModule)
  },
  {
    path: 'dplayer',
    loadChildren: () => import('./dplayer/dplayer.module').then( m => m.DplayerPageModule)
  },
];

//Desktop

// const routes: Routes = [
//   {
//     path: '',
//     loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
//   },
//   {
//     path: 'reproductor',
//     loadChildren: () => import('./reproductor/reproductor.module').then( m => m.ReproductorPageModule)
//   },
//   {
//     path: 'iframe',
//     loadChildren: () => import('./iframe/iframe.module').then( m => m.IframePageModule)
//   },
// ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
