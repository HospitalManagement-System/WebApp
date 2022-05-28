import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Changepassword } from 'src/app/models/changepassword';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/Services';
import { CacheInfo } from '../../shared/CacheInfo';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/Services/loader.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css'],
})
export class ChangepasswordComponent implements OnInit {
  //@Input() user!:User | undefined;

  // oldpassword!: string;
  // newpassword!: string;

  // confirmpassword!: string;
  id!: Guid;
  errormessage!: string;
  changepasswordform!: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.changepasswordform = this.formBuilder.group({
      oldpassword: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
    });
    var Get = CacheInfo.get("currentUser");
    if (typeof Get === 'string') {
      this.id = JSON.parse(Get).id;
    }
    console.log(this.id);
  }

  onSubmit() {
    this.submitted = true;
    if (this.changepasswordform.invalid) {
      return;
    }

    this.submitted = true;
    //var data = this.changepasswordform.value;
    if (this.changepasswordform.value.oldpassword !== 'Password@123') {
      this.errormessage = 'Old password is incorrect';
      return;
    }
    if (
      this.changepasswordform.value.password !==
      this.changepasswordform.value.confirmpassword
    ) {
      this.errormessage = 'Password and Confirm password are not same.';
      return;
    }
    let password = this.changepasswordform.value.password;
    let obj: Changepassword = {
      Id: this.id,
      Password: this.changepasswordform.value.password,
    };
    //console.log(data)
    console.log(obj);
    this.authenticationService.changepassword(obj);
    this.authenticationService.logout();
    // this.router.navigate(['Login']).then(() => {
    //   window.location.reload();
    // });
  }
}
