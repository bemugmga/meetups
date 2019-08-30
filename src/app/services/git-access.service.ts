import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GitAccessService {

  private _urlRepos =  environment.urlApiGit+"/repos";
  private _urlUser =  environment.urlApiGit+"/user";

  constructor(private _httpClient: HttpClient) { }
  
  redirectToPageLogin(){
    window.location.href = environment.urlLoginGit+"authorize?client_id="+environment.clientId+"&redirect_uri="+environment.redirectUrl;
  }

  generateCodeUser(auth){   
    return this._httpClient.post<any>(environment.urlLoginGit+"access_token", 
      {
        "client_id":environment.clientId,
        "client_secret":environment.GITHUB_SECRET,
        "code":auth,
        "redirect_uri":environment.redirectUrl
      }, {responseType: 'text' as 'json'});
  }

  getUserInfo(){
    const httpOptions = { headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("hashGit")
    })};
    return this._httpClient.get<any>(this._urlUser, httpOptions);
  }

 
}
