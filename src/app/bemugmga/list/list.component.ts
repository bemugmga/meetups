import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, ChangeDetectionStrategy, Input, NgZone } from '@angular/core';
import { PublicGitService } from 'src/app/services/public-git.service';
import { MatDialog } from '@angular/material';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';
import { ItemEventInsertComponent } from '../item-event-insert/item-event-insert.component';
import { environment } from 'src/environments/environment';
import { ItemThemeInsertComponent } from '../item-theme-insert/item-theme-insert.component';
import { GitAccessService } from 'src/app/services/git-access.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  public issuesOpened = [];
  public reactionSubmissions = {};
  public infoStatus = 'Carregando....';
  public actionVote = false;

  constructor(private pubService: PublicGitService,
              private dialog: MatDialog,
              private zone: NgZone,
              private accessGitService: GitAccessService) {
  }

  ngOnInit() {
    this.pubService.getIssues(environment.repoBemug).subscribe(suc => {
      const tempElements = [];
      suc.forEach(element => {
        if (element.number !== 2) {
          element.themes = [];
          this.pubService.getComments(environment.repoBemug, element.number).subscribe(comments => {
            comments.forEach(comment => {
              this.pubService.getReactions(environment.repoBemug, comment.id).subscribe(reactions => {
                this.zone.run(() => {
                  this.reactionSubmissions[comment.id] = [];
                });
                reactions.filter(item => item.content === '+1' ).forEach(item => {
                  this.zone.run(() => {
                    this.reactionSubmissions[comment.id].push(item);
                  });
                });
              }, errorReaction => {
                console.error('Ocorreu um erro ao obter as reactions', environment.repoBemug, comment.id);
              });

              element.themes.push({
                id: comment.id, author:
                  { login: comment.user.login, avatar: comment.user.avatar_url }, reactions: comment.reactions, body: comment.body
              });
            });
            element.themes.sort((itemA, itemB) => {
              return itemA.reactions['+1'] > itemB.reactions['+1'];
            });
            this.zone.run(() => {
              tempElements.push(element);
              tempElements.sort((itemA, itemB) => itemA.number < itemB.number ? 1 : -1);
              this.issuesOpened = tempElements;
            });
          }, errorComment => {
            console.error('Ocorreu um erro ao obter os comentarios', environment.repoBemug, element.number);
          });
        }
      });
      this.zone.run(() => {
        this.infoStatus = '';
      });
    }, error => {
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
    const dialogRef = this.dialog.open(ItemDialogComponent, { data: theme, disableClose: false });
    dialogRef.afterClosed().subscribe(result => {
      this.reloadInfos(result);
    });
  }

  public votedInTheme(theme) {
    return this.reactionSubmissions[theme.id] &&
           this.reactionSubmissions[theme.id].some(item => item.user.login === this.accessGitService.getUser().login);
  }

  public voteInTheme(theme) {
    this.zone.run(() => {
      this.actionVote = true;
    });
    this.pubService.voteReaction(environment.repoBemug, theme.id).subscribe(suc => {
      this.reloadThisTheme(theme);
    }, error => {
      alert('Ocorreu um erro ao tentar votar');
      this.reloadThisTheme(theme);
      console.log(error);
    });
  }

  public removeVoteInTheme(theme) {
    this.zone.run(() => {
      this.actionVote = true;
    });
    this.reactionSubmissions[theme.id].filter(item => item.user.login === this.accessGitService.getUser().login).forEach(item => {
      this.pubService.removeReaction(item.id).subscribe(suc => {
        this.reloadThisTheme(theme);
      }, error => {
        alert('Ocorreu um erro ao remover o voto');
        this.reloadThisTheme(theme);
        console.log(error);
      });
    });
  }

  private reloadThisTheme(theme) {
    this.pubService.getReactions(environment.repoBemug, theme.id).subscribe(reactions => {
      this.zone.run(() => {
        this.reactionSubmissions[theme.id] = [];
      });
      reactions.filter(item => item.content === '+1' ).forEach(item => {
        this.zone.run(() => {
          this.reactionSubmissions[theme.id].push(item);
        });
      });
      this.zone.run(() => {
        this.issuesOpened.forEach(item => {
          item.themes.filter(innerItem => innerItem.id === theme.id).forEach(innerItem => {
            innerItem.reactions['+1'] = this.reactionSubmissions[theme.id].length;
          });
        });
        this.actionVote = false;
      });
    }, errorReaction => {
      console.error('Ocorreu um erro ao obter as reactions', environment.repoBemug, theme.id);
    });
  }

  public insertNewEvent() {
    const dialogRef = this.dialog.open(ItemEventInsertComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      this.reloadInfos(result);
    });
  }

  public insertNewTheme(info) {
    const dialogRef = this.dialog.open(ItemThemeInsertComponent, { data: info, disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      this.reloadInfos(result);
    });
  }

  private reloadInfos(result) {
    if (result) {
      this.issuesOpened = [];
      this.reactionSubmissions = {};
      this.infoStatus = 'Carregando....';
      this.ngOnInit();
    }
  }
}
