import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { URLSearchParams } from 'url';

@Injectable({
  providedIn: 'root'
})
export class GitAccessService {

  private urlRepos =  environment.urlApiGit + '/repos';
  private urlUser =  environment.urlApiGit + '/user';

  constructor(private httpClient: HttpClient) { }

  redirectToPageLogin() {
    window.location.href = environment.urlLoginGit + 'authorize?client_id=' +
                           environment.clientId + '&redirect_uri=' + environment.redirectUrl;
  }

  generateCodeUser(auth) {
    return this.httpClient.get<URLSearchParams>(environment.urlLoginGit + 'access_token?' +
    'client_id=' + environment.clientId +
    '&client_secret=' + environment.GITHUB_SECRET +
    '&code=' + auth +
    '&redirect_uri=' + environment.redirectUrl).toPromise();
  }

  getUserInfo() {
    const httpOptions = { headers: new HttpHeaders({
      Authorization : 'Bearer ' + localStorage.getItem('hashGit')
    })};
    return this.httpClient.get<any>(this.urlUser, httpOptions);
  }
}

