import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { AddPhysicianComponent } from './add-physician/add-physician.component';
import { ViewPhysicianComponent } from './view-physician/view-physician.component';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';
//full Calender
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plug

//DataTable
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';

//Datateble
import { MatTabsModule } from '@angular/material/tabs';
//Http Issue
import { HttpClientModule } from '@angular/common/http';

//Edit table
// import { MatSort, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';

//Model Export
import { EventMap } from '../admin/model/admin.model';

//Snack Bar
import { MatSnackBarModule } from '@angular/material/snack-bar';

//Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientUserComponent } from './patient-user/patient-user.component';
import { DynamicTableComponent } from '../shared/dynamic-table/dynamic-table.component';
import { PieChartComponent } from '../shared/pie-chart/pie-chart.component';
import { BookAppointmentComponent } from '../shared/book-appointment/book-appointment.component';
import { CalendarComponent } from '../shared/calendar/calendar.component';
import { MatInputModule } from '@angular/material/input';
import { LockedAccountComponent } from './locked-account/locked-account.component';
import { AdminPatientComponent } from './admin-patient/admin-patient.component';
import { AdminHospitalComponent } from './admin-hospital/admin-hospital.component';
import { MatPaginator } from '@angular/material/paginator';
import { BarchartComponent } from '../nurse/barchart/barchart.component';
import { DoctorlistComponent } from '../nurse/doctorlist/doctorlist.component';
import { MaterialModule } from '../../material.module';
import { MatSelectModule } from '@angular/material/select';
//
//MatSlideToggleModule;

//Import Dynamic table

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
]);

const routes: Routes = [
  {
    path: 'AdminDashBoard',
    component: AdminDashboardComponent,
  },
  {
    path: 'PatientUser',
    component: PatientUserComponent,
  },
  {
    path: 'AddPhysician',
    component: AddPhysicianComponent,
  },
  {
    path: 'ViewPhysician',
    component: ViewPhysicianComponent,
  },
  {
    path: 'AdminCalender',
    component: AdminCalendarComponent,
  },
];

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AddPhysicianComponent,
    ViewPhysicianComponent,
    AdminCalendarComponent,
    DynamicTableComponent,
    PieChartComponent,
    BookAppointmentComponent,
    CalendarComponent,
    LockedAccountComponent,
    AdminPatientComponent,
    AdminHospitalComponent,
    BarchartComponent,
    DoctorlistComponent,
    DoctorlistComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    //Full Calender
    FullCalendarModule,
    //Datatable
    MatTableModule,
    MatTableDataSource,
    //Http
    HttpClientModule,
    //Paginator
    MatPaginator,
    // MatSort,
    // MatSortModule,
    // MatTableDataSource,
    // MatFormFieldModule,

    //Forms
    FormsModule,
    ReactiveFormsModule,
    //Material
    MatFormFieldModule,
    MatInputModule,
    //router
    RouterModule,
    //Paginator
    MatPaginatorModule,
    //SnakBar
    MatSnackBarModule,
    MatSelectModule,
    MaterialModule
  ],
})
export class AdminModule {}
