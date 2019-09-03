import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'bemugmga', loadChildren: './bemugmga/bemugmga.module#BemugmgaModule'},
  { path: '**', redirectTo: '/bemugmga', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
