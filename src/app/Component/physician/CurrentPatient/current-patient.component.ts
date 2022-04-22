import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Product } from 'src/app/models/appointment';
import { PhysicianService } from 'src/app/Services/Physician/physician.service';

@Component({
  selector: 'app-current-patient',
  templateUrl: './current-patient.component.html',
  styleUrls: ['./current-patient.component.css']
})
export class CurrentPatientComponent implements OnInit {
  constructor(public physicianservice: PhysicianService,private titleService:Title) { }

  ngOnInit(): void {
    this.getTodayAppoinmentdata();
  }
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  displayedColumnsappoinment = ['id', 'name', 'gender', 'diagnosis', 'mobile', 'age', 'email','physician', 
  'physicianId' , 'nurseId' ,'patientId','action'];
 // 'isCompleted' , 'AppointmentDateTime' , 'modifiedDate' , 'deletedBy' , 'deletedDate' , 'patientId' ,
 //   'physicianId' 
 //    , 'nurseId'
 dataSource1 !: MatTableDataSource<Product>;
 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort, {}) sort !: MatSort;
 
 getTodayAppoinmentdata() {
  this.physicianservice.getAppointmentnextpatientData().subscribe(data => {
    this.dataSource1 = new MatTableDataSource(data)    
    this.dataSource1.paginator = this.paginator;
    console.log(this.dataSource1)
  });
}
}
