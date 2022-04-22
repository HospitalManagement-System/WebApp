import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheInfo } from 'src/app/Component/shared/CacheInfo';
import { EventMap } from 'src/app/models/admin.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  //Url Route
  baseUrl = environment.URL;
  constructor(private http: HttpClient) {}

  GetListofData() {
    return this.http.get<EventMap[]>(this.baseUrl + 'GetAllAppointments');
  }

  ApproveReject(Id: any, Type: string) {
    const token = JSON.parse(CacheInfo.get("currentUser")).token;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    return fetch(
      `${environment.URL}Appointments/ApproveReject/${Id}?Status=${Type}`,
      {
        method: 'PATCH',
        headers: myHeaders,
        redirect: 'follow',
      }
    );
  }

  GetZoomLink(Id: any, Role: string) {
    const token = JSON.parse(CacheInfo.get("currentUser")).token;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    return fetch(
      `${environment.URL}Appointments/GetZoomLink/${Id}?Role=${Role}`,
      {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      }
    );
  }

  GetCalendarData(Id: any) {
    const token = JSON.parse(CacheInfo.get("currentUser")).token;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    return fetch(
      `${environment.URL}Appointments/GetCalendarData/${Id}`,
      {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      }
    );
  }
}
