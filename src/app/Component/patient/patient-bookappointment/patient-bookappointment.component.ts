import { JsonPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { guid } from '@fullcalendar/core';
import { id } from 'date-fns/locale';

import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { GenerateTimeSlot } from 'src/app/models/Globalfunctions';
import { PatientService } from 'src/app/Services/patient.service';
//Model Imports
import { Booking, Diagnosics, Physician } from '../../../models/patient.model';

//Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-bookappointment',
  templateUrl: './patient-bookappointment.component.html',
  styleUrls: ['./patient-bookappointment.component.css'],
})
export class PatientBookappointmentComponent implements OnInit {
  form!: FormGroup;
  selected: Date | undefined;
  firstslot!: Array<string>;
  secondslot!: Array<string>;
  diagnosics?: Diagnosics[];
  physician?: Physician[];
  TextInput?: string;
  //Form
  isSubmitted = false;
  diagnosicsName: any;
  phsicianName: any;
  slot?: string;
  slotName: any;
  calendardata: any;
  descriptionName: any;

  //SelectedDate
  selectedDate: any;
  datecheck = false;

  //Slot
  slotcheck = false;

  constructor(
    private patientservice: PatientService,
    public fb: FormBuilder,
    private router: Router
  ) {}

  //Bind Data
  bookinglist: Booking[] = [];

  registrationForm = this.fb.group({
    diagnosicsName: ['', [Validators.required]],
    phsicianName: ['', [Validators.required]],
    descriptionName: ['', [Validators.required]],
    calendardata: ['', Validators.required],
    slotName: ['', [Validators.required]],
  });

  @ViewChild('matExpansionPanel', { static: true })
  matExpansionPanelElement!: MatExpansionPanel;

  ngOnInit() {
    //Text input Bind
    this.TextInput = 'Ram';

    //Bind DropDownn
    // this.diagnosics = [
    //   { ID: 1, Value: 'Cold' },
    //   { ID: 2, Value: 'Feaver' },
    //   { ID: 3, Value: 'Thyroid' },
    // ];

    this.physician = [
      { id: '1', physicianName: 'Raj' },
      { id: '2', physicianName: 'Ram' },
      { id: '3', physicianName: 'Anand' },
    ];

    //Mat expansion close
    this.matExpansionPanelElement.close();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  updateFormDate(e: any) {
    if (e != null) {
      this.registrationForm.patchValue({
        calendardata: e,
      });

      var date = new Date(e);
      var day = date.getDate();
      var month = date.getMonth();
      var year = date.getFullYear();
      var full =
        date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
      this.selectedDate = full;
      this.datecheck = false;
    } else {
      this.datecheck = true;
    }
  }

  changeDiagnosics(e: any) {
    if (e.value != null) {
      this.diagnosicsName.setValue(e.value, {
        onlySelf: true,
      });
    }
  }

  changePhysician(e: any) {
    if (e.value == undefined) {
      this.matExpansionPanelElement.close();
    }
    if (e.value != null) {
      this.matExpansionPanelElement.open();
      const start = new Date('2019-08-08 09:00');
      const end = new Date('2019-08-08 20:00');
      const timespan = 30 * 60; // 30 minutes
      const siestas = [
        {
          start: '2019-08-08 8:00',
          end: '2019-08-08  8:30',
        },
        {
          start: '2019-08-08 09:00',
          end: '2019-08-08 09:30',
        },

        {
          start: '2019-08-08 10:30:00.000',
          end: '2019-08-08 11:00:00.000',
        },
        {
          start: '2019-08-08 13:00:00.000',
          end: '2019-08-08 14:00:00.000',
        },
      ];

      let [firstslot, secondslot] = GenerateTimeSlot(
        start,
        end,
        timespan,
        siestas
      );
      this.firstslot = firstslot;
      this.secondslot = secondslot;
    }
  }

  Slot(e: any) {
    const slotvalue = String(e._elementRef.nativeElement.id);
    if (slotvalue != null) {
      this.registrationForm.patchValue({
        slotName: slotvalue,
      });
    }
  }

  expClick() {
    const physician = this.registrationForm.value['phsicianName'];
    if (physician === '' || physician === undefined) {
      this.matExpansionPanelElement.close();
      this.slotcheck = true;
    } else {
      this.matExpansionPanelElement.open();
      this.slotcheck = false;
    }
  }

  onSubmit(): boolean {
    this.isSubmitted = true;
    if (this.registrationForm.valid) {
      //alert(JSON.stringify(this.registrationForm.value));
      //var data = JSON.stringify(this.registrationForm.value);
      var data = this.registrationForm.value;

      //Date Time Logic
      var myDate = new Date(data.calendardata);

      //Time Split
      var time = data.slotName.split('to');

      //Split time
      var hour = time[0].split(':');

      // Set hours
      myDate.setHours(hour[0]);
      // Then set minutes

      //myDate.setMinutes(hour[1]);
      // Then set seconds

      //myDate.setSeconds(0);

      var bookingdata: Booking = {
        id: guid(),
        title: 'Book Appointment',
        date: myDate,
        description: data.descriptionName,
        color: 'red',
      };
      this.patientservice.Edit(bookingdata);

      this.router.navigate(['/AdminCalender']);
      return true;
    } else {
      var date = this.registrationForm.value['calendardata'];
      var slot = this.registrationForm.value['slotName'];
      if (date === '' || date === null) {
        this.datecheck = true;
      }
      if (slot === '' || date === null) {
        this.slotcheck = true;
      }
      return false;
    }
  }
}
