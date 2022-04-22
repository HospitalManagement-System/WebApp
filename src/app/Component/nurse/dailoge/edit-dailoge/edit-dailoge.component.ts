import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DailogeService } from 'src/app/Services/dailoge.service';
import { Appointment } from 'src/app/models/patientDashboard';
import { Product } from 'src/app/models/appointment';
import { Doctor } from 'src/app/models/doctordata';
import { id } from 'date-fns/locale';
import { Mode } from 'src/app/models/patient.model';
import { GenerateTimeSlot } from 'src/app/models/Globalfunctions';
import { BookAppointmentService } from 'src/app/Services/BookAppointment/book-appointment.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-dailoge',
  templateUrl: './edit-dailoge.component.html',
  styleUrls: ['./edit-dailoge.component.css'],
  providers: [DatePipe]
})
export class EditDailogeComponent implements OnInit {
  registerForm !: FormGroup;
  name !: string;
  id !: string;
  gender !: string;
  address!: string;
  contact!: number;
  bookedslot: string = "1";
  physician!: string;
  date!: string;
  diagnosis!: string;
  sugarLevel!: string;
  // docters!: Doctor[];
  selectedFoods = 1;
  ModeTypes?: Array<string>;
  diagnosicscheck?: boolean;
  datecheck?: boolean;
  firstslot!: Array<string>;
  secondslot!: Array<string>;
  incomingslot: Array<string> = [];
  outgoingslot!: Array<string>;


  constructor( private service: BookAppointmentService,public dialogRef: MatDialogRef<EditDailogeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dailogueservice: DailogeService, private formBuilder: FormBuilder,private datePipe: DatePipe) {

      this.registerForm = this.formBuilder.group({
        field1: [this.datePipe.transform(this.data.data.appointmentDateTime, 'medium')]
      })
     }



  ngOnInit(): void {
   
    
    var date = new Date();
    var full =
      date.getDate() +
      '-' +
      date.getMonth() +
      1 +
      '-' +
      date.getFullYear();

    var SendDatetoSlot =
      date.getFullYear() +
      '-' +
      date.getMonth() +
      1 +
      '-' +
      date.getDate();
    var slot= this.SlotGenerator('Nurse', SendDatetoSlot);
   
   // this.getdoctordata()
    this.setdata();
  }

  get f() { return this.registerForm.controls; }

  onNoClick(): void {
    this.dialogRef.close();

  }
 
  // getdoctordata() {
  //   this.dailogueservice.getDoctorListData().subscribe(data => {
  //     this.docters = data;
  //     console.log(this.docters)

  //   });
  // }
  setdata(){
   
  
    this.registerForm = this.formBuilder.group({
      id: [''],
      name: [''],
      diagnosis: [''],
      gender: [''],
      contact: [''],
      bookslot: ['', Validators.required],
      physician: [''],
      appointmentDateTime: ['', Validators.required],
    });
    
    this.registerForm.controls['name'].setValue(this.data.data.name)
    this.registerForm.controls['name'].disable()
   
    this.registerForm.controls['bookslot'].setValue(this.data.data.bookSlot)
    this.registerForm.controls['gender'].setValue(this.data.data.gender)
    this.registerForm.controls['gender'].disable()
    this.registerForm.controls['contact'].setValue(this.data.data.contact)
    this.registerForm.controls['contact'].disable()
    this.registerForm.controls['physician'].setValue(this.data.data.physicanName)
    this.registerForm.controls['physician'].disable()
    this.registerForm.controls['diagnosis'].setValue(this.data.data.diagnosis)
    this.registerForm.controls['diagnosis'].disable()
    // this.registerForm.controls['appointmentDateTime'].setValue(this.datePipe.transform(this.data.data.appointmentDateTime, 'shortDate'))
    this.registerForm.controls['appointmentDateTime'].setValue(this.data.data.appointmentDateTime)
    this.registerForm.controls['id'].setValue(this.data.data.id)
  }
  
  submit() {

    

    let data = this.registerForm.value;
    let id = data['id']
    this.dailogueservice.updateIssue(id, data).subscribe( );
  }

  SlotGenerator(UserType: string, date: string):any  
   {
    if (UserType == 'Nurse') 
    {
      this.diagnosicscheck = false;
      this.datecheck = false;
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
        .GetBookSlot('2791E8B4-CF75-451A-9C30-A00D173879AB', date)
        .subscribe((res: string | any[]) => {
          for (var i = 0; i < res.length; i++) {
            this.incomingslot.push(res[i].bookslot);
          }
          const duplicate = this.incomingslot;
          let unique = [...new Set(duplicate)];
          this.firstslot = firstslot.filter((val: any) => !unique.includes(val));
          this.secondslot = secondslot.filter((val: any) => !unique.includes(val));
          console.log(this.firstslot)
        
         this.ModeTypes = this.firstslot;
          
          
        })
       

            
    }
  }
}
