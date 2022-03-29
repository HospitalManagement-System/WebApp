import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking, Diagnosics, Physician } from '../../models/patient.model';
@Injectable({
  providedIn: 'root',
})
export class BookAppointmentService {
  constructor(private http: HttpClient) {}

  //GetBookSlot
  GetBookSlot(id: string, date: string) {
    return this.http.get<any[]>(
      `${environment.URL}Appointments/GetBookSlots/${id}?appointmentdateTime=${date}`
    );
  }

  //GetDiagnosics
  GetDiagnosics() {
    return this.http.get<Diagnosics[]>(
      `${environment.URL}Diagnoses/GetDiagnosisData`
    );
  }

  GetSpecialization() {
    return this.http.get<Diagnosics[]>(
      `${environment.URL}Appointments/Specialization`
    );
  }

  //GEt Physician
  GetPhysician() {
    return this.http.get<Physician[]>(
      `${environment.URL}Appointments/GetAllPhysician`
    );
  }

  GetPhysicianById(Diagnosics: string) {
    return this.http.get<Physician[]>(
      `${environment.URL}Appointments/GetPhysicianByDiagnosics/${Diagnosics}`
    );
  }

  //Get Time Slot
  GetAllocatedTimeSlot() {
    return this.http.get<Diagnosics[]>(
      `${environment.URL}Diagnoses/GetDiagnosisData`
    );
  }

  //Post Appointment
  BookAppointmentPost(value: any) {
    const token = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    var raw = JSON.stringify(value);
    return fetch(`${environment.URL}Appointments`, {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    });
  }

  UpdateAppointment(AppointmentId: string, value: any) {
    const token = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    var raw = JSON.stringify(value);
    return fetch(
      `${environment.URL}Appointments/UpdateAppointments/${AppointmentId}`,
      {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      }
    );
  }
}
