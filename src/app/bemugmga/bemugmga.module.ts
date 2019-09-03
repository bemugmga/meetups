import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BemugmgaRoutingModule } from './bemugmga-routing.module';
import { BemugmgaComponent } from './bemugmga.component';
import { ListComponent } from './list/list.component';
import { MatToolbarModule, MatCardModule, MatButtonModule,
         MatListModule, MatIconModule,  MatTooltipModule, MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PublicGitService } from '../services/public-git.service';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';

@NgModule({
  declarations: [BemugmgaComponent, ListComponent, ItemDialogComponent],
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
    MatTooltipModule,
    MarkdownModule.forChild(),
    MatDialogModule
  ],
  providers: [
    HttpClient,
    PublicGitService
  ],
  entryComponents: [ ItemDialogComponent ]
})
export class BemugmgaModule { }
