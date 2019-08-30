import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicGitService {

  private _urlRepos =  environment.urlApiGit+"/repos";

  constructor(private _httpClient: HttpClient) { }
  
  getIssues(identifier){
    return this._httpClient.get<Array<any>>(this._urlRepos+"/"+identifier+"/issues");
  }

  getComments(identifier, idIssue){
    return this._httpClient.get<Array<any>>(this._urlRepos+"/"+identifier+"/issues/"+idIssue+"/comments");
  }

  getReactions(identifier, idComent){
    const httpOptions = { headers: new HttpHeaders({
        'Accept': 'application/vnd.github.squirrel-girl-preview+json'
      })};
    return this._httpClient.get<Array<any>>(this._urlRepos+"/"+identifier+"/issues/comments/"+idComent+"/reactions", httpOptions);
  }
}
