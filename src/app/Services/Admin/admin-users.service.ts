import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminPatient } from 'src/app/models/admin.model';
import { environment } from 'src/environments/environment';
import { GetAdminHospiatlUser } from '../Url';
import { HospitalUser } from 'src/app/models/HospitalUser';
import { AnyObject } from 'chart.js/types/basic';
import { CacheInfo } from 'src/app/Component/shared/CacheInfo';

@Injectable({
  providedIn: 'root',
})
export class AdminUsersService {
  // baseUrl = environment.LocalUrl;
  baseUrl = environment.URL;
  constructor(private http: HttpClient) {}

  //Hospital Users

  GetAdminHospitalUsers() {
    return this.http.get<HospitalUser[]>(
      `${environment.URL}AdminUserInfo`
    );
  }

  AdminLockHospitalUsers(id: string, Status: boolean, Type: string) {
    const PatientID = id;
    const token = JSON.parse(CacheInfo.get("currentUser")).token;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }

    return fetch(
      `${environment.URL}AdminUserInfo/HospitalLocked/${PatientID}?Status=${Status}&Type=${Type}`,
      {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow',
      }
    );
  }

  GetPatientHospitalUsers() {
    return this.http.get<AdminPatient[]>(
      `${environment.URL}AdminUserInfo/GetPatientUsers`
    );
  }

  PatientLockHospitalUsers(id: string, Status: boolean, Type: string) {
    const PatientID = id;
    const token = JSON.parse(CacheInfo.get("currentUser")).token;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }

    return fetch(
      `${environment.URL}AdminUserInfo/PatientActive/${PatientID}?Status=${Status}&Type=${Type}`,
      {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow',
      }
    );
  }
}
