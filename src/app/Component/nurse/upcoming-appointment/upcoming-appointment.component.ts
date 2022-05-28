import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditDailogeComponent } from '../dailoge/edit-dailoge/edit-dailoge.component';
import { DailogeService } from 'src/app/Services/dailoge.service';
import { Product } from 'src/app/models/appointment';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/Services/loader.service';

@Component({
  selector: 'app-upcoming-appointment',
  templateUrl: './upcoming-appointment.component.html',
  styleUrls: ['./upcoming-appointment.component.css']
})
export class UpcomingAppointmentComponent implements OnInit {

  displayedColumns = ['id', 'name', 'gender', 'diagnosis', 'mobile', 'bookslot', 'appointmentdatetime','physician','edit','delete'];
  dataSource1 !: MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort, {}) sort !: MatSort;

  pastVisit:string="PastVisit";
  constructor(public dialogService: MatDialog, public appoiService: DailogeService, private router:Router) { }

  ngOnInit() {
    this.getdata();
  }
  getdata() {
    this.appoiService.getUpcomingAppointments().subscribe(data => {
      this.dataSource1 = new MatTableDataSource(data)    
      this.dataSource1.paginator = this.paginator;
      console.log(data)
    });
  }
  startEdit(data: any[]) {    
    const dialogRef = this.dialogService.open(EditDailogeComponent, {
      data: { data }
    });
    dialogRef.afterClosed().subscribe(r=>{
      this.getdata()
    })
  }
  applyFilter(filterValue: any) {
    let itemvalue = filterValue.target.value;   
    this.dataSource1.filter = itemvalue.trim().toLowerCase();
    this.dataSource1.paginator = this.paginator;

  }
  onDelete(rowid: number) {
    this.appoiService.deletePostapp(rowid);
    this.getdata();
  }
  onUpdate(rowid: number,product: Product) {
    this.appoiService.deletePostapp(rowid);
    this.getdata();
  }

  OnVisit(){
    
    console.log("vamsiclicked")
    this.router.navigateByUrl('/nurseBookappointment');
  }
  OnVitalRecord(){
    
    console.log("vamsiclicked")
    this.router.navigateByUrl('/NursePatientViewdetails');
  }
  OnProviousVisit(){
    
    console.log("vamsiclicked")
    this.router.navigateByUrl('/NursePreviousVisitDetails');
  }
}


function ELEMENT_DATA(ELEMENT_DATA: any) {
  throw new Error('Function not implemented.');
}

