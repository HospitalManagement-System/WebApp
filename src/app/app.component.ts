import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkStatusAngularService } from 'network-status-angular';
import { Role } from './models/Role';
import { User } from './models/User';
import { AuthenticationService } from './Services';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="isConnected; else internet">
      <app-nav-menu></app-nav-menu>
      <router-outlet></router-outlet>
    </div>
    <ng-template #internet> Please Check Your Internet Connection </ng-template>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'CosmosWebApp';
  status = 'ONLINE';
  isConnected = true;
  start2: any;
  constructor(
    private networkStatusAngularService: NetworkStatusAngularService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    this.networkStatusAngularService.status.subscribe((status) => {
      if (status) {
        this.isConnected = true;
      } else {
        this.isConnected = false;
      }
    });
  }

  ngOnInit() {}
  currentUser!: User;
}



// import { Component, HostListener, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { NetworkStatusAngularService } from 'network-status-angular';
// import { Subject } from 'rxjs';
// import { Role } from './models/Role';
// import { User } from './models/User';
// import { AuthenticationService } from './Services';

// @Component({
//   selector: 'app-root',
//   template: `
//     <div *ngIf="isConnected; else internet">
//       <app-nav-menu></app-nav-menu>
//       <router-outlet></router-outlet>
//     </div>
//     <ng-template #internet> Please Check Your Internet Connection </ng-template>
//   `,
//   styleUrls: ['./app.component.css'],
// })
// export class AppComponent implements OnInit {
//   title = 'CosmosWebApp';
//   status = 'ONLINE';
//   isConnected = true;
//   start2: any;
//   userActivity: any;
//   userInactive: Subject<any> = new Subject();
//   constructor(
//     private networkStatusAngularService: NetworkStatusAngularService,
//     private router: Router,
//     private authenticationService: AuthenticationService
//   ) {
//     this.authenticationService.currentUser.subscribe(
//       (x) => (this.currentUser = x)
//     );
//     this.networkStatusAngularService.status.subscribe((status) => {
//       if (status) {
//         this.isConnected = true;
//       } else {
//         this.isConnected = false;
//       }
//     });
//     this.setTimeout();
//     this.userInactive.subscribe(() => {
//       authenticationService.logout();
//     });
//   }
//   setTimeout(): void {
//     this.userActivity = setTimeout(() => this.userInactive.next(undefined), 10000);
//   }

//   @HostListener('window:mousemove') refreshUserState() {
//     clearTimeout(this.userActivity);
//     this.setTimeout();
//   }
//   ngOnInit() { }
//   currentUser!: User;
// }
