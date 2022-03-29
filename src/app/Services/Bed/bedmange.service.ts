import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BedManagement, BedRequest } from 'src/app/models/bedallocate';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BedmangeService {
  constructor(private http: HttpClient) { }
  //Post Appointment
  AddBed(value: BedRequest) {
    const token = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    var raw = JSON.stringify(value);
    return fetch(`${environment.URL}BedManagements`, {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    });
  }
  GetBedDesign(){
    return this.http.get<BedManagement[]>(`${environment.URL}BedManagements`);
  }
}
