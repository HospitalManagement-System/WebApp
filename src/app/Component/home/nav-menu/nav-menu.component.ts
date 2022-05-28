import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/Services';
import { CacheInfo } from '../../shared/CacheInfo';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
  styles: [
    `
      .angular-logo {
        margin: 0 4px 3px 0;
        height: 35px;
        vertical-align: middle;
      }
      .fill-remaining-space {
        flex: 1 1 auto;
      }
    `,
  ],
})
export class NavMenuComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>; // {1}
  currentUser?: User;
  username: string | undefined;


  constructor(
    private authService: AuthenticationService,private titleService: Title,
    private router: Router
  ) {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
  }
 


 

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
    var Get = CacheInfo.get("currentUser")!=null ? JSON.parse(CacheInfo.get("currentUser")) : null;
    if (typeof Get === 'string') {
      var userName = JSON.parse(Get).userName;
    }

    this.username =this.currentUser?.userName;
    

  }

  logout() {
    this.authService.logout();
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
  get isPatient() {
    return this.currentUser && this.currentUser.role === Role.Patient;
  }

  get isPhysician() {
    return this.currentUser && this.currentUser.role === Role.Physician;
  }

  get isNurse() {
    //return true;
    return this.currentUser && this.currentUser.role === Role.Nurse;
  }

 
  
}
