import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, noop } from 'rxjs';
import { AdminService } from 'src/app/Services/admin.service';
import { DailogeService } from 'src/app/Services/dailoge.service';
import { Master } from 'src/app/models/admin.model';
import { HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  Appointments!: any;
  LockedAccount: number = 0;
  selectedValue: string = '1';
  searchText!: string;
  file!: File ;
  progress!: number;
  message!: string;
  masters: Master[] = [
    { value: '1', viewValue: 'None' },
    { value: '2', viewValue: 'Allergy' },
    { value: '3', viewValue: 'Drugs' },
    { value: '4', viewValue: 'Diagnosis' },
    { value: '5', viewValue: 'Procedure' },
    { value: '6', viewValue: 'Procedure' },
    { value: '7', viewValue: 'Subscription' }
  ];

  constructor(
    private adminservice: AdminService,
    public appoiService: DailogeService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getAppointmentCount();
    this.adminservice.GetAdminDashboard().subscribe((x) => {
      this.LockedAccount = x[0].LockedAccount;
    });

    this.adminservice.Observeevent().subscribe((res) => {
      console.log(res);
    });

    const $http = this.adminservice.TempGetAdminData();

    const $data = $http.pipe(map((res) => console.log(res)));

    this.adminservice.TestData().subscribe((res) => {
      console.log(res);
      //alert(res);
    });
    
    this.filterMasters('1');
  }

  DashboardRedirectURL(navigate: any) {
    if (navigate == 'locked') {
      this.router.navigateByUrl('/LockedAccount');
    } else if (navigate == 'patient') {
      this.router.navigateByUrl('/AdminPatient');
    } else if (navigate == 'hospital') {
      this.router.navigateByUrl('/AdminHospital');
    }
  }
  Onappointment() {
    this.router.navigateByUrl('/AppointmentView');
  }
  getAppointmentCount() {
    this.appoiService.getAppointmentData().subscribe((data) => {
      this.Appointments = data.length;
      console.log(data);
    });
  }

  filterMasters(val: any) {
    if (val == '1') {
    console.log('NULL.');
    } else if (val == '2') {
      console.log('Selected Value is 2.');
    } else if (val == '3') {
      console.log('Selected Value is 3.');
    } else if (val == '4') {
      console.log('Selected Value is 4.');
    } else if (val == '5') {
      console.log('Selected Value is 5.');
    } else if (val == '6') {
      console.log('Selected Value is 6.');
    } else {
      console.log('Selected Value is 7.');
    }
  }

  searchAppointments(val: any) {
    this.searchText = val.target.value;
    this.filterMasters(this.selectedValue);
  }

  import(){
    if(this.selectedValue == '1'){
      alert('Please select master from dropdownlist');
    }
    else if(this.file == null)
    {
      alert('Please select file.');
    }
    else
    {
      let fileToUpload = this.file;
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      this.appoiService.uploadMastertData(formData)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress){
            this.progress = Math.round(100 * event.loaded / event.total);
            alert('Uploaded' + this.progress + '%');
          }
          else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
          }
        });
    }
  }

  onFileSelected(event: any){
    this.file = event.target.files[0];
    // console.log(this.file);
  }
}
