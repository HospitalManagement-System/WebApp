import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from './Url';
import { AppointmentData, DrugData } from '../models/patientDashboard';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PatientDashboardService {
  baseUrl = environment.URL;
  constructor(private http: HttpClient) {}

  GetAllAppointmentList() {
    return this.http.get<AppointmentData[]>(this.baseUrl + Patient.Appointment);
  }

  GetAllUpcomingAppointmentList() {
    return this.http.get<AppointmentData[]>(
      this.baseUrl + Patient.UpcomingAppointment
    );
  }
  GetPastAppointmentList() {
    return this.http.get<AppointmentData[]>(
      this.baseUrl + Patient.PastAppointment
    );
  }
  GetDeclineAppointmentsList() {
    return this.http.get<AppointmentData[]>(
      this.baseUrl + Patient.DeclineAppointments
    );
  }
  GetAppointmentById(id: string) {
    return this.http.get<AppointmentData>(
      this.baseUrl + Patient.Appointment + '/' + id
    );
  }

  CancelAppointmentById(id: string, status: string, deletedReason: string) {
    return this.http.patch<AppointmentData>(
      this.baseUrl +
        Patient.ApproveReject +
        '/' +
        id +
        '?Status=' +
        status +
        '&DeletedReason=' +
        deletedReason,
      ''
    );
  }

  GetPrescriptionsbyId(id: string) {
    return this.http.get<DrugData[]>(
      this.baseUrl + Patient.GetPrescriptions + '/' + id
    );
  }
}
