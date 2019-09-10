import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { URLSearchParams } from 'url';

@Injectable({
  providedIn: 'root'
})
export class GitAccessService {

  private urlUser =  environment.urlApiGit + '/user';
  private userActive = null;

  constructor(private httpClient: HttpClient) { }

  redirectToPageLogin() {
    window.location.href = environment.urlLoginGit + 'authorize?client_id=' +
                           environment.clientId + '&redirect_uri=' + environment.redirectUrl;
  }

  generateCodeUser(auth) {
    return this.httpClient.get<any>(environment.GITHUB_TOKEN + '/' + auth);
  }

  getUserInfo() {
    const httpOptions = { headers: new HttpHeaders({
      Authorization : 'Bearer ' + sessionStorage.getItem('hashGit')
    })};
    return this.httpClient.get<any>(this.urlUser, httpOptions);
  }

  setUser(user) {
    this.userActive = user;
  }

  getUser() {
    return this.userActive;
  }

}

