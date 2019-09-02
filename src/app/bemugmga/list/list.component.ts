import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PublicGitService } from 'src/app/services/public-git.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public infoText = 'Carregando...';
  public issuesOpened;
  public reactionSubmissions = {};
  private detail = 0;
  private issuesTemp = [];
  private repository = 'bemugmga/meetups';

  constructor(private pubService: PublicGitService, private changes: ChangeDetectorRef) {
      this.pubService.getIssues(this.repository).subscribe(suc => {
        suc.forEach(element => {
          if (element.number !== 2) {
            element.themes = [];
            this.detail++;
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
              this.detail--;
            }, errorComment => {
              console.error('Ocorreu um erro ao obter os comentarios', this.repository, element.number);
              this.detail--;
            });
            element.themes.sort((itemA, itemB) => {
              return itemA.reactions['+1'] > itemB.reactions['+1'];
            });
            this.issuesTemp.push(element);
          }
        });
        this.verify();
      }, error => this.infoText = 'Ocorreu um erro ao obter a lista de meetups');
  }

  ngOnInit() {
  }

  private verify() {
    setTimeout(() => {
      if (this.detail > 0) {
         this.verify ();
      }
      this.issuesOpened = this.issuesTemp;
      this.infoText = 'Ainda não foi submetido palestras';
      this.changes.detectChanges();
    }, 500);
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

}
