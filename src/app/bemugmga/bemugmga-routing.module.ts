import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BemugmgaComponent } from './bemugmga.component';

const routes: Routes = [{
    path: '**',
    component: BemugmgaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BemugmgaRoutingModule { }
