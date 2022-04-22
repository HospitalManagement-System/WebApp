import { NgModule } from  '@angular/core';
import { CommonModule } from '@angular/common';
import { MY_FORMATS, PatientDetailsComponent } from './patient-details/patient-details.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { PatientBookappointmentComponent } from './patient-bookappointment/patient-bookappointment.component';
import { PatientViewdetailsComponent } from './patient-viewdetails/patient-viewdetails.component';
import { DateAdapter, MatOption, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';


import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { PreviouspatientvisitdetailsComponent } from './previouspatientvisitdetails/previouspatientvisitdetails.component';
import { HttpClientModule } from '@angular/common/http';
import { MatStepperModule } from '@angular/material/stepper';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatCheckboxModule} from '@angular/material/checkbox'
@NgModule({
  declarations: [
    PatientDetailsComponent,
    PatientBookappointmentComponent,
    PatientViewdetailsComponent,
    // PatientDashboardComponent,
    PreviouspatientvisitdetailsComponent,
  
  ],
  imports: [
    CommonModule,
    
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
    MatOption,
    HttpClientModule,
    Ng2TelInputModule,
    MatStepperModule,
    MatCheckboxModule,
    //AppModule
  ],
  exports: [],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
})
export class PatientModule {}
