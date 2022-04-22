import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Notes } from 'src/app/Component/shared/inbox/inbox.component';
import { CacheInfo } from 'src/app/Component/shared/CacheInfo';

@Injectable({ providedIn: 'root' })
export class InboxService {
  baseUrl: string = environment.URL;

  constructor(private httpClient: HttpClient, private router: Router) {}

  SendNotes(notes: any) {
    console.log('Hii service');
    try {
      const token = JSON.parse(CacheInfo.get("currentUser")).token;
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      if (token != null) {
        myHeaders.append('Authorization', `Bearer ${token}`);
      }
      var raw = JSON.stringify(notes);
      fetch(`${environment.URL}Notes`, {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      })
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));

      //return this.httpClient.post(this.baseUrl + 'Notes', notes);
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  GetEmployee() {
    return this.httpClient.get(this.baseUrl + 'Notes');
  }

  GetNotesById(id: Guid) {
    return this.httpClient.get(this.baseUrl + 'Notes/' + id);
  }

  GetAppointmentByEmployeeId(id: Guid) {
    //https://localhost:44347/api/Appointments/GetAppointmentsByEmployeeId?
    return this.httpClient.get(
      `${environment.URL}Appointments/GetAppointmentsByEmployeeId?id=` +
        id
    );
  }

  DeleteEmployee(id: Guid) {
    console.log(id);
    const token = JSON.parse(CacheInfo.get("currentUser")).token;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    var raw = JSON.stringify(id);
    fetch(`${environment.URL}Notes/`, {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
    //this.httpClient.delete(this.baseUrl + 'Notes/'+id);
  }
}
