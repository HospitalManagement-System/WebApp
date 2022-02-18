import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, SchedulerLike } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Role } from '../models/Role';
import { User } from '../models/User';
import { Guid } from 'guid-typescript';

export declare function throwError(
  error: any,
  scheduler?: SchedulerLike
): Observable<never>;

 const users: User[] = []
//   {
//     id: 1,
//     userName: 'admin',
//     password: 'admin',
//     firstName: 'Admin',
//     lastName: 'User',
//     role: Role.Admin,
//     loggedIn: true,
//   },
//   {
//     id: 2,
//     userName: 'user',
//     password: 'user',
//     firstName: 'Normal',
//     lastName: 'User',
//     role: Role.User,
//     loggedIn: true,
//   },
//   {
//     id: 3,
//     userName: 'physician@gmail.com',
//     password: 'physician@123',
//     firstName: 'Normal',
//     lastName: 'User',
//     role: Role.Physician,
//     loggedIn: true,
//   },
//   {
//     id: 4,
//     userName: 'patient@gmail.com',
//     password: 'patient@123',
//     firstName: 'Normal',
//     lastName: 'User',
//     role: Role.Patient,
//     loggedIn: true,
//   },
//   {
//     id: 5,
//     userName: 'nurse@gmail.com',
//     password: 'nurse@123',
//     firstName: 'Normal',
//     lastName: 'User',
//     role: Role.Nurse,
//     loggedIn: true,
//   },
// ];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return getUserById();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { username, password } = body;
      const user = users.find(
        (x) => x.userName === username && x.password === password
      );
      if (!user) return error('Username or password is incorrect');
      return ok({
        id: user.id,
        username: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: `fake-jwt-token.${user.id}`,
        loggedIn: user.loggedIn,
      });
    }

    function getUsers() {
      if (!isAdmin()) return unauthorized();
      if (!isPhysicain()) return unauthorized();
      if (!isNurse()) return unauthorized();
      return ok(users);
    }

    function getUserById() {
      if (!isLoggedIn()) return unauthorized();

      // only admins can access other user records
      if (!isAdmin() && currentUser()?.id !== idFromUrl())
        return unauthorized();
      if (!isPhysicain() && currentUser()?.id !== idFromUrl())
        return unauthorized();
      if (!isNurse() && currentUser()?.id !== idFromUrl())
        return unauthorized();

      const user = users.find((x) => x.id === idFromUrl());
      return ok(user);
    }

    // helper functions

    function ok(body: any) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'unauthorized' } });
    }

    function error(message: any) {
      return throwError({ status: 400, error: { message } });
    }

    function isLoggedIn() {
      const authHeader = headers.get('Authorization') || '';
      return authHeader.startsWith('Bearer fake-jwt-token');
    }

    function isAdmin() {
      return isLoggedIn() && currentUser()?.role === Role.Admin;
    }
    function isPhysicain() {
      return isLoggedIn() && currentUser()?.role === Role.Physician;
    }
    function isNurse() {
      return isLoggedIn() && currentUser()?.role === Role.Nurse;
    }

    function currentUser() {
      if (!isLoggedIn()) return;
      const id = (headers.get('Authorization') || '{}'.split('.')[1]);
      var idnew = Guid.parse(id)
      return users.find((x) => x.id === idnew);
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return Guid.parse(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
