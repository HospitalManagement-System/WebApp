import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  RequiredValidator,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core/option';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatAccordion } from '@angular/material/expansion';
import { id } from 'date-fns/locale';
import { Observable } from 'rxjs';
import { Allergy } from '../../../models/allergy-model';
// import { logKeyValuePairs } from 'src/app/Models/Globalfunctions';
import { PatientdetailsDemo } from 'src/app/models/patientdetails-model';

import { Postal } from 'src/app/models/postal-model';
import { patientdetails } from 'src/app/Services/patientdetails.service';
import { Patientrelativedetails } from 'src/app/models/patientrelativedetails';
import { CacheInfo } from '../../shared/CacheInfo';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
})
export class PatientDetailsComponent implements OnInit {
  //variable declaration
  value: any;
  Allergytype: string = '';
  AllergyId: string = '';

  Countrycode: string = '';
  Pincode: Number = 0;
  step = 0;
  Demographicid: any;
  AllergyType: any;
  today = new Date();
  panelOpenState = false;
  selectedgender: string | undefined;
  selection: string | undefined;
  Postlist: string[] = [];
  PostAllergyobj: Allergy[] = [];
  listOfAllergytype: string[] = [];
  listOfAllergyName: Allergy[] = [];
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
  postobj!: PatientdetailsDemo;
  relativeobj!: Patientrelativedetails;
  form!: FormGroup;
  postal!: Postal;
  patientid?: string;
  age!: any;
  selected: any;
  // postobj: Patientdetails = new Patientdetails();
  patientAddressdetailslist: Postal[] | undefined;
  RelationshipList: string[] = [
    'Father',
    'Mother',
    'Sibling',
    'Spouse',
    'Friend',
  ];
  genderlist: string[] = ['Male', 'Female'];
  selectionlist: string[] = ['Yes', 'No'];

  constructor(private patient: patientdetails) {}

  ngOnInit(): void {
    var Get = CacheInfo.get("currentUser");
    this.postobj = new PatientdetailsDemo();
    this.relativeobj = new Patientrelativedetails();
    if (typeof Get === 'string') {
      var id = JSON.parse(Get).id;
    }
    this.patient.GetPatientId(id).then(async (response) => {
      response.text().then((responseData) => {
        this.patientid = responseData;
        // alert(this.patientid);
        this.fetchdata(this.patientid);
      });
    });
    this.bindToUI();

    this.getAllergyDetails();
  }

  getAllergyDetails() {
    let _that = this;
    this.patient.getallergydata().then(async (response) => {
      response.text().then((responseData) => {
        _that.PostAllergyobj = JSON.parse(responseData);
        console.log(_that.PostAllergyobj);
        _that.bindToUI();
      });
    });
  }

  getAllergyNameDetails(Allergytype: string) {
    let _that = this;
    var allergynameselection = this.Allergytype;

    var checkmultiple = allergynameselection.includes(',');

    if (checkmultiple == true) {
      this.patient.getallergydata().then(async (response) => {
        response.text().then((responseData) => {
          _that.listOfAllergyName = JSON.parse(responseData);
        });
      });
    } else {
      window.setInterval(() => {
        this.patient
          .getAllerynamefromallergytype(Allergytype)
          .then(async (response) => {
            response.text().then((responseData) => {
              _that.listOfAllergyName = JSON.parse(responseData);
            });
          });
      }, 5000);
    }
  }

  Addupdatepatientdetails() {
    // if (this.form.invalid) {
    //   alert('check all fields are filled');

    // }
    if (1 == 1) {
      var dat: PatientdetailsDemo = {
        firstName: this.form.value.firstname,

        lastName: this.form.value.lastname,
        age: this.form.value.age,
        gender: this.form.value.gender,
        race: this.form.value.race,
        ethinicity: this.form.value.ethnicity,
        //this.postobj.languagesknown = this.form.value.languagesknown;
        email: this.form.value.email,
        address: this.form.value.homeaddress,
        pincode: this.form.value.pincode,
        country: this.form.value.country1,
        state: this.form.value.state,
        contact: this.form.value.contactnumber,
        patientRelativeDetails: {
          title: 'Mrs',
          firstName: this.form.value.emergancyfirstname,
          lastName: this.form.value.emergancylastname,
          relation: this.form.value.emergancyrelationship,
          email: this.form.value.emergancyemail,
          contact: this.form.value.emergancycontactnumber,
          address: this.form.value.emergancyaddress,
          pincode: this.form.value.emergancypincode,
          country: this.form.value.emergancycountry,
          isAccess: true,
          state: '',
          patientDemographicsId: this.Demographicid,
        },

        allergyList: this.form.value.allergytype,
        allergynameList: '',
        allergyDetails: this.form.value.allergydetails,

        clinicalInformation: this.form.value.clinicalinformation,
        dateofBirth: this.form.value.dateofbirth,
        isFatal: false,
        patientId: this.patientid,
        createddate: new Date(),
        allergytypeList: '',
        allergyListname: this.form.value.allergyname,
      };

      this.patient
        .UpdatePatientdetails(this.Demographicid, dat)
        .then((response) => response.text())
        .then((result) => {
          if (result == 'Success') {
            alert('Update Successfully');
          } else {
            alert('Not Added');
          }
        })

        .catch((error) => console.log('error', error));
      //alert("hii")
    }
  }

  fetchdata(id: any) {
    let _that = this;
    this.patient
      .fetchfrombackendfromid1(id)
      .then(async (response) => {
        response.text().then((responseData) => {
          var result = JSON.parse(responseData);
          _that.postobj = result;

          this.Demographicid = _that.postobj.id;
          _that.bindToUI();
          console.log(this.Demographicid);
          console.log(this.postobj.allergytypeList);
        });
      })

      .catch((error) => console.log('error', error));
  }
  bindToUI() {
    this.form = new FormGroup({
      patientid: new FormControl(null),
      firstname: new FormControl(this.postobj?.firstName, [
        titleValidator(),
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      lastname: new FormControl(this.postobj?.lastName, [
        titleValidator(),
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      dateofbirth: new FormControl(this.postobj?.dateofBirth, [
        Validators.required,
      ]),
      age: new FormControl(this.postobj?.age),
      gender: new FormControl(this.postobj?.gender, [Validators.required]),
      race: new FormControl(this.postobj?.race, [
        titleValidator(),
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      ethnicity: new FormControl(this.postobj?.ethinicity, [
        titleValidator(),
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      languagesknown: new FormControl(null, [
        titleValidator(),
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      email: new FormControl(this.postobj?.email, [
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      homeaddress: new FormControl(this.postobj?.address, [
        Validators.required,
        Validators.minLength(10),
      ]),
      pincode: new FormControl(this.postobj?.pincode, [
        Validators.maxLength(6),
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
      country1: new FormControl(this.postobj?.country),
      state: new FormControl(this.postobj?.state),
      contactnumber: new FormControl(this.postobj?.contact, [
        Validators.maxLength(10),
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^[0-9]+$'),
      ]),
      emergancyfirstname: new FormControl(
        this.postobj.patientRelativeDetails?.firstName,
        [titleValidator(), Validators.pattern('^[a-zA-Z]+$')]
      ),
      emergancylastname: new FormControl(
        this.postobj.patientRelativeDetails?.lastName,
        [titleValidator(), Validators.pattern('^[a-zA-Z]+$')]
      ),
      emergancyrelationship: new FormControl(
        this.postobj.patientRelativeDetails?.relation,
        [Validators.required]
      ),
      emergancyemail: new FormControl(
        this.postobj.patientRelativeDetails?.email,
        [Validators.required, Validators.email]
      ),
      emergancycontactnumber: new FormControl(
        this.postobj.patientRelativeDetails?.contact,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$'),
        ]
      ),
      emergancyaddress: new FormControl(
        this.postobj.patientRelativeDetails?.address,
        [Validators.required, Validators.minLength(10)]
      ),
      emergancypincode: new FormControl(
        this.postobj.patientRelativeDetails?.pincode,
        [
          Validators.required,
          Validators.maxLength(6),
          Validators.pattern('^[0-9]+$'),
        ]
      ),
      emergancycountry: new FormControl(
        this.postobj.patientRelativeDetails?.country
      ),
      accessforpatientportal: new FormControl(
        this.postobj.patientRelativeDetails?.isAccess,
        [Validators.required]
      ),
      allergyid: new FormControl(null),
      allergytype: new FormControl(this.postobj?.allergyList), //this.AllergyType=this.postobj.allergyList.join(', ')
      allergyname: new FormControl(this.postobj?.allergyListname),
      allergydetails: new FormControl(this.postobj?.allergyDetails),
      allergydescription: new FormControl(null),
      clinicalinformation: new FormControl(this.postobj?.clinicalInformation),
      checkbox: new FormControl(null),
      readallegytype: new FormControl(this.postobj?.allergytypeList),
      readallergyname: new FormControl(this.postobj?.allergynameList),
    });
  }

  Clearpatientdetails() {
    this.form.reset();
  }

  //events
  onCountryChange(event: any) {
    console.log(event);

    this.Countrycode = event.iso2;

    this.form.controls['country1'].setValue(event.name);
  }
  onCountryChange2(event: any) {
    console.log(event);

    this.Countrycode = event.iso2;

    this.form.controls['emergancycountry'].setValue(event.name);
  }
  isDisabled: boolean = false;

  onChange() {
    this.isDisabled = true;
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step;
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    var dateValue = event.value!;
    var selectedYear = new Date(dateValue).getFullYear();
    var currentYear = new Date().getFullYear();
    this.age = currentYear - selectedYear;
    this.form.controls['age'].setValue(this.age);
    if (event.value) {
    }
  }

  onChangeEvent(event: any) {
    this.Pincode = event.target.value;
    this.patient
      .getCountrynamefrompincodconsole(this.Countrycode, this.Pincode)
      .subscribe((result) => {
        console.log(result.result[0].state);
        this.form.controls['state'].setValue(result.result[0].state);
      });
  }
  onAllergytypeselect(event: any) {
    this.Allergytype = event.value;
    this.getAllergyNameDetails(this.Allergytype);
  }
  radioChange(event: any) {
    if (event.value == 'No') {
      this.form.controls['allergydetails'].disable();
      this.form.controls['allergytype'].disable();
      this.form.controls['allergyname'].disable();
      this.form.controls['allergydescription'].disable();
      this.form.controls['clinicalinformation'].disable();
    } else {
      this.form.controls['allergydetails'].enable();
      this.form.controls['allergytype'].enable();
      this.form.controls['allergyname'].enable();
      this.form.controls['allergydescription'].enable();
      this.form.controls['clinicalinformation'].enable();
    }
  }
  setAll(completed: boolean) {
    if (completed.valueOf() == true) {
      this.form.controls['emergancyaddress'].setValue(
        this.form.controls['homeaddress'].value
      );
      this.form.controls['emergancypincode'].setValue(
        this.form.controls['pincode'].value
      );
      this.form.controls['emergancycountry'].setValue(
        this.form.controls['country1'].value
      );

      // this.form.controls['emergancyaddress'].disable();
      // this.form.controls['emergancypincode'].disable();
      // this.form.controls['emergancycountry'].disable();
    } else {
      this.form.controls['emergancyaddress'].enable();
      this.form.controls['emergancypincode'].enable();
      this.form.controls['emergancycountry'].enable();
      this.form.controls['emergancyaddress'].setValue('');
      this.form.controls['emergancypincode'].setValue('');
      this.form.controls['emergancycountry'].setValue('');
    }
  }
}

export function titleValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const title: string = control.value;

    if (title == null || title == '') {
      return { errorMessage: 'This field cannot be empty' };
    } else if (title.length < 2) {
      return { errorMessage: 'Please dont use abbreviations' };
    } else {
      return null;
    }
  };
}
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
