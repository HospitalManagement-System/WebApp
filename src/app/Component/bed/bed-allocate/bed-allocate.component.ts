import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BedManagement, bedRequest, BedType } from 'src/app/models/bedallocate';
import { BedmangeService } from 'src/app/Services/Bed/bedmange.service';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/Services/loader.service';
import { Diagnosics, Physician } from 'src/app/models/patient.model';
import { BookAppointmentService } from 'src/app/Services/BookAppointment/book-appointment.service';
import { AllocatedPatientDetails} from 'src/app/models/patientdetails-model';
import { patientdetails } from 'src/app/Services/patientdetails.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-bed-allocate',
  templateUrl: './bed-allocate.component.html',
  styleUrls: ['./bed-allocate.component.css']
})
export class BedAllocateComponent implements OnInit {
  @Input() bedRequest!: bedRequest;
  allocateForm: FormGroup;
  bedManagement: BedManagement;
  private formSubmitAttempt!: boolean;
  bedEnums: any;
  diagnosics: Diagnosics[] = [];
  physician: Physician[] = [];
  disableDate: boolean = true;
  public genderList: Array<any> = [
    { key: '1', value: 'Male' },
    { key: '2', value: 'Female' },
    { key: '3', value: 'Others' },
  ];
  public titleList: Array<any> = [
    { key: '1', value: 'Mr' },
    { key: '2', value: 'Ms' },
    { key: '3', value: 'Mrs' },
  ];
  ngOnChanges() {
    this.bedManagement = this.bedRequest.bedDetails;
  }
  ngOnInit(): void {
    this.service1.GetSpecialization().subscribe((res) => {
      this.diagnosics.push(...res);
    });
  }
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<BedAllocateComponent>, @Inject(MAT_DIALOG_DATA) public data: bedRequest, public service: BedmangeService, private service1: BookAppointmentService,private patient: patientdetails) {
    this.bedManagement = data.bedDetails;
    this.bedEnums = Object.keys(BedType).filter(f => isNaN(Number(f)));
    this.allocateForm = this.fb.group({
      title:['',[Validators.required]],
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email:[''],
      gender:['', [Validators.required]],
      alternativephone: ['', [Validators.required]],
      diagnosicsName: ['', [Validators.required]],
      phsicianId: ['', [Validators.required]],
      dob: [[Validators.required]],
      pinCode:['',[Validators.required]],
      IsFatal:['true'],
      address:['',[Validators.required]]
    });
  }
  isFieldInvalid(field: string) {
    return (
      (!this.allocateForm.get(field)!.valid && this.allocateForm.get(field)!.touched) ||
      (this.allocateForm.get(field)!.untouched && this.formSubmitAttempt)
    );
  }
  Allocate() {
    if (this.allocateForm.valid) {
      let PatientDetails:AllocatedPatientDetails={
        title:this.allocateForm.value.title,
        firstName: this.allocateForm.value.name,
        lastName: '',
        dateofBirth: this.allocateForm.value.dob.format("YYYY-MM-DD HH:mm:ss"),
        age: this.allocateForm.value.age,
        gender: this.allocateForm.value.gender,
        email: this.allocateForm.value.email,
        address: this.allocateForm.value.address,
        pincode: this.allocateForm.value.pinCode,
        contact: this.allocateForm.value.phone,
        isFatal: false,
        createddate: new Date(),
        allergyDetails: this.allocateForm.value.diagnosicsName,
        physicianId: this.allocateForm.value.phsicianId,
        bedDetails:this.data.bedDetails
      }
      this.patient
        .addpatient(PatientDetails)
        .then((response) => response.text())
        .then((result) => {
          if (result != 'Fail') {
             this.dialogRef.close(result);
          } else {
            alert('Not Added');
          }
        })

        .catch((error) => console.log('error', error));
    }
    this.formSubmitAttempt = true;
  }
  changeDiagnosics(e: any) {
    if (e.value != null) {
      this.service1.GetPhysicianById(e.value).subscribe((res) => {
        if (res.length > 0)
          this.physician = res;
        else
          this.physician = [];
      });
    }
  }
}
