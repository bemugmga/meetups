import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BemugmgaComponent } from './bemugmga.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [{
  path: 'bemugmga',
  component: BemugmgaComponent,
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: '**',
        component: ListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BemugmgaRoutingModule { }
