import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { guid } from '@fullcalendar/angular';
import { Product } from 'src/app/models/appointment';
import { Attendance } from 'src/app/models/Attendance';
import { GenerateTimeSlot } from 'src/app/models/Globalfunctions';
import { Booking } from 'src/app/models/patient.model';
import { AlertService } from 'src/app/Services/Alert/alert.service';
import { BookAppointmentService } from 'src/app/Services/BookAppointment/book-appointment.service';
import { DailogeService } from 'src/app/Services/dailoge.service';
import { PhysicianService } from 'src/app/Services/Physician/physician.service';
import { Specialization } from 'src/app/models/Attendance';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { MatDialog } from '@angular/material/dialog';
import { EditDailogeComponent } from '../nurse/dailoge/edit-dailoge/edit-dailoge.component';
import { CacheInfo } from '../shared/CacheInfo';
export interface UsersData {
  name: string;
  id: number;
  Status: string;
}

const ELEMENT_DATA: UsersData[] = [
  { id: 1560608769632, name: 'Artificial Intelligence', Status: 'On-going' },
  { id: 1560608796014, name: 'Machine Learning', Status: 'Confirmed' },
  { id: 1560608787815, name: 'Robotic Process Automation', Status: 'Failed' },
  { id: 1560608805101, name: 'Blockchain', Status: 'Confirmed' },
];
export interface Food {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}
@Component({
  selector: 'app-physician',
  templateUrl: './physician.component.html',
  styleUrls: ['./physician.component.css'],
})
export class PhysicianComponent implements OnInit {

  submitted=false;

  dataSource: Food[] = [
    { name: 'Yogurt', calories: 159, fat: 6, carbs: 24, protein: 4 },
    { name: 'Sandwich', calories: 237, fat: 9, carbs: 37, protein: 4 },
    { name: 'Eclairs', calories: 262, fat: 16, carbs: 24, protein: 6 },
    { name: 'Cupcakes', calories: 305, fat: 4, carbs: 67, protein: 4 },
    { name: 'Gingerbreads', calories: 356, fat: 16, carbs: 49, protein: 4 },
  ];
  displayedColumns: string[] = [];

  // displayedColumns1: string[] = ['id', 'name', 'Status', 'action'];
  // dataSource1 = ELEMENT_DATA;
  // displayedColumns2: string[] = ['id', 'name', 'action'];
  // dataSource2 = ELEMENT_DATA;
  // Slots = new FormControl();

  displayedColumnsappoinment = [
    'id',
    'name',
    'gender',
    'mobile',
    'age',
    'physician',
    'physicianId',
    'nurseId',
    'patientId',
    'action',
  ];
  // 'isCompleted' , 'AppointmentDateTime' , 'modifiedDate' , 'deletedBy' , 'deletedDate' , 'patientId' ,
  //   'physicianId'
  //    , 'nurseId'
  dataSource1!: MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {}) sort!: MatSort;

  displayedColumnspatient = ['id', 'name', 'physician', 'diagnosis', 'edit'];

  listOfPosts: Attendance[] = [];
  form: FormGroup = new FormGroup({});
  empdata!: Attendance;
  ModeTypes?: Array<string>;
  diagnosicscheck?: boolean;
  datecheck?: boolean;
  firstslot!: Array<string>;
  secondslot!: Array<string>;
  incomingslot: Array<string> = [];
  outgoingslot!: Array<string>;

  Patient!: any;
  Result: string = '';
  // SlotList: Attendance[] = [];

  //SlotList : string[] = ['9:30 to 10:30', '10:30 to 11', '10:30 to 11:30', '9:30 to 10:30', '9:30 to 10:30', '9:30 to 10:30'];

  constructor(
    private service: BookAppointmentService,
    private formBuilder: FormBuilder,
    public dialogservice: DailogeService,
    private physicianservice: PhysicianService,
    private titleService: Title,
    private router: Router,
    private alterservice: AlertService,
    private _snackBar: MatSnackBar
  ) {}

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  specialist!: Specialization[];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  appointmentCount!: any;
  upappointmentCount!: any;
  ngOnInit(): void {
    //this. getPatientCount();
    var date = new Date();
    var full =
      date.getDate() + '-' + date.getMonth() + 1 + '-' + date.getFullYear();

    var SendDatetoSlot =
      date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate();
    var slot = this.SlotGenerator('Nurse', SendDatetoSlot);

    // this.getdoctordata()
    var Get = CacheInfo.get("currentUser");
    if (typeof Get === 'string') {
      var phid = JSON.parse(Get).id;
    }
    this.form = new FormGroup({
      physicianid: new FormControl(phid, null),
      date: new FormControl([Validators.required]),
      timeSlot: new FormControl(this.empdata?.arrTimeSlot),
      isAbsent: new FormControl([Validators.required]),
    });

    this.getTodayAppoinmentdata();
    this.getAppointmentCount();
    this.getUpAppointmentCount();
  }


  getAppointmentCount() {
    this.dialogservice.getAppointmentData().subscribe((data) => {
      this.appointmentCount = data.length;
      console.log(data);
    });
  }
  getUpAppointmentCount() {
    this.dialogservice.getUpcomingAppointments().subscribe((data) => {
      this.upappointmentCount = data.length;
      console.log(data);
    });
  }
 

  SlotGenerator(UserType: string, date: string): any {
    if (UserType == 'Nurse') {
      this.diagnosicscheck = false;
      this.datecheck = false;
      const start = new Date('2019-08-08 09:00');
      const end = new Date('2019-08-08 20:00');
      const timespan = 30 * 60; // 30 minutes
      const siestas = [
        {
          start: '2019-08-08 8:00',
          end: '2019-08-08  8:30',
        },
      ];

      let [firstslot, secondslot] = GenerateTimeSlot(
        start,
        end,
        timespan,
        siestas
      );
      this.firstslot = firstslot;
      this.secondslot = secondslot;
      this.service
        .GetBookSlot('2791E8B4-CF75-451A-9C30-A00D173879AB', date)
        .subscribe((res: string | any[]) => {
          for (var i = 0; i < res.length; i++) {
            this.incomingslot.push(res[i].bookslot);
          }
          const duplicate = this.incomingslot;
          let unique = [...new Set(duplicate)];
          this.firstslot = firstslot.filter(
            (val: any) => !unique.includes(val)
          );
          this.secondslot = secondslot.filter(
            (val: any) => !unique.includes(val)
          );
          console.log(this.firstslot);

          this.ModeTypes = this.firstslot;
        });
    }
  }
  Ondoctorlist(){
    console.log("VamsiOnDoctor")
    this.router.navigateByUrl('/PhysicianUpcomingAppointmentComponent');
  }
  OnInbox(){
    console.log("VamsiOnDoctor")
    this.router.navigateByUrl('/Inbox');
  }
  
  OnclickCalander(){
    console.log("VamsiOnDoctor")
    this.router.navigateByUrl('/ViewPhysician');
  }

  Onappointment() {
    console.log('vamsiclicked');
    this.router.navigateByUrl('/AppointmentView');
  }

  AddPhysiciandetails(index: number) {
    this.submitted=true;
    var dataemployee: Attendance = {
      physicianId: this.form.value.physicianid,
      dateTime: this.form.value.date,
      arrTimeSlot: this.form.value.timeSlot,
      isAbsent: this.form.value.isAbsent,
    };
    this.physicianservice
      .addPhysicianPost(dataemployee)
      .then((response) => response.text())
      .then((result) => {
        this.Result += result;
        if (this.Result == 'Success') {
          const snackBarRef = this._snackBar.open(
            `Attendnace Update Successfully`,
            'Done',
            {
              panelClass: 'success',
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 5000,
            }
          );
          snackBarRef.afterDismissed().subscribe((info) => {
            if (info.dismissedByAction === true) {
              // your code for handling this goes here
            }
          });
        }
      })
      .catch((error) => console.log('error', error));
  }

  onSubmit() {
    if (this.form.valid) {
      this.alterservice.success('Attendance Submitted!');
      this.form.reset();
    }
  }
  getTodayAppoinmentdata() {
    this.physicianservice.getAppointmentnextpatientData().subscribe((data) => {
      this.dataSource1 = new MatTableDataSource(data);
      this.dataSource1.paginator = this.paginator;
      console.log(this.dataSource1);
    });
  }
 


 
 
  applyFilter(filterValue: any) {
    let itemvalue = filterValue.target.value;
    this.dataSource1.filter = itemvalue.trim().toLowerCase();
    this.dataSource1.paginator = this.paginator;
  }
  onDelete(rowid: number) {
    this.dialogservice.deletePostapp(rowid);
    this.getTodayAppoinmentdata();
  }
  OnVitalRecord(rowid: any) {
    // this.router.navigateByUrl('/NursePatientViewdetails');
    this.router.navigate(['PhysicianPatientViewdetails'], {
      queryParams: { appointmentId: rowid },
    });
  }
}
