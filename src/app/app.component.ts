import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChildren } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { NetworkStatusAngularService } from 'network-status-angular';
import { delay, filter } from 'rxjs';
import { Role } from './models/Role';
import { User } from './models/User';
import { AuthenticationService } from './Services';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/Services/loader.service';

@Component({
  selector: 'app-root',
  template: `
    <mat-drawer-container >
    <mat-drawer #sidedrawer
          mode="side"
          [opened]='true' 
          *ngIf="canLoadHeader"
          style="background-image: linear-gradient(to right, rgb(215, 233, 245), rgb(23, 118, 177));">
      <app-nav-menu></app-nav-menu>
    </mat-drawer>
    <mat-drawer-content>    
    <div class="spinner_holder" *ngIf="isLoading | async">
      <mat-spinner></mat-spinner>
    </div>
    <app-header 
         *ngIf="canLoadHeader" 
         (toggleSidebarForMe)="sideBarToggler(sidedrawer)"></app-header>
      <router-outlet></router-outlet>
    </mat-drawer-content>
  </mat-drawer-container>
    <div *ngIf="isConnected">
    <ng-template #internet> Please Check Your Internet Connection </ng-template>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'WebApp';
  status = 'ONLINE';
  isConnected = true;
  start2: any;
  canLoadHeader = false;
  @ViewChildren('sidedrawer') public sidedrawer!: any;
  isLoading: Subject<boolean> = this.lds.isLoading;
  sideBarToggler(sidematdrawer:any) {
    this.sidedrawer._results[0].toggle();
  }
  constructor(
    private lds:LoaderService,
    private observer: BreakpointObserver,
    private networkStatusAngularService: NetworkStatusAngularService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => {
        (this.currentUser = x)
        this.canLoadHeader = false;
        if(Object.keys(this.currentUser).length > 0)
           this.canLoadHeader = true;
      }
    );
    this.networkStatusAngularService.status.subscribe((status) => {
      if (status) {
        this.isConnected = true;
      } else {
        this.isConnected = false;
      }
    });
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 400px)'])
      .pipe(delay(1))
      .subscribe((res:any) => {
        if (window.innerWidth < 500) {
          this.sidedrawer.mode = 'over';
          this.sidedrawer._results[0].close();
        } else {
          this.sidedrawer._results[0].mode = 'side';
          this.sidedrawer._results[0].open();
        }
      });

    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidedrawer._results[0].mode === 'over') {
          this.sidedrawer._results[0].close();
        }
      });
  }
  ngOnInit() { }
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
//   title = 'WebApp';
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
