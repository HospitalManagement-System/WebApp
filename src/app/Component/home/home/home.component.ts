import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/Services';
import { UserService } from 'src/app/Services/Userservice/userservice/user.service';
import { CacheInfo } from '../../shared/CacheInfo';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  loading = false;
  currentUser: User;
  userFromApi!: User;
  id!: number;
  userid: any = CacheInfo.get("currentUser");
  isLoggedIn$!: Observable<boolean>; // {1}
  //isLoggedIn$?: boolean;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit() {
    this.loading = true;
    this.isLoggedIn$ = this.authenticationService.isLoggedIn; // {2}
    const user =  this.currentUser;
    if ((typeof user!="undefined" && user!=null && Object.keys(user).length == 0) || user == null) {
      this.router.navigateByUrl('/Login');
    } else if (user.role == 'ADMIN') {
      this.router.navigateByUrl('/AdminDashboard');
    } else if (user.role == 'PHYSICIAN') {
      this.router.navigateByUrl('/Physician');
    } else if (user.role == 'PATIENT') {
      this.router.navigateByUrl('/PatientDashboard');
    } else if (user.role == 'NURSE') {
      this.router.navigateByUrl('/NurseDashboard');
    }
  }
  getuserbyId() {
    this.userService
      .getById(this.userid)
      .pipe(first())
      .subscribe((user) => {
        this.loading = false;
        this.userFromApi = user;
      });
  }
}
