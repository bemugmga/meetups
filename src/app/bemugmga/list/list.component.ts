import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, ChangeDetectionStrategy, Input, NgZone } from '@angular/core';
import { PublicGitService } from 'src/app/services/public-git.service';
import { MatDialog } from '@angular/material';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';
import { ItemEventInsertComponent } from '../item-event-insert/item-event-insert.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  public issuesOpened = [];
  public reactionSubmissions = {};
  private repository = 'arthurfritz/meetups';
  public infoStatus = 'Carregando....';

  constructor(private pubService: PublicGitService, private dialog: MatDialog, private zone: NgZone) {
  }

  ngOnInit() {
    this.pubService.getIssues(this.repository).subscribe(suc => {
      suc.forEach(element => {
        if (element.number !== 2) {
          element.themes = [];
          this.pubService.getComments(this.repository, element.number).subscribe(comments => {
            comments.forEach(comment => {
              /*
              this.pubService.getReactions(this.repository, comment.id).subscribe(reactions => {
                reactions.forEach(reaction => {
                  if ( !uniqueReactions.find(unique => unique.login === reaction.user.login) ) {
                    uniqueReactions.push({ login: reaction.user.login, avatar: reaction.user.avatar_url });
                  }
                });
              }, errorReaction => {
                console.error('Ocorreu um erro ao obter as reactions', this.repository, comment.id);
              });
              */
              element.themes.push({id: comment.id, author:
                {login: comment.user.login, avatar: comment.user.avatar_url}, reactions: comment.reactions, body: comment.body});
            });
            element.themes.sort((itemA, itemB) => {
              return itemA.reactions['+1'] > itemB.reactions['+1'];
            });
            this.zone.run(() => {
              this.issuesOpened.push(element);
            });
            console.log(this.issuesOpened);
          }, errorComment => {
            console.error('Ocorreu um erro ao obter os comentarios', this.repository, element.number);
          });
        }
      });
      this.zone.run(() => {
        this.infoStatus = '';
      });
    }, error =>  {
      this.zone.run(() => {
        this.infoStatus = 'Ocorreu um erro ao obter a lista de meetups';
      });
    });
  }

  public getQuando(text) {
    const lines = text.split('\n');
    let quando = 'A definir';
    lines.forEach(value => {
      if (/\d{1,2}\/\d{1,2}\/\d{1,4}/gm.test(value)) {
        quando = value;
        return quando;
      }
    });
    return quando;
  }

  public getTitle(text) {
    const lines = text.split('\n');
    return lines[0].replace('##', '');
  }

  public detailInfo(theme) {
    const dialogRef = this.dialog.open(ItemDialogComponent, { data: theme, disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public insertNewEvent() {
    const dialogRef = this.dialog.open(ItemEventInsertComponent, {disableClose: true});
    dialogRef.afterClosed().subscribe(result => {
      this.issuesOpened = [];
      this.reactionSubmissions = {};
      this.infoStatus = 'Carregando....';
      this.ngOnInit();
    });
  }

}
