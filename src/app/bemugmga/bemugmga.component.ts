import { Component, OnInit } from '@angular/core';
import { GitAccessService } from '../services/git-access.service';

@Component({
  selector: 'app-bemugmga',
  templateUrl: './bemugmga.component.html',
  styleUrls: ['./bemugmga.component.scss']
})
export class BemugmgaComponent implements OnInit {

  public name = "Não logado";

  constructor(private _gitAccess:GitAccessService) { 
    if(localStorage.getItem("code")){
      this._gitAccess.generateCodeUser(localStorage.getItem("code")).subscribe(suc=>{
        localStorage.setItem("hashGit",new URLSearchParams(suc).get("access_token"))
      }, error=>{
        this._gitAccess.redirectToPageLogin();
      })
      localStorage.removeItem("code");
    } else {
      if(localStorage.getItem("hashGit")){
        this._gitAccess.getUserInfo().subscribe(suc=>{
          this.name = suc.name
        }, error=>{
          localStorage.removeItem("hashGit");
          this._gitAccess.redirectToPageLogin();  
        })
      } else {
        this._gitAccess.redirectToPageLogin();
      }
    }

  }

  ngOnInit() {
    document.body.style.backgroundColor = '#2d2a2a';
  }

  
}
