import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
//Material
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { AppointmentViewComponent } from './Component/nurse/appointment-view/appointment-view.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';


//khushabu
//import { MatMomentDateModule } from '@angular/material-moment-adapter';
//import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { SchedulerModule } from 'angular-calendar-scheduler';

//full Calender
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins

import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plug
//Http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ViewPhysicianComponent } from './Component/admin/view-physician/view-physician.component';
//Component
import { AppComponent } from './app.component';
import { AdminCalendarComponent } from './Component/admin/admin-calendar/admin-calendar.component';
import { AddPhysicianComponent } from './Component/admin/add-physician/add-physician.component';
import { PatientBookappointmentComponent } from './Component/patient/patient-bookappointment/patient-bookappointment.component';
import { PhysicianComponent } from './Component/physician/physician.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { NavMenuComponent } from './Component/home/nav-menu/nav-menu.component';
import { LoginComponent } from './Component/home/login/login.component';
import { HomeComponent } from './Component/home/home/home.component';
import { DynamicTableComponent } from './Component/shared/dynamic-table/dynamic-table.component';
import { ChartComponent } from './Component/shared/chart/chart.component';
import { PieChartComponent } from './Component/shared/pie-chart/pie-chart.component';
import { BookAppointmentComponent } from './Component/shared/book-appointment/book-appointment.component';
import { CalendarComponent } from './Component/shared/calendar/calendar.component';
//Internet Check
import { NetworkStatusAngularModule } from 'network-status-angular';
import {
  MY_FORMATS,
  PatientDetailsComponent,
} from './Component/patient/patient-details/patient-details.component';
import { RegisterComponent } from './Component/home/Register/register.component';
import { ForgotpasswordComponent } from './Component/home/forgotpassword/forgotpassword.component';
import { UserService } from './Services/Userservice/userservice/user.service';
import { DynamicViewComponent } from './Component/nurse/dynamic-view/dynamic-view.component';
import { EditDailogeComponent } from './Component/nurse/dailoge/edit-dailoge/edit-dailoge.component';
import { PatientDashboardComponent } from './Component/patient/patient-dashboard/patient-dashboard.component';
import { BedAllotmentComponent } from './Component/shared/bed-allotment/bed-allotment.component';
//fakebackend

// used to create fake backend
import { AuthGuard, fakeBackendProvider } from './_helpers';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';

// import { AuthService } from './Services/Authservice/auth.service';

import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthenticationService } from './Services';
//import { AuthenticationService } from './Services';

//Apex Chart

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { Ng2TelInputModule } from 'ng2-tel-input';

import { MatStepperModule } from '@angular/material/stepper';
import { PreviouspatientvisitdetailsComponent } from './Component/patient/previouspatientvisitdetails/previouspatientvisitdetails.component';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatSelectFilterModule } from 'mat-select-filter';
import { PatientViewdetailsComponent } from './Component/patient/patient-viewdetails/patient-viewdetails.component';

//ngb-bootstrap
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTablegridComponent } from './Component/nurse/mat-tablegrid/mat-tablegrid.component';
import { NurseDashboardComponent } from './Component/nurse/nurse-dashboard/nurse-dashboard.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NursedashboardgridComponent } from './Component/nurse/nursedashboardgrid/nursedashboardgrid.component';
import { BarchartComponent } from './Component/nurse/barchart/barchart.component';
import { DoctorlistComponent } from './Component/nurse/doctorlist/doctorlist.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPatientComponent } from './Component/admin/admin-patient/admin-patient.component';
import { AdminHospitalComponent } from './Component/admin/admin-hospital/admin-hospital.component';
import { AlertService } from './Services/Alert/alert.service';
import { UpcomingAppointmentComponent } from './Component/nurse/upcoming-appointment/upcoming-appointment.component';
import { InboxComponent } from './Component/shared/inbox/inbox.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PhysicianService } from './Services/Physician/physician.service';
import {  MatFormFieldModule } from '@angular/material/form-field';

import {MatMenuModule} from '@angular/material/menu';
//Edit Table
FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
]);

//Location Strategy

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChangepasswordComponent } from './Component/home/changepassword/changepassword.component';
import { PatientDynamicTableComponent } from './Component/shared/patientdynamic-table/patientdynamic-table.component';
import { AdminDashboardComponent } from './Component/admin/admin-dashboard/admin-dashboard.component';

import { CurrentPatientComponent } from './Component/physician/CurrentPatient/current-patient.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    HomeComponent,
    CurrentPatientComponent,
    PhysicianComponent,
    AppointmentViewComponent,
    PatientDetailsComponent,
    PatientBookappointmentComponent,
    ViewPhysicianComponent,
    AdminCalendarComponent,
    AddPhysicianComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    DynamicViewComponent,
    DynamicTableComponent,
    EditDailogeComponent,
    ChartComponent,
    PatientDashboardComponent,
    MatTablegridComponent,
    NurseDashboardComponent,
    PieChartComponent,
    BookAppointmentComponent,
    CalendarComponent,
    PreviouspatientvisitdetailsComponent,
    PatientViewdetailsComponent,
    BarchartComponent,
    NursedashboardgridComponent,
    DoctorlistComponent,
    AdminPatientComponent,
    AdminHospitalComponent,
    InboxComponent,
    PatientDynamicTableComponent,
    AdminDashboardComponent,
    ChangepasswordComponent,
    UpcomingAppointmentComponent,
    PatientDynamicTableComponent,
    BedAllotmentComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatGridListModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    //NgbModule,
    //Material Component
    MaterialModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatBadgeModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    FlexLayoutModule,
    MatCardModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    CdkTableModule,
    CdkStepperModule,
    MatRadioModule,
//menu
MatMenuModule,
    //Full Calender
    FullCalendarModule,
    //Http
    HttpClientModule,
    //Internet Check
    NetworkStatusAngularModule.forRoot(),
    MatProgressSpinnerModule,
    //Apex chart
    MatSnackBarModule,
    MatStepperModule,
    Ng2TelInputModule,
    MatSelectFilterModule,
    MatTooltipModule,
    MatCheckboxModule,
    //Apex chart

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
    MatIconModule,
    MatSnackBarModule
    
  ],
  exports: [],
  providers: [
    UserService,AuthGuard,AuthenticationService, AlertService, PhysicianService,{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    UserService,
    AuthGuard,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    UserService,
    AuthGuard,
    AuthenticationService,
    AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true 
    },
    // provider used to create fake backend
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
