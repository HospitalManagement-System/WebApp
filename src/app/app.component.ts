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
