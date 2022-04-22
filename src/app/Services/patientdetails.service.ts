import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { url } from "inspector";

import { catchError, map, observable, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CacheInfo } from '../Component/shared/CacheInfo';
import { Allergy } from '../models/allergy-model';
import { PatientdetailsDemo } from '../models/patientdetails-model';
import { patientvisitdetails } from '../models/patientvisitdetails';
import { Postal } from '../models/postal-model';
import { Patient } from './Url';

@Injectable({ providedIn: 'root' })
export class patientdetails {
  [x: string]: any;
  // postobj:Patientdetails=new Patientdetails();

  patientvisitdetailsobj: patientvisitdetails = new patientvisitdetails();
  constructor(private http: HttpClient) {}
  private patientdetailslist: PatientdetailsDemo[] = [];
  private patientAddressdetailslist: Postal[] = [];
  private patientVisitDetailslist: patientvisitdetails[] = [];
  private allergyList: Allergy[] = [];
  baseUrl = environment.URL;
  //patientdetailscreen
  addPost(post: PatientdetailsDemo) {
    this.http
      .post(
        `${environment.URL}Demographicsdetails/PostPatientdemographicsdetails`,
        post
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  fetchfrombackendfromid1(id: any) {
    const token = JSON.parse(CacheInfo.get("currentUser")).token;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    return fetch(
      `${environment.URL}Demographicsdetails?Patientid=${id}`,
      {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      }
    );
  }

  deletePost(id: number | undefined) {
    // this.listOfPosts.splice(index, 1);

    this.http.delete('http://localhost:3000/posts/' + id).subscribe((res) => {
      console.log(res);
    });
  }
  UpdatePatientdetails(demoid: string, postobj: PatientdetailsDemo) {
    console.log(demoid);
    const token = JSON.parse(CacheInfo.get("currentUser")).token;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    var raw = JSON.stringify(postobj);
    console.log(raw);

    return fetch(
      `${environment.URL}Demographicsdetails/UpdateDemographic/${demoid}`,
      {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      }
    );
  }

  getCountrynamefrompincodconsole(Countrycode: string, pincode: Number) {
    return this.http.get<any>(
      'https://api.worldpostallocations.com/?postalcode=' +
        pincode +
        '&countrycode=' +
        Countrycode
    );
  }
  //get allergy list for dropdown
  getallergydata() {
    const token = JSON.parse(CacheInfo.get("currentUser")).token;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    return fetch(`${environment.URL}Master/GetallAllergydetails`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    });
  }
  getAllerynamefromallergytype(AllergyType: string) {
    const token = JSON.parse(CacheInfo.get("currentUser")).token;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    return fetch(
      `${environment.URL}Master/GetdetailsfromAllergytype?AllergyType=${AllergyType}`,
      {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      }
    );
  }
  //patientvisitdetails

  Addpatientvisitdetails(patientvisitobj: patientvisitdetails) {
    const token = JSON.parse(CacheInfo.get("currentUser")).token;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }

    var raw = JSON.stringify(patientvisitobj);
    console.log(raw);

    return fetch(`${environment.URL}PatientDetails`, {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    });
  }

  UpdatePatientvisitdetails(
    patientvisitdetailsobj: patientvisitdetails,
    visitid: string
  ) {
    const token = JSON.parse(CacheInfo.get("currentUser")).token;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    var raw = JSON.stringify(patientvisitdetailsobj);
    console.log(raw);
    return fetch(
      `${environment.URL}PatientDetails/PutPatientDetails?id=${visitid}`,
      {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      }
    );
  }

  Getpatientvisitdetailsfromid(id: string) {
    // const getuser = localStorage.getItem('USerID');
    const token = JSON.parse(CacheInfo.get("currentUser")).token;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    return fetch(
      `${environment.URL}PatientDetails?Appointmentid=${id}`,
      {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      }
    );
  }

  Getpatientvisitdetailsfrompatientid(id: any) {
    // const getuser = localStorage.getItem('USerID');

    return this.http.get<any>(
      `${environment.URL}Master/Getdiagnosisdetails`
    );
  }
  GetRole(id: any) {
    const token = JSON.parse(CacheInfo.get("currentUser")).token;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    return fetch(`${environment.URL}Master/GetRole?id=${id}`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    });
  }
  GetDiagnosisdetails() {
    return this.http.get<any>(
      `${environment.URL}Master/Getdiagnosisdetails`
    );
  }
  GetProceduredetails() {
    return this.http.get<any>(
      `${environment.URL}Master/Getproceduredetails`
    );
  }
  GetMedicationdetails() {
    return this.http.get<any>(
      `${environment.URL}Master/Getdrugdetails`
    );
  }
  GetidfromDiagnosisdetails(diagnosisdetails: string) {
    return this.http.get<any>(
      'http://localhost:3000/diagnosisdetails?Discription' + diagnosisdetails
    );
  }
  GetPreviousvisitdetails() {
    return this.http.get<any>(
      'http://localhost:3000/previousvisitdetails?PatientID=4'
    );
  }
  Updatepreviousvisitdetails() {}
  GetPatientId(UserID: any) {
    const token = JSON.parse(CacheInfo.get("currentUser")).token;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    return fetch(
      `${environment.URL}Master/GetPatientId?userid=${UserID}`,
      {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      }
    );
  }

  Observeevent() {
    const $http = new Observable((observer) => {
      fetch(this.baseUrl + '/visitdetails')
        .then((res) => {
          return res.json();
        })

        .then((body) => {
          observer.next(body);

          observer.complete();
        })

        .catch((err) => {
          observer.error(err);
        });
    });
  }
}
