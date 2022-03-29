import { Component, OnInit, ViewChild } from '@angular/core';
//Book Appointment
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { GenerateTimeSlot } from 'src/app/models/Globalfunctions';
import { PatientService } from 'src/app/Services/patient.service';
//Model Imports
import {
  Booking,
  Diagnosics,
  Physician,
  Mode,
} from '../../../models/patient.model';
//Router
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/Services/Url';
import { BookAppointmentService } from 'src/app/Services/BookAppointment/book-appointment.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

//Mat Alert
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css'],
})
export class BookAppointmentComponent implements OnInit {
  UserType: string = '';
  AppointmentID: string = '';
  form!: FormGroup;
  selected: Date | undefined;
  firstslot!: Array<string>;
  secondslot!: Array<string>;
  incomingslot: Array<string> = [];
  outgoingslot!: Array<string>;
  diagnosics: Diagnosics[] = [];
  physician: Physician[] = [];
  TextInput?: string;
  ModeTypes: Mode[] = [];
  //Form
  isSubmitted = false;
  diagnosicsName: string = '';
  Mode: string = '';
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
  diagnosicscheck = false;

  //Result
  Result: string = '';

  //Editing Drop Down
  editing: boolean = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  //Date
  minDate: any;
  maxDate: any;

  //Edit Appointment
  AppointmentType?: string;
  AppointmentDate: any;
  IncomingSlotBooked?: string;
  IncomingDiagnosics?: string;
  IncomingPhysicianName?: string;

  //Physician ID
  PhysicianId!: string;

  constructor(
    private patientservice: PatientService,
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: BookAppointmentService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    var CurrentDate = new Date();
    this.minDate = CurrentDate;
    var FutureDate = new Date();
    this.maxDate = new Date(FutureDate.setMonth(CurrentDate.getMonth() + 1));
    // console.log(this.maxDate);
  }

  //Bind Data
  bookinglist: Booking[] = [];

  registrationForm = this.fb.group({
    ModeType: ['', [Validators.required]],
    diagnosicsName: ['', [Validators.required]],
    phsicianName: ['', [Validators.required]],
    descriptionName: ['', [Validators.required]],
    calendardata: ['', Validators.required],
    slotName: ['', [Validators.required]],
  });

  @ViewChild('matExpansionPanel', { static: true })
  matExpansionPanelElement!: MatExpansionPanel;

  ngOnInit() {
    this.ModeTypes = [
      { id: '1', modeType: 'Online' },
      { id: '1', modeType: 'Offline' },
    ];

    //Text input Bind
    this.route.paramMap.subscribe((res) => {
      this.UserType += res.get('Type');
      // this.AppointmentID += res.get('AppointmentID');
    });

    this.route.queryParams.subscribe((params) => {
      // Defaults to 0 if no query param provided.
      this.AppointmentID += params['appointmentId'] || 'undefined';
    });

    //alert(this.AppointmentID);

    this.TextInput = 'Book Appointment';

    //Mat expansion close
    this.matExpansionPanelElement.close();

    var data = 1;
    switch (this.UserType) {
      case 'Patient':
        this.GlobalBookAppointment(this.UserType);
        break;
      case 'Nurse':
        this.GlobalBookAppointment(this.UserType);
        break;
      case 'Physician':
        this.GlobalBookAppointment(this.UserType);
        break;
      case 'Admin':
        this.GlobalBookAppointment(this.UserType);
        break;
      case 'Covid':
        this.GlobalBookAppointment(this.UserType);
        break;
      default:
        alert('No such day exists!');
        break;
    }
  }

  GlobalBookAppointment(UserType: string) {
    if (UserType == 'Patient') {
      this.TextInput = 'Book Appointment';
      // this.service.GetDiagnosics().subscribe((res) => {
      //   this.diagnosics.push(...res);
      // });

      this.service.GetSpecialization().subscribe((res) => {
        this.diagnosics.push(...res);
      });

      // this.service.GetPhysician().subscribe((res) => {
      //   this.physician.push(...res);
      // });

      if (this.AppointmentID != 'undefined') {
        this.patientservice
          .GetPatientAppointmentDetailsById(this.AppointmentID)
          .subscribe((x) => {
            if (x.length > 0) {
              this.AppointmentType = x[0].appointmentType;
              this.AppointmentDate = x[0].appointmentDateTime;
              this.IncomingSlotBooked = x[0].slotBooked;
              this.IncomingPhysicianName = x[0].physicianName;
              var Diagnosics = x[0].diagnosis;
              var Mode = x[0].mode;

              this.registrationForm.controls['calendardata'].patchValue(
                this.AppointmentDate
              );

              this.registrationForm.controls['ModeType'].patchValue(Mode);

              this.registrationForm.controls['diagnosicsName'].patchValue(
                Diagnosics
              );

              this.service.GetPhysicianById(Diagnosics).subscribe((res) => {
                this.physician.push(...res);
              });

              this.registrationForm.controls['phsicianName'].patchValue(
                this.IncomingPhysicianName
              );

              if (this.AppointmentDate != undefined) {
                var date = new Date(this.AppointmentDate);
                var full =
                  date.getDate() +
                  '-' +
                  (date.getMonth() + 1) +
                  '-' +
                  date.getFullYear();
                this.selectedDate = full;
                var SendDatetoSlot =
                  date.getFullYear() +
                  '-' +
                  date.getMonth() +
                  1 +
                  '-' +
                  date.getDate();
                this.SlotGenerator(this.UserType, SendDatetoSlot);
                this.expClick();
                //this.dateClass();
              }
            }
          });

        this.TextInput = 'Update Appointment';
        this.editing = true;
        // this.registrationForm = this.fb.group({
        //   diagnosicsName: ['', [Validators.required]],
        //   phsicianName: ['', [Validators.required]],
        //   descriptionName: ['', [Validators.required]],
        //   calendardata: ['', Validators.required],
        //   slotName: ['', [Validators.required]],
        // });
      }
    } else if (UserType == 'Covid') {
      this.TextInput = 'Book Appointment For Covid';
      this.registrationForm.controls['ModeType'].patchValue('Online');
      this.registrationForm.controls['diagnosicsName'].patchValue('Covid');
    } else if (UserType == 'Nusre') {
    } else if (UserType == 'Physician') {
    } else if (UserType == 'Admin') {
    }
  }

  // dateClass() {
  //   return (date: Date): MatCalendarCellCssClasses => {
  //     const highlightDate = this.AppointmentDate.map(
  //       (strDate: string | number | Date) => new Date(strDate)
  //     ).some(
  //       (d: {
  //         getDate: () => number;
  //         getMonth: () => number;
  //         getFullYear: () => number;
  //       }) =>
  //         d.getDate() === date.getDate() &&
  //         d.getMonth() === date.getMonth() &&
  //         d.getFullYear() === date.getFullYear()
  //     );

  //     return highlightDate ? 'special-date' : '';
  //   };
  // }

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
        date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
      this.selectedDate = full;
      this.datecheck = false;
    } else {
      this.datecheck = true;
    }
  }

  changeDiagnosics(e: any) {
    if (e.value != null) {
      this.diagnosicsName =
        this.registrationForm.get('diagnosicsName')?.setValue(e.value) || '';

      this.diagnosicscheck = false;

      this.service.GetPhysicianById(e.value).subscribe((res) => {
        this.physician.push(...res);
      });
    }
  }

  changeMode(e: any) {
    if (e.value != null) {
      this.Mode =
        this.registrationForm.get('ModeType')?.setValue(e.value) || '';
      // alert(e.value);
      // this.diagnosicscheck = false;
    }
  }

  changePhysician(e: any): boolean {
    var diagnosics = this.registrationForm.get('diagnosicsName')?.value;
    var date = this.registrationForm.get('calendardata')?.value;

    if (e.value == undefined || diagnosics === '' || date === '') {
      this.matExpansionPanelElement.close();
      this.diagnosicscheck = true;
      this.datecheck = true;
      return false;
    } else if (e.value != null && diagnosics != '' && date != '') {
      this.PhysicianId = e.value;
      this.diagnosicscheck = false;
      this.datecheck = false;
      this.matExpansionPanelElement.open();
      const start = new Date('2019-08-08 09:00');
      const end = new Date('2019-08-08 20:00');
      const timespan = 30 * 60; // 30 minutes
      const siestas = [
        {
          start: '2019-08-08 8:00',
          end: '2019-08-08  8:30',
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
      this.service
        .GetBookSlot(
          this.PhysicianId,
          date._i.year + '-' + date._i.month + 1 + '-' + date._i.date
        )
        .subscribe((res) => {
          for (var i = 0; i < res.length; i++) {
            this.incomingslot.push(res[i].bookslot);
          }
          const duplicate = this.incomingslot;
          let unique = [...new Set(duplicate)];
          this.firstslot = firstslot.filter((val) => !unique.includes(val));
          this.secondslot = secondslot.filter((val) => !unique.includes(val));
        });
    }

    return true;
  }

  Slot(e: any) {
    const slotvalue = String(e._elementRef.nativeElement.id);
    if (slotvalue != null) {
      this.diagnosicscheck = false;
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
      this.diagnosicscheck = false;
    }
  }

  SlotGenerator(UserType: string, date: string) {
    if (UserType == 'Patient') {
      this.diagnosicscheck = false;
      this.datecheck = false;
      this.matExpansionPanelElement.open();
      const start = new Date('2019-08-08 09:00');
      const end = new Date('2019-08-08 20:00');
      const timespan = 30 * 60; // 30 minutes
      const siestas = [
        {
          start: '2019-08-08 8:00',
          end: '2019-08-08  8:30',
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
      this.service
        .GetBookSlot('3FA85F64-5717-4562-B3FC-2C963F66AFA6', date)
        .subscribe((res) => {
          for (var i = 0; i < res.length; i++) {
            this.incomingslot.push(res[i].bookslot);
          }
          const duplicate = this.incomingslot;
          let unique = [...new Set(duplicate)];
          this.firstslot = firstslot.filter((val) => !unique.includes(val));
          this.secondslot = secondslot.filter((val) => !unique.includes(val));
        });
    }
  }

  onSubmit(): boolean {
    this.isSubmitted = true;

    if (this.AppointmentID != 'undefined') {
      if (this.registrationForm.valid) {
        //PatientID
        var Get = localStorage.getItem('currentUser');
        if (typeof Get === 'string') {
          var id = JSON.parse(Get).id;
        }

        //Diagnosics
        this.diagnosicscheck = false;
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
          appointmentType: this.TextInput,
          diagnosis: data.diagnosicsName,
          bookslot: data.slotName,
          appointmentDateTime: myDate.toISOString(),
          patientId: id,
          physicianId: data.phsicianName,
          Mode: data.ModeType,
          // nurseId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        };
        this.service
          .UpdateAppointment(this.AppointmentID, bookingdata)
          .then((response) => response.text())
          .then((result) => {
            this.Result += result;
            if (this.Result == 'Success') {
              this.registrationForm.reset();
              this.registrationForm.controls['diagnosicsName'].setErrors(null);
              this.registrationForm.controls['phsicianName'].setErrors(null);
              this.registrationForm.controls['descriptionName'].setErrors(null);
              this.registrationForm.controls['calendardata'].setErrors(null);
              this.registrationForm.controls['slotName'].setErrors(null);
              this.matExpansionPanelElement.close();

              const snackBarRef = this._snackBar.open(
                'Appointment  Updated',
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
                  this.router.navigate(['/PatientCalender/Patient']);
                }
              });

              //this.router.navigate(['/Calender']);
            }
          })
          .catch((error) => console.log('error', error));
        //this.router.navigate(['/AdminCalender']);
        return true;
      } else {
        var date = this.registrationForm.value['calendardata'];
        var slot = this.registrationForm.value['slotName'];
        this.diagnosicscheck = true;
        if (date === '' || date === null) {
          this.datecheck = true;
        }
        if (slot === '' || date === null) {
          this.slotcheck = true;
        }
        return false;
      }
    } else {
      if (this.registrationForm.valid) {
        //PatientID
        var Get = localStorage.getItem('currentUser');
        if (typeof Get === 'string') {
          var id = JSON.parse(Get).id;
        }
        //Diagnosics
        this.diagnosicscheck = false;
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
          appointmentType: this.TextInput,
          diagnosis: data.diagnosicsName,
          appointmentStatus: 'pending',
          isCompleted: false,
          bookslot: data.slotName,
          appointmentDateTime: myDate,
          patientId: id,
          physicianId: data.phsicianName,
          //nurseId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          Mode: data.ModeType,
        };
        this.service
          .BookAppointmentPost(bookingdata)
          .then((response) => response.text())
          .then((result) => {
            this.Result += result;
            if (this.Result == 'Success') {
              this.registrationForm.reset();
              this.registrationForm.controls['diagnosicsName'].setErrors(null);
              this.registrationForm.controls['phsicianName'].setErrors(null);
              this.registrationForm.controls['descriptionName'].setErrors(null);
              this.registrationForm.controls['calendardata'].setErrors(null);
              this.registrationForm.controls['slotName'].setErrors(null);
              this.matExpansionPanelElement.close();

              const snackBarRef = this._snackBar.open(
                'Appointment Created',
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
                  this.router.navigate(['/PatientCalender/Patient']);
                }
              });

              //this.router.navigate(['/Calender']);
            }
          })
          .catch((error) => console.log('error', error));
        //this.router.navigate(['/AdminCalender']);
        return true;
      } else {
        var date = this.registrationForm.value['calendardata'];
        var slot = this.registrationForm.value['slotName'];
        this.diagnosicscheck = true;
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

  Clear() {
    this.registrationForm.reset();
    this.registrationForm.controls['diagnosicsName'].setErrors(null);
    this.registrationForm.controls['phsicianName'].setErrors(null);
    this.registrationForm.controls['descriptionName'].setErrors(null);
    this.registrationForm.controls['calendardata'].setErrors(null);
    this.registrationForm.controls['slotName'].setErrors(null);
    this.matExpansionPanelElement.close();
  }
}
