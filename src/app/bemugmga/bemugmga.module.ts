import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BemugmgaRoutingModule } from './bemugmga-routing.module';
import { BemugmgaComponent } from './bemugmga.component';
import { ListComponent } from './list/list.component';
import { MatToolbarModule, MatCardModule, MatButtonModule,
         MatListModule, MatIconModule,  MatTooltipModule,
         MatDialogModule, MatInputModule, MatFormFieldModule,
         MAT_DATE_LOCALE, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatBadgeModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PublicGitService } from '../services/public-git.service';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';
import { GitAccessService } from '../services/git-access.service';
import { ItemEventInsertComponent } from './item-event-insert/item-event-insert.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemThemeInsertComponent } from './item-theme-insert/item-theme-insert.component';

@NgModule({
  declarations: [BemugmgaComponent, ListComponent, ItemDialogComponent, ItemEventInsertComponent, ItemThemeInsertComponent],
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
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatBadgeModule
  ],
  providers: [
    HttpClient,
    PublicGitService,
    GitAccessService,
    FormBuilder,
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'},
  ],
  entryComponents: [ ItemDialogComponent, ItemEventInsertComponent, ItemThemeInsertComponent ]
})
export class BemugmgaModule { }
