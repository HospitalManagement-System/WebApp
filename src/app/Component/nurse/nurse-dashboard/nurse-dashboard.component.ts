import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { data } from '../../../models/dynamic_data';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminUsersService } from 'src/app/Services/Admin/admin-users.service';
import { MatDialog } from '@angular/material/dialog';
import { DailogeService } from 'src/app/Services/dailoge.service';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/Services/loader.service';

@Component({
  selector: 'app-nurse-dashboard',
  templateUrl: './nurse-dashboard.component.html',
  styleUrls: ['./nurse-dashboard.component.css']
})
export class NurseDashboardComponent implements OnInit {

  productSearchForm?: FormGroup;
  showProgress = false;
  showTableResults = false;
  @Input() chartData: any;

  results = data;
  allResults = data;
  fakeData: any;
  appointmentCount!:any;
  upappointmentCount!:any;

  //row: any;

  //test
  value?: string = 'abcd';
  columns: any[] = [
    {
      columnDef: 'id',
      header: 'ID',
      dataName: (row: { id: any }) => `${row.id}`,
    },
    
    {
      columnDef: 'name',
      header: 'Name',
      dataName: (row: { name: any }) => `${row.name}`,
    },
    {
      columnDef: 'status',
      header: 'Status',
      dataName: (row: { status: any }) => `${row.status}`,
    },   
    {
      columnDef: 'detailBtn',
      header: 'Action',
      dataName: (row: { guid: any }) => `${row.guid}`,
    },
  ];
  pageIndex = 1;
  pageSize = 5;
  metaCount?: number;

  constructor(private userService: AdminUsersService,public dialogService: MatDialog, public appoiService: DailogeService, private router:Router) {
    this.fakeData = data;
  }

  ngOnInit() {
    this.getAppointmentCount();
    this. getUpAppointmentCount();
    this.productSearchForm = new FormGroup({
      productSearchBox: new FormControl('', {
        validators: [Validators.required],
      }),
    });
   
  }

  onSubmit() {
    this.getProductsSearched(this.productSearchForm?.value.productSearchBox);
  }

  getProductsSearched(searchTerm: any) {
    alert(searchTerm)
    this.allResults = this.fakeData;
  }

  getAppointmentCount() {
    this.appoiService.getAppointmentData().subscribe(data => {
      this.appointmentCount=data.length;
      console.log(data)
    });
  }
  getUpAppointmentCount() {
    this.appoiService.getUpcomingAppointments().subscribe(data => {
      this.upappointmentCount=data.length;
      console.log(data)
    });
  }

  getAllProducts(pageIndex: number, pageSize: number) {
    // this.productSearchForm.reset(); // clear search field for better UX
console.log(pageIndex,pageSize);
    this.allResults = this.fakeData;
    this.metaCount = this.results.length;
    // console.log(this.metaCount);
    // console.log(this.results)
  }

  tabClick(tab: any) {
    if ((tab.index = 1)) {
      this.getAllProducts(this.pageIndex, this.pageSize);
    }
  }

  // Functions used by data-table component
  updatePagination(event: any) {
    console.log(event);
    const correctedIndex = event.pageIndex + 1;
    this.getAllProducts(correctedIndex, event.pageSize);
  }

  viewItem(guid: any) {
    alert(guid);
  let da=  this.fakeData.find((i: { guid: any; })=>i.guid==guid)
  alert(da.name);
  }
  
  Onappointment(){
    console.log("vamsiclicked")
    this.router.navigateByUrl('/AppointmentView');
  }
  Onsubmitbook(){
    console.log("vamsiclicked")
    this.router.navigateByUrl('/Inbox');
  }
  Onsubmitbar(){
    console.log("vamsiclickedt")
    this.router.navigateByUrl('/NursegridView');
  }
  Ondoctorlist(){
    console.log("VamsiOnDoctor")
    this.router.navigateByUrl('/NurseUpcomingAppointmentComponent');
  }
  Oncalender(){
    this.router.navigateByUrl('/NurseAdminCalender');
  }

}
