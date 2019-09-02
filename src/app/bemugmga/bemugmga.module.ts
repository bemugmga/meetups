import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BemugmgaRoutingModule } from './bemugmga-routing.module';
import { BemugmgaComponent } from './bemugmga.component';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './item/item.component';
import { MatToolbarModule, MatCardModule, MatButtonModule, MatListModule, MatIconModule,  MatTooltipModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PublicGitService } from '../services/public-git.service';


@NgModule({
  declarations: [BemugmgaComponent, ListComponent, ItemComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    BemugmgaRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [
    HttpClient,
    PublicGitService
  ]
})
export class BemugmgaModule { }
