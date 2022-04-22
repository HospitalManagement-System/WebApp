import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
//import { AuthGuard } from './auth/auth.guard';
import { AddPhysicianComponent } from './Component/admin/add-physician/add-physician.component';
import { AdminCalendarComponent } from './Component/admin/admin-calendar/admin-calendar.component';
import { AdminDashboardComponent } from './Component/admin/admin-dashboard/admin-dashboard.component';
import { AdminHospitalComponent } from './Component/admin/admin-hospital/admin-hospital.component';
import { AdminPatientComponent } from './Component/admin/admin-patient/admin-patient.component';
import { LockedAccountComponent } from './Component/admin/locked-account/locked-account.component';
import { PatientUserComponent } from './Component/admin/patient-user/patient-user.component';
import { ViewPhysicianComponent } from './Component/admin/view-physician/view-physician.component';
import { ChangepasswordComponent } from './Component/home/changepassword/changepassword.component';
import { ForgotpasswordComponent } from './Component/home/forgotpassword/forgotpassword.component';
import { HomeComponent } from './Component/home/home/home.component';
import { LoginComponent } from './Component/home/login/login.component';
import { NavMenuComponent } from './Component/home/nav-menu/nav-menu.component';
import { RegisterComponent } from './Component/home/Register/register.component';
import { AppointmentViewComponent } from './Component/nurse/appointment-view/appointment-view.component';
import { BarchartComponent } from './Component/nurse/barchart/barchart.component';
import { DoctorlistComponent } from './Component/nurse/doctorlist/doctorlist.component';
import { DynamicViewComponent } from './Component/nurse/dynamic-view/dynamic-view.component';
import { MatTablegridComponent } from './Component/nurse/mat-tablegrid/mat-tablegrid.component';
import { NurseDashboardComponent } from './Component/nurse/nurse-dashboard/nurse-dashboard.component';
import { NursedashboardgridComponent } from './Component/nurse/nursedashboardgrid/nursedashboardgrid.component';
import { UpcomingAppointmentComponent } from './Component/nurse/upcoming-appointment/upcoming-appointment.component';
import { PatientBookappointmentComponent } from './Component/patient/patient-bookappointment/patient-bookappointment.component';
import { PatientDashboardComponent } from './Component/patient/patient-dashboard/patient-dashboard.component';
import { PatientDetailsComponent } from './Component/patient/patient-details/patient-details.component';
import { PatientViewdetailsComponent } from './Component/patient/patient-viewdetails/patient-viewdetails.component';
import { PreviouspatientvisitdetailsComponent } from './Component/patient/previouspatientvisitdetails/previouspatientvisitdetails.component';
import { CurrentPatientComponent } from './Component/physician/CurrentPatient/current-patient.component';
//import { NavMenuComponent } from './Component/nav-menu/nav-menu.component';
import { PhysicianComponent } from './Component/physician/physician.component';
import { BedDesignComponent } from './Component/shared/bed-design/bed-design.component';
import { BookAppointmentComponent } from './Component/shared/book-appointment/book-appointment.component';
import { CalendarComponent } from './Component/shared/calendar/calendar.component';
import { InboxComponent } from './Component/shared/inbox/inbox.component';
import { SubscriptionComponent } from './Component/shared/subscription/subscription.component';
import { Role } from './models/Role';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'Home',
    component: HomeComponent,
  },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    component: PhysicianComponent,
    path: 'Physician',
    canActivate: [AuthGuard],
    data: { roles: [Role.Physician] },
  },
  {
    component: CurrentPatientComponent,
    path: 'CurrentPatient',
    canActivate: [AuthGuard],
    data: { roles: [Role.Physician] },
  },
  {
    component: AdminDashboardComponent,
    path: 'AdminDashboard',
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    component: PatientUserComponent,
    path: 'PatientUser',
    canActivate: [AuthGuard],
    data: { roles: [Role.User] },
  },
  {
    component: AddPhysicianComponent,
    path: 'AddPhysician/:type',
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    component: AddPhysicianComponent,
    path: 'AddNurse/:type',
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    component: ViewPhysicianComponent,
    path: 'ViewPhysician',
    canActivate: [AuthGuard],
    data: { roles: [Role.Physician] },
  },
  {
    component: RegisterComponent,
    path: 'Signup',
  },
  {
    component: ForgotpasswordComponent,
    path: 'forgotpassword',
  },
  {
    component: NurseDashboardComponent,
    path: 'NurseDashboard',
    canActivate: [AuthGuard],
    data: { roles: [Role.Nurse] },
  },
  {
    component: AppointmentViewComponent,
    path: 'AppointmentView',
  },
  {
    component: BarchartComponent,
    path: 'BarchartView',
  },
  {
    component: NursedashboardgridComponent,
    path: 'NursegridView',
  },
  {
    component: PatientDetailsComponent,
    path: 'PatientDetails',
    canActivate: [AuthGuard],
    data: { roles: [Role.Patient] },
  },
  {
    component: DoctorlistComponent,
    path: 'Doctorlist',
  },
  {
    component: DynamicViewComponent,
    path: 'DynamicView',
  },
  {
    component: PatientBookappointmentComponent,
    path: 'PatientBookappointment',
    canActivate: [AuthGuard],
    data: { roles: [Role.Patient] },
  },
  {
    component: PatientBookappointmentComponent,
    path: 'NurseBookappointment',
    canActivate: [AuthGuard],
    data: { roles: [Role.Nurse] },
  },

  {
    component: PatientViewdetailsComponent,
    path: 'PatientViewdetails',
    canActivate: [AuthGuard],
    data: { roles: [Role.Patient] },
  },
  {
    component: PatientDashboardComponent,
    path: 'PatientDashboard',
  },
  {
    component: AdminCalendarComponent,
    path: 'AdminCalender',
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    component: MatTablegridComponent,
    path: 'MatTableGrid',
  },
  {
    component: PatientViewdetailsComponent,
    path: 'NurseViewdetails',
    canActivate: [AuthGuard],
    data: { roles: [Role.Nurse] },
  },
  {
    component: CalendarComponent,
    path: 'Calender',
    canActivate: [AuthGuard],
    data: {
      roles: [Role.Admin] || [Role.Nurse] || [Role.Physician],
    },
  },
  {
    component: CalendarComponent,
    path: 'PatientCalender/:Type',
    canActivate: [AuthGuard],
    data: {
      roles: [Role.Patient],
    },
  },
  {
    component: PatientBookappointmentComponent,
    path: 'AdminBookappointment/:type',
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    component: PatientBookappointmentComponent,
    path: 'PatientBookappointment/:type',
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    component: LockedAccountComponent,
    path: 'LockedAccount',
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    component: AdminPatientComponent,
    path: 'AdminPatient',
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    component: AdminHospitalComponent,
    path: 'AdminHospital',
    canActivate: [AuthGuard],
    data: {
      roles: [Role.Admin] || [Role.Patient] || [Role.Nurse] || [Role.Physician],
    },
  },
  {
    component: BookAppointmentComponent,
    path: 'BookAppointment/:Type',
    canActivate: [AuthGuard],
    data: {
      roles: [Role.Admin],
    },
  },
  {
    component: BookAppointmentComponent,
    path: 'PatientBookAppointment/:Type',
    canActivate: [AuthGuard],
    data: {
      roles: [Role.Patient],
    },
  },
  {
    component: SubscriptionComponent,
    path: 'Subscription',
    canActivate: [AuthGuard],
    data: {
      roles: [Role.Patient],
    },
  },
  {
    component: PreviouspatientvisitdetailsComponent,
    path: 'previouspatientvisitdetails',
    canActivate: [AuthGuard],
    data: { roles: [Role.Patient] },
  },
  {
    component: PreviouspatientvisitdetailsComponent,
    path: 'NursePreviousVisitDetails',
    canActivate: [AuthGuard],
    data: { roles: [Role.Nurse] },
  },
  {
    component: PatientViewdetailsComponent,
    path: 'NursePatientViewdetails',
    canActivate: [AuthGuard],
    data: { roles: [Role.Nurse] },
  },
  {
    component: PatientViewdetailsComponent,
    path: 'PhysicianPatientViewdetails',
    canActivate: [AuthGuard],
    data: { roles: [Role.Physician] },
  },
  {
    component: CalendarComponent,
    path: 'NurseAdminCalender',
    canActivate: [AuthGuard],
    data: { roles: [Role.Nurse] },
  },
  {
    component: UpcomingAppointmentComponent,
    path: 'NurseUpcomingAppointmentComponent',
    canActivate: [AuthGuard],
    data: { roles: [Role.Nurse] },
  },
  {
    component: UpcomingAppointmentComponent,
    path: 'PhysicianUpcomingAppointmentComponent',
    canActivate: [AuthGuard],
    data: { roles: [Role.Physician] },
  },
  {
    component: InboxComponent,
    path: 'Inbox',
    canActivate: [AuthGuard],
  },
  {
    component: ChangepasswordComponent,
    path: 'Changepassword',
    //canActivate: [AuthGuard],
  },
  {
    component: BedDesignComponent,
    path: 'BedAllotment',
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    component: BedDesignComponent,
    path: 'NurseBedAllotment',
    canActivate: [AuthGuard],
    data: { roles: [Role.Nurse] },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
