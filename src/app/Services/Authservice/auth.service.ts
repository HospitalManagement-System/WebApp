import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { FormGroup } from '@angular/forms';
import { AnyObject } from 'chart.js/types/basic';
import { Guid } from 'guid-typescript';
import { Changepassword } from 'src/app/models/changepassword';
import { MainUserDetails } from 'src/app/models/MainUserDeatils';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(formModel: FormGroup, user: User) {
    var loginModel = {
      UserName: formModel.value.username,
      Password: formModel.value.password,
    };
    console.log(loginModel);
    return this.http
      .post(`${environment.URL}User/Login`, loginModel)
      .subscribe({
        next: (res: any) => {
          // console.log(res)
          localStorage.setItem('token', res.token);
          //localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.loggedIn.next(true);
          //  return user;
          this.router.navigateByUrl('/Home');
        },
        error: (e) => console.error(e),
      });
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    const emptyDataResult: User = {
      userName: '',
      password: '',
      firstName: '',
      lastName: '',
      isFirstLogin: false,
      isLocked: false,
      isActive: false,
      email: '',
      role: '',
      token: '',
      loggedIn: '',
      NoOfAteempt: 0,
    };
    this.currentUserSubject.next(emptyDataResult);
    //this.router.navigateByUrl('/login');
    this.router.navigate(['Login']).then(() => {
      window.location.reload();
    });
  }

  Resetpassword(obj: MainUserDetails) {
    console.log('Hii');

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify(obj);
    fetch(`${environment.URL}User/ForgotPassword`, {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));

    //return this.http.post('https://localhost:44359/api/User/ForgotPassword', obj)
  }

  SendEmail(email: string, user: string) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    //var raw = JSON.stringify(obj);
    fetch(
      `${environment.URL}User/SendEmail/${email}?username=${user}`,
      {
        method: 'POST',
        redirect: 'follow',
      }
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));

    //https://localhost:44359/api/User/SendEmail/Alex123?username=Alex123"
    // return this.http.post(`https://localhost:44359/api/User/SendEmail/${email}?username=${user}`,{
    //   method: 'POST',
    //   redirect: 'follow',

    // });
  }

  getUserData() {
    console.log(`${environment.URL}User/GetUser`);
    return this.http.get<User[]>(`${environment.URL}User/GetUser`);
  }

  getUser(id: Guid | undefined) {
    this.http.get(`${environment.URL}User/` + id).subscribe({
      next: (res: any) => {
        localStorage.setItem('user', JSON.stringify(res));
      },
      error: (e) => console.error(e),
    });
  }

  lockAccount(user: MainUserDetails) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify(user);
    fetch(`${environment.URL}User/LockAccount`, {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }

  changepassword(obj: Changepassword) {
    //https://localhost:44359/api/User/ChangePassword
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify(obj);
    fetch(`${environment.URL}User/ChangePassword`, {
      body: raw,
      headers: myHeaders,
      method: 'POST',
      redirect: 'follow',
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }
}
