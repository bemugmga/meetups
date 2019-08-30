import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BemugmgaComponent } from './bemugmga.component';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './item/item.component';

const routes: Routes = [
  { 
  path: 'bemugmga', 
  component: BemugmgaComponent,
    children: [
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'item/:id',
        component : ItemComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BemugmgaRoutingModule { }
