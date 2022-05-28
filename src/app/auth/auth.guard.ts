import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthenticationService } from '../Services';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // check if route is restricted by role
            if (route.data['roles'] && route.data['roles'].indexOf(currentUser.role) === -1) {
                // role not authorised so redirect to home page
                this.router.navigate(['/']);
                return false;
            }
            this.authenticationService.SetHeaderLabel(route.data['headerLabel']);
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

//     canActivate(
//         next: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot
//       ): Observable<boolean> {
//         return this.authenticationService.isLoggedIn         // {1}
//           .pipe(
//             take(1),                              // {2} 
//             map((isLoggedIn: boolean) => {         // {3}
//               if (!isLoggedIn){
//                 this.router.navigate(['/login']);  // {4}
//                 return false;
//               }
//               return true;
//             })
//           )
// }
}
