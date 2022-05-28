import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { bedRequest } from 'src/app/models/bedallocate';
import { PatientAllDetails } from 'src/app/models/billInfo';
import { BillService } from 'src/app/Services/Bill/bill.service';

@Component({
  selector: 'app-bill-info',
  templateUrl: './bill-info.component.html',
  styleUrls: ['./bill-info.component.css']
})
export class BillInfoComponent implements OnInit {
  bill: PatientAllDetails= new PatientAllDetails();
  todaysDate = new Date();
  phoneorEmail:string="";
  Needsearch:boolean = false;
  NoDataFound:boolean =false;
  constructor(public dialogRef: MatDialogRef<BillInfoComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public data: bedRequest,private service1: BillService) { 
    if(this.data!=null && typeof this.data != "undefined"){
      this.GetBillPatientDetails(this.data.bedDetails.patientId!);
    }
    else{
      this.Needsearch = true;
    }
  }
  ngOnInit(): void { 
  }
  GetBillPatientDetails(PatientId:string) {
    this.service1.GetBillPatientDetails(PatientId!).subscribe((res:PatientAllDetails) => {
      this.showNoData(res);
    });
  }
  showNoData(res:PatientAllDetails){
    if(res.patientDetails!=null){
      this.bill = res;
      this.NoDataFound = false;
    }
    else{
       this.NoDataFound = true;
    }
  }
  ngOnChanges() {
  }
  getDate() {
    return this.todaysDate.toLocaleDateString() + " " + this.todaysDate.toLocaleTimeString();
  }
  onSearch(){
    this.service1.GetBillDetailsFromMailPhone(this.phoneorEmail).subscribe((res:PatientAllDetails) => {
      this.showNoData(res);
    });
  }
}
