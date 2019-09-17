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
    Authorization : 'Bearer ' + sessionStorage.getItem('hashGit')
  })};

  getIssues(identifier) {
    return this.httpClient.get<Array<any>>(this.urlRepos + '/' + identifier + '/issues', this.httpOptions);
  }

  getAllIssues(identifier) {
    return this.httpClient.get<Array<any>>(this.urlRepos + '/' + identifier + '/issues?state=all', this.httpOptions);
  }

  addIssue(identifier, data) {
    const authorization = { headers: new HttpHeaders({
      Accept: 'application/vnd.github.symmetra-preview+json',
      Authorization : 'Bearer ' + sessionStorage.getItem('hashGit')
    })};
    return this.httpClient.post<any>(this.urlRepos + '/' + identifier + '/issues', data, authorization);
  }

  addComment(identifier, idIssue , data) {
    return this.httpClient.post<any>(this.urlRepos + '/' + identifier + '/issues/' + idIssue + '/comments', data, this.httpOptions);
  }

  getComments(identifier, idIssue) {
    const authorization = { headers: new HttpHeaders({
      Accept: 'application/vnd.github.squirrel-girl-preview+json',
      Authorization : 'Bearer ' + sessionStorage.getItem('hashGit')
    })};
    return this.httpClient.get<Array<any>>(this.urlRepos + '/' + identifier + '/issues/' + idIssue + '/comments', authorization);
  }

  getReactions(identifier, idComent) {
    const typeResponse = { headers: new HttpHeaders({
      Accept: 'application/vnd.github.squirrel-girl-preview+json',
      Authorization : 'Bearer ' + sessionStorage.getItem('hashGit')
    })};
    return this.httpClient.get<Array<any>>(this.urlRepos + '/' + identifier + '/issues/comments/' +
                                           idComent + '/reactions?noCache=' + new Date().getTime(), typeResponse);
  }

  voteReaction(identifier, idComent) {
    const authorization = { headers: new HttpHeaders({
      Accept: 'application/vnd.github.squirrel-girl-preview+json',
      Authorization : 'Bearer ' + sessionStorage.getItem('hashGit')
    })};
    return this.httpClient.post<any>(this.urlRepos + '/' + identifier + '/issues/comments/' +
                                    idComent + '/reactions', {content: '+1'}, authorization);
  }

  removeReaction(idVote) {
    const authorization = { headers: new HttpHeaders({
      Accept: 'application/vnd.github.squirrel-girl-preview+json',
      Authorization : 'Bearer ' + sessionStorage.getItem('hashGit')
    })};
    return this.httpClient.delete<any>(environment.urlApiGit + '/reactions/' + idVote,  authorization);
  }

}
