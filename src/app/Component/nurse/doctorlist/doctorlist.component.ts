import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditDailogeComponent } from '../dailoge/edit-dailoge/edit-dailoge.component';
import { DailogeService } from 'src/app/Services/dailoge.service';

import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctordata';
import { Attendance, Specialization } from 'src/app/models/Attendance';
import { BookAppointmentService } from 'src/app/Services/BookAppointment/book-appointment.service';
import { Employee, Physician } from 'src/app/models/patient.model';
import { PhysicianService } from 'src/app/Services/Physician/physician.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/Services/loader.service';

@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css']
})

export class DoctorlistComponent implements OnInit {
  displayedColumns = ['id', 'firstName', 'speciliazation', 'physicianId', 'timeSlot', 'dateTime', 'isAbsent'];


  doctorlist: Specialization[] = [];


  dataSource1 !: MatTableDataSource<Attendance>;
  dataSource2!: MatTableDataSource<Attendance>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort, {}) sort !: MatSort;
  pastVisit: string = "PastVisit";
  specialistcheck = false;
  constructor(public dialogService: MatDialog, public fb: FormBuilder, private physicianservice: PhysicianService, public appoiService: DailogeService, private router: Router, private service: BookAppointmentService,) { }

  ngOnInit() {
    this.getdata();
    this.getSpecialization();
  }
  speciliazation: string = '';

  form = this.fb.group({

    speciliazation: ['', [Validators.required]],
  });

  getdata() {
    this.appoiService.getDoctorListData().subscribe(data => {
      this.dataSource1 = new MatTableDataSource(data)
      this.dataSource1.paginator = this.paginator;
      console.log(this.dataSource1)

    });


  }

  getSpecialization() {

    this.physicianservice
      .GetAllSpecialization()
      .subscribe((x) => {

        this.doctorlist.push(...x);

      });


  }

  applyFilter(filterValue: any) {
    let itemvalue = filterValue.target.value;
    this.dataSource1.filter = itemvalue.trim().toLowerCase();
    this.dataSource1.paginator = this.paginator;

  }

  select(e: any) {


    let itemvalue = e;
    if (itemvalue != undefined) {
      ///this.dataSource1.filter = itemvalue.trim().toLowerCase();
      this.dataSource1.paginator = this.paginator;
      this.dataSource1.filter = itemvalue.trim().toLowerCase();


      // this.dataSource2.paginator = this.paginator;
      // this.dataSource2.filter = itemvalue.trim().toLowerCase();

    }
    else {
      this.getdata();

    }
  }



}
