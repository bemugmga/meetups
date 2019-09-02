import { Component, OnInit } from '@angular/core';
import { GitAccessService } from '../services/git-access.service';

@Component({
  selector: 'app-bemugmga',
  templateUrl: './bemugmga.component.html',
  styleUrls: ['./bemugmga.component.scss']
})
export class BemugmgaComponent implements OnInit {

  public name = 'Não logado';

  constructor(private gitAccess: GitAccessService) {
    if (localStorage.getItem('code') ) {
      this.gitAccess.generateCodeUser(localStorage.getItem('code')).then(suc => {
        localStorage.setItem('hashGit', suc.get('access_token'));
      }).catch(error => {
        console.log(error);
      });
      localStorage.removeItem('code');
    } else {
      if (localStorage.getItem('hashGit') ) {
        this.gitAccess.getUserInfo().subscribe(suc => {
          this.name = suc.name;
        }, error => {
          console.log(error);
          localStorage.removeItem('hashGit');
          this.gitAccess.redirectToPageLogin(); });
      } else {
        this.gitAccess.redirectToPageLogin();
      }
    }
  }

  ngOnInit() {
    document.body.style.backgroundColor = '#2d2a2a';
  }
}

