import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { Observable } from 'rxjs';
import { CacheInfo } from 'src/app/Component/shared/CacheInfo';
import { environment } from 'src/environments/environment';
import { Booking, Diagnosics, Physician } from '../../models/patient.model';
@Injectable({
  providedIn: 'root',
})
export class BookAppointmentService {
  constructor(private http: HttpClient) {}
  //Url Route
  baseUrl = environment.URL;

  //GetBookSlot
  GetBookSlot(id: string, date: string) {
    return this.http.get<any[]>(
      `${this.baseUrl}Appointments/GetBookSlots/${id}?appointmentdateTime=${date}`
    );
  }

  //GetDiagnosics
  GetDiagnosics() {
    return this.http.get<Diagnosics[]>(
      `${this.baseUrl}Diagnoses/GetDiagnosisData`
    );
  }

  GetSpecialization() {
    return this.http.get<Diagnosics[]>(
      `${this.baseUrl}Appointments/Specialization`
    );
  }

  //GEt Physician
  GetPhysician() {
    return this.http.get<Physician[]>(
      `${this.baseUrl}Appointments/GetAllPhysician`
    );
  }

  GetPhysicianById(Diagnosics: string) {
    return this.http.get<Physician[]>(
      `${this.baseUrl}Appointments/GetPhysicianByDiagnosics/${Diagnosics}`
    );
  }

  //Get Time Slot
  GetAllocatedTimeSlot() {
    return this.http.get<Diagnosics[]>(
      `${this.baseUrl}Diagnoses/GetDiagnosisData`
    );
  }

  //Post Appointment
  BookAppointmentPost(value: any) {
    const token = JSON.parse(CacheInfo.get("currentUser")).token;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    var raw = JSON.stringify(value);
    return fetch(`${this.baseUrl}Appointments`, {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    });
  }

  UpdateAppointment(AppointmentId: string, value: any) {
    const token = JSON.parse(CacheInfo.get("currentUser")).token;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    var raw = JSON.stringify(value);
    return fetch(
      `${this.baseUrl}Appointments/UpdateAppointments/${AppointmentId}`,
      {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      }
    );
  }
}
