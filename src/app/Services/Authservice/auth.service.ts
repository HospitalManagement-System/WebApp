import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { FormGroup } from '@angular/forms';
import { AnyObject } from 'chart.js/types/basic';
import { Guid } from 'guid-typescript';
import { Changepassword } from 'src/app/models/changepassword';
import { MainUserDetails } from 'src/app/models/MainUserDeatils';
import { CacheInfo, CommonHelper } from 'src/app/Component/shared/CacheInfo';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}
  private canGo = false;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      typeof CacheInfo.get("currentUser")!="undefined" ? JSON.parse(CacheInfo.get("currentUser")!) : new User()
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    if(Object.keys(this.currentUserSubject.value).length == 0 && (this.router.url.indexOf("Login") == 0 || this.router.url == '/') && !this.canGo){
      this.canGo = true;
      //this.getCurrentUserDetails();
      let UserDeatil = CommonHelper.GetFromLocalStorage();
      if(UserDeatil!=null){
        CacheInfo.set("currentUser",UserDeatil);
        this.setcurrentUserValue(JSON.parse(UserDeatil));
      }
    }
    return this.currentUserSubject.value;
  }
  setcurrentUserValue(User:User) {
    this.currentUserSubject.next(User);
    this.loggedIn.next(true);
  }
  getCurrentUserDetails(){
    this.getCurrentUserDetailsService().subscribe((UserDeatil) => {
         if(UserDeatil!=null){
              CacheInfo.set("currentUser",UserDeatil);
              this.setcurrentUserValue(JSON.parse(UserDeatil));
        }
    });
  }
  getCurrentUserDetailsService(){
     return this.http.get<any>(`${environment.URL}User/getCurrentUserDetails`);
  }
  login(formModel: FormGroup) {
    var loginModel = {
      UserName: formModel.value.username,
      Password: formModel.value.password,
    };
    console.log(loginModel);
    return this.http.post<any>(`${environment.URL}User/Login`, loginModel)
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }
  logout() {
    CacheInfo.clear();
    CommonHelper.RemoveFromLocalStorage();
    this.setcurrentUserValue(new User());
    this.router.navigateByUrl('/Login');
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
        CacheInfo.get("currentUser",JSON.stringify(res));
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
