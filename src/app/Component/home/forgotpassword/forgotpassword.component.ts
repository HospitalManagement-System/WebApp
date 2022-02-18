import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private  dialogRef:  MatDialogRef<ForgotpasswordComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) {
  }
  ngOnInit(): void {
  }
  public  closeMe() {
      this.dialogRef.close();
  }

}
