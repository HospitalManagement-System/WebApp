import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/Services';
import { Role } from 'src/app/models/Role';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/Services/Alert/alert.service';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/User';
import { Guid } from 'guid-typescript';
import { MainUserDetails } from 'src/app/models/MainUserDeatils';
import { CacheInfo, CommonHelper } from '../../shared/CacheInfo';
import jwt_decode from "jwt-decode";
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  showModal!: boolean;
  forgotModal!: boolean;
  isForgotPassword!: boolean;
  OldpassWordGenerated!: boolean;
  oldpasswordInmailGenerated!: number;
  oldpassword!: string;
  newpassword!: string;
  confirmpassword!: string;
  errorMessage!: string;
  errormessage!: string;
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';
  currentUser!: User;
  IsmodelShow!: boolean;
  userEmail!: string;
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  // create a field to hold error messages so we can bind it to our        template
  resultMessage!: string;
  closeResult = '';
  private formSubmitAttempt!: boolean;
  displayStyle!: '';
  private loggedIn = new BehaviorSubject<boolean>(false);
  isFirstLogin: boolean = false;
  userList: User[] = [];
  user!: User | undefined;
  userDetail!: MainUserDetails | undefined;
  count: number = 0;
  errorstatus!: boolean;
  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal
  ) {
    // window.location.reload();
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  close() {
    this.modalService.dismissAll();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    const reload = () => window.location.reload();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.submitted = true;
    this.authenticationService.login(this.loginForm).subscribe((res: any) => {
      if (res != null) {
        let decodedTocken: any = jwt_decode(res.token);
        if (decodedTocken["user"] != null) {
          let UserDeatils = decodedTocken["user"];
          this.user = new User();
          this.user.isActive = UserDeatils.IsActive;
          this.user.isFirstLogin = UserDeatils.IsFirstLogIn;
          this.user.isLocked = UserDeatils.IsLocked;
          this.user.password = UserDeatils.Password;
          this.user.role = UserDeatils.Role;
          this.user.id = UserDeatils.Id;
          this.user.NoOfAteempt = UserDeatils.NoOfAttempts;
          this.user.userName = UserDeatils.UserName;
          this.user.token = res.token;
        }
      }
      this.login();
    });
  }
  login(){    
    if (this.user !== undefined && this.loginForm.valid) {
      if (this.user.isLocked) {
        this.errorstatus = true;
        this.errormessage = 'Your account is locked.';
        return;
      }
      if (!this.user.isActive) {
        this.errorstatus = true;
        this.errormessage = 'Your account is inactive.';
        return;
      }
      this.errorstatus = false;
      CommonHelper.AddToLocalStorage(this.user);
      CacheInfo.set("currentUser",JSON.stringify(this.user));
      if (!this.user.isFirstLogin) {
        this.authenticationService.setcurrentUserValue(this.user);
        this.router.navigateByUrl('/Home');
      } else {
        this.router.navigate(['Changepassword']);
        this.isFirstLogin = true;
      }
    } else {
      this.count++;
      this.errormessage = 'Username or Password is incorrect.';
      if (this.count >= 3) {
        this.errorstatus = false;
        this.errorstatus = true;
        this.errormessage = 'Your account is locked.';
        let userreset = this.userList.find(
          (x) => x.userName.toLowerCase() === this.loginForm.value.username.toLowerCase()
        );
        if (userreset !== undefined) {
          this.userDetail = {
            Id: userreset.id,
            UserName: '',
            Password: '',
            Status: false,
            IsActive: false,
            IsLocked: true,
            IsFirstLogIn: false,
            NoOfAttempts: 3,
          };
          this.authenticationService.lockAccount(this.userDetail);
        }
      }
      this.errorstatus = true;
    }
  }
  openchangepass(changepasscontent: any) {
    this.modalService
      .open(changepasscontent, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  GenerateOtp() {
    let regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!(this.userEmail.length > 0)) {
      this.alertService.error('Please Enter an Email');
      return;
    }
    if (!regexp.test(this.userEmail)) {
      this.alertService.error('Please Enter a valid email');
      return;
    }
    this.OldpassWordGenerated = true;
  }

  SendEmail() {
    let user = this.userList.find((x) => x.userName === this.userEmail);
    //var user = this.userList.splice(index,1)
    if (user === undefined || user === null) {
      this.errorMessage = 'Incorrect email';
      return;
    }
    this.OldpassWordGenerated = true;
    this.authenticationService.SendEmail(this.userEmail, user.userName);
  }

  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.value.valid && this.loginForm.value.touched) ||
      (this.loginForm.value.untouched && this.formSubmitAttempt)
    );
  }

  ResetPassword() {
    this.errorMessage = '';
    this.OldpassWordGenerated = false;
    this.user = this.userList.find((x) => x.userName === this?.userEmail);
    //let pass = this.user?.userName + '123'
    if ('Password@123' !== this.oldpassword) {
      this.errorMessage += 'Default Password is incorrect';
      return;
    }

    if (this.newpassword != this.confirmpassword) {
      this.errorMessage += 'New Password and Confirm Password are not same';
      return;
    }
    if (this.newpassword.length < 8) {
      this.errorMessage += 'Password cannot be less than 8 characters';
      return;
    }

    //v = localStorage.getItem('user')

    //let  = this.userList.splice(index,1)
    var user: MainUserDetails = {
      Id: this.user?.id,
      Password: this.newpassword,
      UserName: '',
      Status: true,
      IsFirstLogIn: false,
      NoOfAttempts: 0,
      IsActive: false,
      IsLocked: false,
      //RoleId : Guid
    };

    this.authenticationService.Resetpassword(user);

    this.modalService.dismissAll();
    //close() ;
    //   this.location.back();
  }
}
