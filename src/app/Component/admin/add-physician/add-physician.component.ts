import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map } from 'rxjs';
import { AdminService } from 'src/app/Services/admin.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Employee } from 'src/app/models/patient.model';
import {
  Department,
  Designation,
  Eduaction,
  Gender,
  Specalization,
} from 'src/app/models/admin.model';

@Component({
  selector: 'app-add-physician',
  templateUrl: './add-physician.component.html',
  styleUrls: ['./add-physician.component.css'],
})
export class AddPhysicianComponent implements OnInit {
  UserType: string = '';
  Type?: string;
  Physician!: FormGroup;
  loading = false;
  submitted = false;
  Gender: any;
  genderdata: Gender[] = [];
  designationdata: Specalization[] = [];
  designation: any;
  educationdata: Eduaction[] = [];
  eduaction: any;
  department: any;
  departmentdata: Designation[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  Result: string = '';

  specalization: Specalization[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private adminservice: AdminService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((res) => {
      this.UserType += res.get('type');
    });

    this.adminservice.Gender().subscribe((res) => {
      this.genderdata.push(...res);
    });

    // this.genderdata = ['Male', 'Female', 'Other'];
    if (this.UserType === 'physician') {
      this.Type = 'Physician';

      if (this.UserType === 'physician') {
        this.adminservice.EduactionList(this.Type).subscribe((res) => {
          this.educationdata.push(...res);
        });

        this.adminservice.Designation(this.Type).subscribe((res) => {
          this.designationdata.push(...res);
        });

        this.adminservice.Specialization(this.Type).subscribe((res) => {
          this.specalization.push(...res);
        });

        this.adminservice.Department(this.Type).subscribe((res) => {
          this.departmentdata.push(...res);
        });
      }
    } else if (this.UserType === 'nurse') {
      this.Type = 'Nurse';

      if (this.UserType === 'nurse') {
        this.adminservice.EduactionList(this.Type).subscribe((res) => {
          this.educationdata.push(...res);
        });
        this.adminservice.Designation(this.Type).subscribe((res) => {
          this.designationdata.push(...res);
        });
        this.adminservice.Specialization(this.Type).subscribe((res) => {
          this.specalization.push(...res);
        });

        this.adminservice.Department(this.Type).subscribe((res) => {
          this.departmentdata.push(...res);
        });
      }
    }

    this.FormData();
  }

  FormData() {
    this.Physician = this.formBuilder.group({
      firstName: [
        null,
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ],
      Gender: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      designation: ['', Validators.required],
      education: ['', Validators.required],
      // image: [''],
      lastName: ['', Validators.required],
      mobile: ['', Validators.required, Validators.maxLength(10)],
      dob: ['', Validators.required],
      department: ['', Validators.required],
      address: ['', Validators.required],
      costPerVisit:['',Validators.required]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.Physician.controls;
  }
  get name() {
    this.submitted = false;
    return this.Physician.get('firstName');
  }

  //Gender
  genderChange(e: any) {
    this.Gender.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  get gendererror() {
    return this.Physician.get('Gender');
  }

  //Email
  get emailerror() {
    return this.Physician.get('Email');
  }

  //Designation

  get designationerror() {
    return this.Physician.get('designation');
  }

  designationChange(e: any) {
    this.designation.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  //Eduaction
  get educationerror() {
    return this.Physician.get('education');
  }

  eduactionChange(e: any) {
    this.eduaction.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  //image
  get imageerror() {
    return this.Physician.get('image');
  }

  //Last Name
  get lastnameerror() {
    return this.Physician.get('lastName');
  }

  //Mobilenumber
  get mobileerror() {
    return this.Physician.get('mobile');
  }

  //Dob
  get doberror() {
    return this.Physician.get('dob');
  }

  //department
  get departmenterror() {
    return this.Physician.get('department');
  }

  departmentChange(e: any) {
    this.department.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  //Address
  get addresserror() {
    return this.Physician.get('address');
  }

  public uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    // this.http
    //   .post('https://localhost:5001/api/upload', formData, {
    //     reportProgress: true,
    //     observe: 'events',
    //   })
    //   .subscribe((event) => {
    //     if (event.type === HttpEventType.UploadProgress)
    //       this.progress = Math.round((100 * event.loaded) / event.total);
    //     else if (event.type === HttpEventType.Response) {
    //       this.message = 'Upload success.';
    //       this.onUploadFinished.emit(event.body);
    //     }
    //   });
  };

  public uploadFinished = (event: any) => {
    alert(event);
  };

  onSubmit(): void {
    this.submitted = true;

    if (this.Physician.invalid) {
      return;
    } else {
      if (this.UserType != null) {
        var data = this.Physician.value;
        var TitleData = data.Gender == 'Male' ? 'MR' : 'MS';
        var MobileData = new Number(data.mobile);
        var PhysicianData: Employee = {
          userName: data.Email,
          Role: this.UserType,
          employeeDetails: {
            title: TitleData,
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: data.dob,
            contact: MobileData.toString(),
            specialization: data.designation,
            email: data.Email,
            Designation: data.department,
            CostPerVisit:data.costPerVisit
          },
        };

        // alert(this.Physician.value);
        //Service
        this.adminservice
          .PostPatient(PhysicianData)
          .then((response) => response.text())
          .then((result) => {
            this.Result += result;
            if (this.Result == 'Success') {
              const snackBarRef = this._snackBar.open(
                `${this.UserType} Created Successfully`,
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
                  this.Physician.reset();
                }
              });
            }
          })
          .catch((error) => console.log('error', error));
      }
    }
  }
}
