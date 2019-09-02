import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicGitService {

  private urlRepos =  environment.urlApiGit + '/repos';

  constructor(private httpClient: HttpClient) { }

  getIssues(identifier) {
    return this.httpClient.get<Array<any>>(this.urlRepos + '/' + identifier + '/issues');
  }

  getComments(identifier, idIssue) {
    return this.httpClient.get<Array<any>>(this.urlRepos + '/' + identifier + '/issues/' + idIssue + '/comments');
  }

  getReactions(identifier, idComent) {
    const httpOptions = { headers: new HttpHeaders({
        Accept: 'application/vnd.github.squirrel-girl-preview+json'
      })};
    return this.httpClient.get<Array<any>>(this.urlRepos + '/' + identifier + '/issues/comments/' + idComent + '/reactions', httpOptions);
  }
}
