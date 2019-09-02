import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicGitService {

  private urlRepos =  environment.urlApiGit + '/repos';

  constructor(private httpClient: HttpClient) { }

  private httpOptions = { headers: new HttpHeaders({
    Authorization : 'Bearer ' + localStorage.getItem('hashGit')
  })};

  getIssues(identifier) {
    return this.httpClient.get<Array<any>>(this.urlRepos + '/' + identifier + '/issues', this.httpOptions);
  }

  getComments(identifier, idIssue) {
    const authorization = { headers: new HttpHeaders({
      Accept: 'application/vnd.github.squirrel-girl-preview+json',
      Authorization : 'Bearer ' + localStorage.getItem('hashGit')
    })};
    return this.httpClient.get<Array<any>>(this.urlRepos + '/' + identifier + '/issues/' + idIssue + '/comments', authorization);
  }

  getReactions(identifier, idComent) {
    const typeResponse = { headers: new HttpHeaders({
      Accept: 'application/vnd.github.squirrel-girl-preview+json',
    })};
    return this.httpClient.get<Array<any>>(this.urlRepos + '/' + identifier + '/issues/comments/' + idComent + '/reactions', typeResponse);
  }
}
