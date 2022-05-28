import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventInput } from '@fullcalendar/angular';
import { INITIAL_EVENTS } from '../Component/admin/model/event.utils';
import { AddPhysycian, Admin } from '../Services/Url';
import { EventMap } from '../Component/admin/model/admin.model';
import { Observable } from 'rxjs';
import { AdminDashboard } from '../models/admin.model';
// import { EventData } from '../Component/admin/admin-calendar/admin-calendar.component';
import { environment } from 'src/environments/environment';
import { CacheInfo } from '../Component/shared/CacheInfo';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  //Url Route
  baseUrl = environment.URL;

  //Observer Event

  GlobalObservableEvent(url: any) {
    const $http = new Observable((observer) => {
      fetch(url)
        .then((responce) => {
          return responce.json();
        })
        .then((body) => {
          observer.next(body);
          observer.complete();
        })
        .catch((err) => observer.error(err));
    });

    return $http;
  }

  //Dash Board Changes Start

  LoadDashBoardInfo() {
    return this.http.get<any>(this.baseUrl + Admin.DashBoard);
  }

  //Dash Board Changes End

  //Calendar Changes Start
  //Data Mapping
  private listEvent: EventMap[] = [];

  GetEventData(): Promise<EventInput[]> {
    return Promise.resolve(INITIAL_EVENTS);
  }

  //Call Events Before loading to Component
  GetData() {
    this.http
      .get<EventMap[]>(this.baseUrl + Admin.Event)
      .subscribe((res: EventMap[]) => {
        this.listEvent.splice(0, this.listEvent.length);
        this.listEvent.push(...res);
      });
  }

  //List Of ALL Events
  GetListofData() {
    // return this.http.get<EventMap[]>(this.baseUrl + Admin.Event);
    return this.http.get<EventMap[]>(
      `${this.baseUrl}Appointments/GetAllAppointments`
    );
  }

  GetListofDataById(Id: string, Role: string) {
    if (Role == 'ADMIN' || Role == 'NURSE') {
      return this.http.get<EventMap[]>(
        `${this.baseUrl}Appointments/GetAllAppointments`
      );
    } else {
      return this.http.get<EventMap[]>(
        `${this.baseUrl}Appointments/GetAllAppointmentsById/${Id}?Role=${Role}`
      );
    }
  }

  GetAdminDashboard(): Observable<AdminDashboard[]> {
    return this.http.get<AdminDashboard[]>(this.baseUrl + Admin.DashBoard);
  }

  TempGetAdminData() {
    return this.GlobalObservableEvent(this.baseUrl + '/PayLoad');
  }

  //Observable Event

  Observeevent() {
    const $http = new Observable((observer) => {
      fetch(this.baseUrl + Admin.DashBoard)
        .then((res) => {
          return res.json();
        })
        .then((body) => {
          observer.next(body);
          observer.complete();
        })
        .catch((err) => {
          observer.error(err);
        });
    });

    return $http;
  }

  //Gender

  Gender() {
    return this.http.get<any>(
      `${this.baseUrl}MasterData/GetGender`
    );
  }

  //Designation
  Specialization(type: any) {
    return this.http.get<any>(
      `${this.baseUrl}MasterData/Specialization/${type}`
    );
  }

  //Designation
  Designation(type: any) {
    return this.http.get<any>(
      `${this.baseUrl}MasterData/Specialization/${type}`
    );
  }

  //Department
  Department(type: any) {
    return this.http.get<any>(
      `${this.baseUrl}MasterData/GetDesignation/${type}`
    );
  }

  //Physician/Nurse/EduactionList
  EduactionList(type: any) {
    return this.http.get<any>(
      `${this.baseUrl}MasterData/GetEducation/${type}`
    );
  }

  TestData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Appointments`);
  }

  PostPatient(value: any) {
    const token = JSON.parse(CacheInfo.get("currentUser")).token;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    var raw = JSON.stringify(value);

    return fetch(`${this.baseUrl}EmployeRegister`, {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    });
  }
}
