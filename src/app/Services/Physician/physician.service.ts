import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CacheInfo } from 'src/app/Component/shared/CacheInfo';
import { Product } from 'src/app/models/appointment';
import { Attendance, Specialization } from 'src/app/models/Attendance';
import { Bardata } from 'src/app/models/bardata';
import { Booking, Employee } from 'src/app/models/patient.model';
import { environment } from 'src/environments/environment';
import { Appointment } from '../Url';

@Injectable({
  providedIn: 'root',
})
export class PhysicianService {
  //Url Route
  baseUrl = environment.URL;
  constructor(private http: HttpClient) {}
  private readonly API_URL_NEXTPATIENT = `${this.baseUrl}PhysicianDashboard/GetNextAppointment`;
  // baseUrl = environment.AppointmentUrl;
  appointmentData: any;

  addPhysicianPost(employee: Attendance) {
    const token = JSON.parse(CacheInfo.get("currentUser")).token;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    var raw = JSON.stringify(employee);
    return fetch(`${this.baseUrl}PhysicianDashboard`, {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    });
  }

  // getPatient() {
  //   return this.http.get<UserDetails[]>('`${this.baseUrl}api/AdminUserInfo/GetPatientUsers');
  // }

  //   getAppointmentData(): Observable<Booking[]>{

  //     return this.http.get<Booking[]>(this.baseUrl + Appointment.AppointmentGrid);
  // }

  GetAllSpecialization() {
    return this.http.get<Specialization[]>(
      `${this.baseUrl}PhysicianDashboard/GetAllSpecialization`
    );
  }

  getAppointmentnextpatientData(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL_NEXTPATIENT);
  }

  GetAppoinmentRequest(id: string, date: string) {
    return this.http.get<any[]>(
      `${this.baseUrl}Appointments/GetEditBookAppointmentDetails/${id}`
    );
  }

  //  getBartData() : Observable<Bardata[]>{

  //    return this.http.get<Bardata[]>(this.BAR_URL);
  //  }
}
