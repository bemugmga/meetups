import { Component, OnInit } from '@angular/core';
import { PublicGitService } from 'src/app/services/public-git.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public infoText = "Carregando...";
  public issuesOpened = [];
  public titleSubmissions = {};
  public reactionSubmissions = {};
  private repository = "bemugmga/meetups";

  constructor(private _pubService:PublicGitService) { }

  ngOnInit() {
    this._pubService.getIssues(this.repository).subscribe(suc => {
      this.issuesOpened = [];
      this.titleSubmissions = [];
      suc.forEach(element => {
        if(element.number != 2){
          element.themes = [];
          this._pubService.getComments(this.repository, element.number).subscribe(comments=>{
            comments.forEach(comment=>{
              let uniqueReactions = [];
              this._pubService.getReactions(this.repository, comment.id).subscribe(reactions=>{
                reactions.forEach(reaction=>{
                  if(!uniqueReactions.find(unique=> unique.login === reaction.user.login)){
                    uniqueReactions.push({login:reaction.user.login, avatar:reaction.user.avatar_url})
                  }
                })
              }, errorReaction=> {
                console.error("Ocorreu um erro ao obter as reactions", this.repository, comment.id);
              })
              element.themes.push({id:comment.id, author: {login:comment.user.login, avatar:comment.user.avatar_url}, reactions:uniqueReactions});
            })
          }, errorComment=> {
            console.error("Ocorreu um erro ao obter os comentarios", this.repository, element.number);
          })
          element.themes.sort((itemA,itemB)=>{
            return itemA.reactions.length > itemB.reactions.length
          })
          this.issuesOpened.push(element);
        }
      });
      this.infoText = "Ainda não foi submetido palestras";
    }, error=> this.infoText = "Ocorreu um erro ao obter a lista de meetups")
  }

  public getQuando(text){
    let lines = text.split("\n");
    let quando = 'A definir';
    lines.forEach(text => {
      if(/\d{1,2}\/\d{1,2}\/\d{1,4}/gm.test(text)){
        quando = text;
        return quando;
      }
    });
    return quando;
  }
}
