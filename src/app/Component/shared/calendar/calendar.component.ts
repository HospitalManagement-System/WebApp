import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  EventInput,
} from '@fullcalendar/angular';
import { Role } from 'src/app/models/Role';
import { AdminService } from 'src/app/Services/admin.service';
import { CalendarService } from 'src/app/Services/Calendar/calendar.service';
import { PatientService } from 'src/app/Services/patient.service';
import { INITIAL_EVENTS, createEventId } from '../../../models/event.utils';
import { CacheInfo } from '../CacheInfo';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/Services/loader.service';

export class EventMap {
  // public id: string,
  constructor(
    public publicId: string,
    public title: string,
    public date: string,
    public color: string
  ) {}
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  UserType: string = '';
  CheckPatient: boolean = false;
  name!: string;
  date?: string;
  showModal!: boolean;
  ApproveModal!: boolean;
  AddAppointment!: boolean;
  checkDate: boolean = false;
  calendarVisible = false;
  listOfEvent: EventMap[] = [];
  value: EventMap[] = [];
  //Date
  selectdate?: string;
  minDate: any;

  //user
  AppointmentId?: string;

  //Calendar Data
  appointmentdate?: string;
  firstName?: string;
  appointmentDate?: string;
  bookSlot?: string;
  physicianName?: string;
  diagnosis?: string;

  constructor(
    private adminService: AdminService,
    private admim: CalendarService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    var CurrentDate = new Date();
    this.minDate = CurrentDate;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((res) => {
      this.UserType += res.get('Type');
    });

    if (this.UserType == 'Patient') {
      //alert('patient');
      this.CheckPatient = true;
    }

    var Get = CacheInfo.get("currentUser");
    if (typeof Get === 'string') {
      var id = JSON.parse(Get).id;
      var Role = JSON.parse(Get).role;
    }

    this.adminService
      .GetListofDataById(id, Role)
      .subscribe((x) => {
        this.listOfEvent.push(...x);
        for (var i = 0; i < this.listOfEvent.length; i++) {
          var title = this.listOfEvent[i].title;
          var start = DateType(this.listOfEvent[i].date);
          this.value.push({
            publicId: this.listOfEvent[i].publicId,
            title: this.listOfEvent[i].title,
            date: this.listOfEvent[i].date,
            color: this.listOfEvent[i].color,
          });
        }
      })
      .add(() => {
        if (this.value.length > 0) {
          this.calendarVisible = true;
        }
      });

    // this.adminService
    //   .GetListofData()
    //   .subscribe((x) => {
    //     this.listOfEvent.push(...x);
    //     for (var i = 0; i < this.listOfEvent.length; i++) {
    //       var title = this.listOfEvent[i].title;
    //       var start = DateType(this.listOfEvent[i].date);
    //       this.value.push({
    //         publicId: this.listOfEvent[i].publicId,
    //         title: this.listOfEvent[i].title,
    //         date: this.listOfEvent[i].date,
    //         color: this.listOfEvent[i].color,
    //       });
    //     }
    //   })
    //   .add(() => {
    //     if (this.value.length > 0) {
    //       this.calendarVisible = true;
    //     }
    //   });

    function DateType(date: any): Date {
      var convertDate = new Date(date);

      return convertDate;
    }
  }

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    height: 500,
    aspectRatio: 1.5,
    scrollTime: '00:00',
    events: this.value,
    // events: [
    //   {
    //     title: 'event 2',
    //     date: '2021-12-04 13:15:30',
    //     color: 'blue',
    //     id: '1234',
    //   },
    // ],
  };

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr);
  }

  currentEvents: EventApi[] = [];

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.selectdate = selectInfo.startStr;
    if (new Date(this.selectdate) < this.minDate) {
      this.checkDate = true;
    } else {
      this.AddAppointment = true;
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.name = clickInfo.event.title;
    var dateparms = clickInfo.event._instance?.range.start;
    var ID = clickInfo.event._def?.publicId;
    this.AppointmentId = clickInfo.event._def?.extendedProps['publicId'];
    var date = dateparms?.toDateString();
    var time = dateparms?.toTimeString();
    var color = clickInfo.event._def?.ui.backgroundColor;
    this.date = date;

    //

    this.admim
      .GetCalendarData(this.AppointmentId)
      .then((response) => response.text())
      .then((result) => {
        if (result != null) {
          var data = JSON.parse(result);
          this.firstName = data[0].firstName;
          this.appointmentDate = data[0].appointmentDate;
          this.bookSlot = data[0].bookSlot;
          this.physicianName = data[0].physicianName;
          this.diagnosis = data[0].diagnosis;
        }
      })
      .catch((error) => console.log('error', error));

    //
    if (color == 'red') {
      this.ApproveModal = true;
    } else {
      this.showModal = true;
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
  hide() {
    this.showModal = false;
  }

  ApproveReject(Type: string) {
    // alert(Type);
    // alert(this.AppointmentId);

    var AppointmentID = this.AppointmentId?.toString();

    this.admim
      .ApproveReject(AppointmentID, Type)
      .then((response) => response.text())
      .then((result) => {
        if (result == 'Success') {
          window.location.reload();
        }
      })
      .catch((error) => console.log('error', error));

    //this.ApproveModal = false;
  }

  ApproveRejectClose() {
    this.ApproveModal = false;
  }
  AddAppointmentClose() {
    this.AddAppointment = false;
  }
  checkDateClose() {
    this.checkDate = false;
  }
  CreateAppointment() {
    this.router.navigate(['/BookAppointment/Patient']);
  }

  JoinMeeting() {
    var Get = CacheInfo.get("currentUser");
    if (typeof Get === 'string') {
      var id = JSON.parse(Get).id;
      var role = JSON.parse(Get).role;
    }

    var AppointmentID = this.AppointmentId?.toString();

    this.admim
      .GetZoomLink(AppointmentID, role)
      .then((response) => response.text())
      .then((result) => {
        if (result != null) {
          var data = JSON.parse(result);
          var patientMeetingLink = data[0].patientMeetingLink;
          var physicianMeetingLink = data[0].physicianMeetingLink;
          if (role == 'PATIENT') {
            window.open(patientMeetingLink, '_blank');
          } else if (
            role == 'PHYSICIAN' ||
            role == 'NURSE' ||
            role == 'ADMIN'
          ) {
            window.open(physicianMeetingLink, '_blank');
            this.hide();
          }
        }
      })
      .catch((error) => console.log('error', error));
  }
}
