import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventInput } from '@fullcalendar/angular';

import { Appointment } from '../Services/Url';
import { EventMap } from '../Component/admin/model/admin.model';
import { Product } from '../models/appointment';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctordata';
import { Bardata } from '../models/bardata';
import { Attendance } from '../models/Attendance';
import { environment } from 'src/environments/environment';
// import { EventData } from '../Component/admin/admin-calendar/admin-calendar.component';


@Injectable({
  providedIn: 'root',
})
export class DailogeService {
  constructor(private http: HttpClient) {}

  //Url Route
  baseUrl = environment.URL;

  //Url Route
  private readonly BAR_URL =
    `${this.baseUrl}NurseDash/GetallBarChartDetails`;
  private readonly UP_URL =
    `${this.baseUrl}NurseDash/GetNurseUpComingAppointment`;

  private readonly API_URL1 =
    `${this.baseUrl}PhysicianDashboard/GetAvailablePhysicianDetails`;
  private readonly BAR_URL1 = `${this.baseUrl}BarList`;

  appointmentData: any;
  id:any;

  //Dash Board Changes Start

  getAppointmentData(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.baseUrl}api/NurseDash/GetNurseAppointment`
    );
  }
  uploadMastertData(formdata: FormData): Observable<any> {
    return this.http.post(
      `${this.baseUrl}Master/ImportMasters`,
      formdata,
      { reportProgress: true, observe: 'events' }
    );
  }
  updateIssue(id: string, product: Product) {
    // this.appointmentData = product;
    // const token = localStorage.getItem('token');
    // var myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');
    // if (token != null) {
    //   myHeaders.append('Authorization', `Bearer ${token}`);
    // }
    // var raw = JSON.stringify(product);
    // return fetch(
    //   `${this.baseUrl}api/NurseDash/UpdateUpcomingAppoinmets?Id=${id}`,
    //   {
    //     method: 'PUT',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow',
    //   }
    // );
    return this.http.put<any>(`${this.baseUrl}NurseDash/UpdateUpcomingAppoinmets?Id=`+id, product);
  }
  // this.http.post('`${this.baseUrl}api/NurseDash/UpdateUpcomingAppoinmets?Id='+id, this.appointmentData).subscribe((res) => {
  //   console.log("datacame");
  // });

  addAppoinmentData(product: Product) {
    console.log('calcame');
    console.log(product.id);
    // this.listOfPosts.push(post);
    // this.http.patch('http://localhost:3000/APPOINTMENT_DATA' ,product).subscribe((res) => {

    this.http
      .put<any>(`${this.baseUrl}APPOINTMENT_DATA/3`, product)
      .subscribe((res) => {
        console.log(product.id);
      });
  }

  deletePostapp(id: number | undefined) {
    // this.listOdeletefPosts.splice(index, 1);
    console.log('deletevalue' + id);
    this.http
      .delete(`${this.baseUrl}Appointments/` + id)
      .subscribe((res) => {
        console.log(res);
        this.getAppointmentData();
      });
  }
  UpdateStatus(id: string, data: Product) {
    // this.listOdeletefPosts.splice(index, 1);
    // const token = localStorage.getItem('token');
    // var myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');
    // if (token != null) {
    //   myHeaders.append('Authorization', `Bearer ${token}`);
    // }
    // var raw = JSON.stringify(data);
    // return fetch(
    //   `${this.baseUrl}api/NurseDash/UpdateNextPatient?Id=${id}`,
    //   {
    //     method: 'PUT',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow',
    //   }
    // );
    return this.http.put<any>(`${this.baseUrl}NurseDash/UpdateNextPatient?Id=`+id, data);
  }

  getDoctorListData(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(this.API_URL1);
  }

  getUpcomingAppointments(): Observable<Product[]> {
    return this.http.get<Product[]>(this.UP_URL);
  }

  getBartData(): Observable<Bardata[]> {
    return this.http.get<Bardata[]>(this.BAR_URL);
  }

  //Dash Board Changes End

  //Calendar Changes Start
  //Data Mappingrtf
  // private listEvent: EventMap[] = [];

  // GetEventData(): Promise<EventInput[]> {
  //   return Promise.resolve(INITIAL_EVENTS);
  // }

  //Call Events Before loading to Component
  // GetData() {
  //   this.http
  //     .get<EventMap[]>(this.baseUrl + Admin.Event)
  //     .subscribe((res: EventMap[]) => {
  //       this.listEvent.splice(0, this.listEvent.length);
  //       this.listEvent.push(...res);
  //     });
  // }

  //List Of ALL Events
  // GetListofData() {
  //   return this.http.get<EventMap[]>(this.baseUrl + Admin.Event);
  // }

  //Calendar Changes End
}
