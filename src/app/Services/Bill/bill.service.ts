import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheInfo } from 'src/app/Component/shared/CacheInfo';
import { BedManagement } from 'src/app/models/bedallocate';
import { PatientAllDetails } from 'src/app/models/billInfo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  constructor(private http: HttpClient) { }
  //Url Route
  baseUrl = environment.URL;
  //Post Appointment
  GetBillPatientDetails(patientId:string) {
    return this.http.get<PatientAllDetails>(
      `${this.baseUrl}BedManagements/GetBillPatientDetails/${patientId}`
    );
  }
  GetBillDetailsFromMailPhone(MailorPhone:string) {
    return this.http.get<PatientAllDetails>(
      `${this.baseUrl}BedManagements/GetBillDetailsFromMailPhone/${MailorPhone}`
    );
  }
}
