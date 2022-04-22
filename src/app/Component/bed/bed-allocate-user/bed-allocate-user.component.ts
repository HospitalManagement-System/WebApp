import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BedManagement, bedRequest, BedType } from 'src/app/models/bedallocate';
import { BedmangeService } from 'src/app/Services/Bed/bedmange.service';

@Component({
  selector: 'app-bed-allocate-user',
  templateUrl: './bed-allocate-user.component.html',
  styleUrls: ['./bed-allocate-user.component.css']
})
export class BedAllocateUserComponent implements OnInit {
  allocateForm: FormGroup;
  bedManagement: BedManagement;
  private formSubmitAttempt!: boolean;
  bedEnums: any;
  ngOnInit(): void {
  }
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<BedAllocateUserComponent>, @Inject(MAT_DIALOG_DATA) public data: bedRequest, public service: BedmangeService) {
    this.bedManagement = data.bedDetails;
    this.bedEnums = Object.keys(BedType).filter(f => isNaN(Number(f)));
    if (data.fromType == 1) {
      this.allocateForm = this.fb.group({
        name: [''],
        phone: [''],
        alternativephone: [''],
      });
    }
    else if (data.fromType == 2) {
      this.allocateForm = this.fb.group({
        name: [''],
        phone: [''],
        alternativephone: [''],
      });
    }
    else {
      this.allocateForm = this.fb.group({
        name: [''],
        phone: [''],
        alternativephone: [''],
      });
    }
  }
  isFieldInvalid(field: string) {
    return (
      (!this.allocateForm.get(field)!.valid && this.allocateForm.get(field)!.touched) ||
      (this.allocateForm.get(field)!.untouched && this.formSubmitAttempt)
    );
  }
  onSubmit() {
    if (this.allocateForm.valid) {
      console.log(this.allocateForm.value);
    }
    this.formSubmitAttempt = true;
  }
  Search(){
    alert("searching")
  }
}
