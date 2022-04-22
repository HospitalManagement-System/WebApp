import { Component, OnInit } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  EventInput,
} from '@fullcalendar/angular';
import { AdminService } from 'src/app/Services/admin.service';
import { INITIAL_EVENTS, createEventId } from '../model/event.utils';
import { EventMap } from '../model/admin.model';

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.css'],
})
export class AdminCalendarComponent implements OnInit {
  name!: string;
  date?: string;
  showModal!: boolean;
  ApproveModal!: boolean;
  calendarVisible = false;
  listOfEvent: EventMap[] = [];
  value: EventMap[] = [];
  Patient?: string;
  Physician?: string;
  Diagnosics?: string;
  Description?: string;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService
      .GetListofData()
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
    //select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    height: 500,
    aspectRatio: 1.5,
    scrollTime: '00:00',
    events: this.value,
    // events: [
    //   {
    //     title: 'event 2',
    //     date: '2021-12-31 13:15:30',
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
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title: 'New Even Created',
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.name = clickInfo.event.title;
    var dateparms = clickInfo.event._instance?.range.start;
    var ID = clickInfo.event._def?.publicId;
    var date = dateparms?.toDateString();
    var time = dateparms?.toTimeString();
    var color = clickInfo.event._def?.ui.backgroundColor;
    this.date = date;
    // const Patient = 'Ram';
    // const Diagnosics = 'Cold';
    // const Physician = ' Dr.Raj';
    // const Description = 'Cold Diagnosics';
    this.Patient = 'Ram';
    this.Diagnosics = 'Cold';
    this.Physician = 'Dr.Raj';
    this.Description = 'Cold Diagnosics';

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
  Approvehide() {
    this.ApproveModal = false;
  }
}
