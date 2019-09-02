import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GitAccessService } from '../services/git-access.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bemugmga',
  templateUrl: './bemugmga.component.html',
  styleUrls: ['./bemugmga.component.scss']
})
export class BemugmgaComponent implements OnInit {

  @ViewChild('nameUser', {static: false}) nameUser: ElementRef;

  constructor(private gitAccess: GitAccessService, private router: Router) {
    if (sessionStorage.getItem('code') ) {
      this.gitAccess.generateCodeUser(sessionStorage.getItem('code')).subscribe(suc => {
        sessionStorage.setItem('hashGit', suc.token);
        this.getUserInfo();
      }, error => {
        this.gitAccess.redirectToPageLogin();
      });
      sessionStorage.removeItem('code');
    } else {
      if (sessionStorage.getItem('hashGit') ) {
        this.getUserInfo();
      } else {
        this.gitAccess.redirectToPageLogin();
      }
    }
  }

  private getUserInfo() {
    this.gitAccess.getUserInfo().subscribe(suc => {
      this.nameUser.nativeElement.innerText = suc.name;
    }, error => {
      console.log(error);
      sessionStorage.removeItem('hashGit');
      this.gitAccess.redirectToPageLogin(); });
  }

  ngOnInit() {
    document.body.style.backgroundColor = '#2d2a2a';
  }
}

