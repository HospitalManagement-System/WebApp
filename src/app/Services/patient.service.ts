import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../Services/Url';
import {
  Booking,
  PatientBookAppointmentDetails,
} from '../models/patient.model';
import { id } from 'date-fns/locale';
import { guid } from '@fullcalendar/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  baseUrl = environment.URL;
  constructor(private http: HttpClient) {}

  BookedAppointment() {
    this.http.get<PatientBookAppointmentDetails[]>(
      this.baseUrl + Patient.PatientBookedAppointment
    );
  }

  Edit(value: any) {
    this.http
      .post<any>(`${this.baseUrl}INITIAL_EVENTS/`, value)
      .subscribe((value) => {
        console.log(value);
      });
  }

  GetPatientAppointmentDetailsById(AppointmentID: string) {
    return this.http.get<any>(
      `${this.baseUrl}Appointments/GetEditBookAppointmentDetails/${AppointmentID}`
    );
  }
}
