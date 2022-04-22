import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NurseDashboardComponent } from './nurse-dashboard/nurse-dashboard.component';
import { AppointmentViewComponent } from './appointment-view/appointment-view.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { DynamicViewComponent } from './dynamic-view/dynamic-view.component';
import { AddDailogeComponent } from './dailoge/add-dailoge/add-dailoge.component';
import { EditDailogeComponent } from './dailoge/edit-dailoge/edit-dailoge.component';
import { DeleteDailogeComponent } from './dailoge/delete-dailoge/delete-dailoge.component';
import {MatToolbarModule} from '@angular/material/toolbar';




import { HttpClientModule } from '@angular/common/http';

import {MatCardModule} from '@angular/material/card';
import { MatTablegridComponent } from './mat-tablegrid/mat-tablegrid.component';
// import { DynamicTableComponent } from '../reusable/dynamic-table/dynamic-table.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BarchartComponent } from './barchart/barchart.component';
import { NursedashboardgridComponent } from './nursedashboardgrid/nursedashboardgrid.component';
import { DoctorlistComponent } from './doctorlist/doctorlist.component';
import { UpcomingAppointmentComponent } from './upcoming-appointment/upcoming-appointment.component';





@NgModule({
  declarations: [
    NurseDashboardComponent,
    AppointmentViewComponent,
    DynamicViewComponent,
    
    AddDailogeComponent,
    EditDailogeComponent,
    DeleteDailogeComponent,
    MatTablegridComponent,
    // DynamicTableComponent,
    BarchartComponent,
    NursedashboardgridComponent,
    DoctorlistComponent,
    UpcomingAppointmentComponent,
    UpcomingAppointmentComponent,
    
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule, 
    MatTableDataSource,
    MatToolbarModule,
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTooltipModule
    
    
    
  ]
})
export class NurseModule { }
