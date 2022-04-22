import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from '../shared/dynamic-table/dynamic-table.component';
import { ChartComponent } from './chart/chart.component';
//Table
import { MatTableModule } from '@angular/material/table';
// import { MaterialModule } from 'src/app/material.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';

//Book appointment
import { MatExpansionModule } from '@angular/material/expansion';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CalendarComponent } from './calendar/calendar.component';

//full Calender
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plug
import { InboxComponent } from './inbox/inbox.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { PatientDynamicTableComponent } from './patientdynamic-table/patientdynamic-table.component';


import { SubscriptionComponent } from './subscription/subscription.component';
import { BedAllocateComponent } from '../bed/bed-allocate/bed-allocate.component';
import { BedDesignComponent } from './bed-design/bed-design.component'; // a plug

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [
    DynamicTableComponent,
    ChartComponent,
    PieChartComponent,
    BookAppointmentComponent,
    CalendarComponent,
    InboxComponent,
    SubscriptionComponent,
    PatientDynamicTableComponent,
    BedAllocateComponent,
    BedDesignComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    //Book Appointment
    MatDatepickerModule,
    MatExpansionModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatButtonModule,
    //Full Calender
    FullCalendarModule,

    //Inbox
    MatTabsModule,
    MatTableModule,
    MatBadgeModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class ReusableModule {}
