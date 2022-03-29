
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { data } from '../../../models/data';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { previousvisitdetails } from 'src/app/models/previousvisitdetails-model';
import { PatientService } from 'src/app/Services/patient.service';
import { patientvisitdetails } from 'src/app/models/patientvisitdetails';
import { Patient } from 'src/app/Services/Url';
import { patientdetails } from 'src/app/Services/patientdetails.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-previouspatientvisitdetails',
  templateUrl: './previouspatientvisitdetails.component.html',
  styleUrls: ['./previouspatientvisitdetails.component.css']
})
export class PreviouspatientvisitdetailsComponent implements OnInit {
  
  [x: string]: any;
  

  productSearchForm?: FormGroup;
  showProgress = false;
  showTableResults = false;
  previousvisitdetail!:previousvisitdetails[];
  results = data;
  allResults = data;
  Data: any;
 priviousdetailslist:previousvisitdetails[]=[];
  value?: string = 'Hemanth';
  columns: any[] = [
    {
      columnDef: 'Height',
      header: 'Height',
      dataName: (row: {height: any }) => `${row.height}`,
    },
    {
      columnDef: 'Weight',
      header: 'Weight',
      dataName: (row: { weight: any }) => `${row.weight}`,
    },
    {
      columnDef: 'Bloodpressure',
      header: 'Bloodpressure',
      dataName: (row: { bloodpressure: any }) => `${row.bloodpressure}`,
    },
    {
      columnDef: 'bodytemprature',
      header: 'bodytemprature',
      dataName: (row: {bodytemprature: any }) => `${row.bodytemprature}`,
    },
    {
      columnDef: 'Respirationrate',
      header: 'Respirationrate',
      dataName: (row: {respirationrate: any }) => `${row.respirationrate}`,
    },
    {
      columnDef: 'Diagnosisisdiscription',
      header: 'Diagnosisisdiscription',
      dataName: (row: { diagnosisdiscription: any }) => `${row.diagnosisdiscription}`,
    },
    {
      columnDef: 'Procedurediscription',
      header: 'Procedurediscription',
      dataName: (row: { procedurediscription: any }) => `${row.procedurediscription}`,
    },
    {
      columnDef: 'Drugname',
      header: 'Drugname',
      dataName: (row: {drugname : any }) => `${row.drugname}`,
    },
    {
      columnDef: 'Druggenericname',
      header: 'Druggenericname',
      dataName: (row: { druggenericname: any }) => `${row.druggenericname}`,
    },
    {
      columnDef: 'Drugbrandname',
      header: 'Drugbrandname',
      dataName: (row: { drugbrandname: any }) => `${row.drugbrandname}`,
    },
    {
      columnDef: 'Drugform',
      header: 'Drugform',
      dataName: (row: { drugform: any }) => `${row.drugform}`,
    },
    {
      columnDef: 'detailBtn',
      header: 'Edit',
      dataName: (row: { id: any }) => `${row.id}`,
    },
  ];
  pageIndex = 1;
  pageSize = 25;
  metaCount?: number;

  constructor(private userService: AdminService,private router: Router,private route:ActivatedRoute, public patient:patientdetails) {
  
  }
 

  ngOnInit() {
    this.productSearchForm = new FormGroup({
      productSearchBox: new FormControl('', {
        validators: [Validators.required],
       
      }),
    });
      this.patient.Getpatientvisitdetailsfrompatientid(1).subscribe(result=>
        {
          this.Data=result
         console.log(this.Data);

        })

  }

  onSubmit() {
    this.getProductsSearched(this.productSearchForm?.value.productSearchBox);
  }

  getProductsSearched(searchTerm: any) {
    this.allResults = this.Data;
  }

  getAllProducts(pageIndex: number, pageSize: number) {
    // this.productSearchForm.reset(); // clear search field for better UX

    this.allResults = this.Data;
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
   // const correctedIndex = event.pageIndex + 1;
   // this.getAllProducts(correctedIndex, event.pageSize);
    //this.filterAppointments(this.selectedValue, event);
  }

  viewItem(data: any[])
  {
    let value =JSON.stringify(data);
    let parse = JSON.parse(value);
    var guidId=parse.guid
    console.log("edit worked",guidId);
    //alert('hii')
    
   //this.router.navigateByUrl(`PatientViewdetails/${parse.guid}`);
   this.router.navigate(
     [
      `PatientViewdetails`],
      {
        queryParams:{guidId}
      }
     
   )
  }
  getdetails()
  {
    this.patient.GetPreviousvisitdetails().subscribe(result=>this.priviousdetailslist=result)
     
        console.log(this.priviousdetailslist);
       // console.log(result);
      
  }
}

