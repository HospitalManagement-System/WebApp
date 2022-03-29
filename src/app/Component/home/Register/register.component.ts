import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/Services/Userservice/userservice/user.service';

import Keyboard from 'simple-keyboard';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userData: any;
  registrationform!: FormGroup;
  keyboard!: Keyboard;
  value = '';
  today = new Date();
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  submitted = false;
  constructor(
    public userService: UserService,
    public _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    //this.registrationform.reset();

    this.registrationform = new FormGroup({
      Title: new FormControl('', [Validators.required]),
      FirstName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      LastName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      //UserName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]),
      PhoneNo: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern('^[0-9]+$'),
      ]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      DateOfBirth: new FormControl('', [Validators.required]),
    });
    //this.registrationform = this.fb.group({
    // Title: ['', Validators.required],
    // FirstName:['', Validators.required, Validators.pattern('^[a-zA-Z]+$')],
    // LastName:['', Validators.required, Validators.pattern('^[a-zA-Z]+$')],
    // UserName:['', Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')],
    // PhoneNo: ['', Validators.required,Validators.pattern('^[0-9]+$'),Validators.maxLength(10)],
    // Email:['', Validators.required, Validators.email],
    // DateOfBirth: ['', Validators.required],
    //})
  }
  onSubmit(): void {
    // console.log(this.userService.formModel.value.Password)og(this.userService.formModel.value.ConfirmPassword)
    // if (
    // ) {
    this.submitted = true;
    console.log(this.registrationform);
    console.log(this.registrationform.value);
    if (this.registrationform.status === 'INVALID') {
      return;
    } else {
      this.submitted = false;
      this.userService.register(this.registrationform).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res) {
            console.log('In next sub');
            this.registrationform.reset();
            const snackBarRef = this._snackBar.open(
              'Registration Successful',
              'Done',
              {
                panelClass: 'success',
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000,
              }
            );
            snackBarRef.afterDismissed().subscribe((info) => {
              if (info.dismissedByAction === true) {
                // your code for handling this goes here
                this.router.navigate(['/Login']);
              }
            });
            //this.toastr.success('New user created!', 'Registration successful.');
          } else {
            console.log(res);
            console.log('In next sub');
            res.errors.forEach((element: { code: any; description: any }) => {
              switch (element.code) {
                case 'DuplicateUserName':
                  this._snackBar.open('Duplicate Username.', 'Failed', {
                    panelClass: 'error',
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: 5000,
                  });
                  //this.toastr.error('Username is already taken','Registration failed.');
                  break;

                default:
                  this._snackBar.open('Registration Failed.', '', {
                    panelClass: 'error',
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: 5000,
                  });
                  break;
              }
            });
          }
        },
        error: (e) => console.error(e),
      });
    }

    //console.log('In out sub')
    //}
    // else{
    //   console.log('hii')
    //   this._snackBar.open('Password and Confirm Password mismatch', '', {
    //     panelClass: 'error',
    //     horizontalPosition: this.horizontalPosition,
    //     verticalPosition: this.verticalPosition,
    //     duration: 5000,
    //   });
    // }
  }
}

// signUp(data:any){

//   //this.user.changeData(data);
// }

// ngAfterViewInit() {
//   this.keyboard = new Keyboard({
//     onChange: input => this.onChange(input),
//     onKeyPress: (button: string) => this.onKeyPress(button),
//     mergeDisplay: true,
//     layoutName: "default",
//     layout: {
//       default: [
//         "q w e r t y u i o p",
//         "a s d f g h j k l",
//         "{shift} z x c v b n m {backspace}",
//         "{numbers} {space} {ent}"
//       ],
//       shift: [
//         "Q W E R T Y U I O P",
//         "A S D F G H J K L",
//         "{shift} Z X C V B N M {backspace}",
//         "{numbers} {space} {ent}"
//       ],
//       numbers: ["1 2 3", "4 5 6", "7 8 9", "{abc} 0 {backspace}"]
//     },
//     display: {
//       "{numbers}": "123",
//       "{ent}": "return",
//       "{escape}": "esc ⎋",
//       "{tab}": "tab ⇥",
//       "{backspace}": "⌫",
//       "{capslock}": "caps lock ⇪",
//       "{shift}": "⇧",
//       "{controlleft}": "ctrl ⌃",
//       "{controlright}": "ctrl ⌃",
//       "{altleft}": "alt ⌥",
//       "{altright}": "alt ⌥",
//       "{metaleft}": "cmd ⌘",
//       "{metaright}": "cmd ⌘",
//       "{abc}": "ABC"
//     }

//   });
// }

// onChange = (input: string) => {
//   this.value = input;
//   console.log("Input changed", input);
// };

// onKeyPress = (button: string) => {
//   console.log("Button pressed", button);

//   /**
//    * If you want to handle the shift and caps lock buttons
//    */
//   if (button === "{shift}" || button === "{lock}") this.handleShift();
// };

// onInputChange = (event: any) => {
//   this.keyboard.setInput(event.target.value);
// };

// handleShift = () => {
//   let currentLayout = this.keyboard.options.layoutName;
//   let shiftToggle = currentLayout === "default" ? "shift" : "default";

//   this.keyboard.setOptions({
//     layoutName: shiftToggle
//   });
// };

// handleNumbers() {
//   let currentLayout = this.keyboard.options.layoutName;
//   let numbersToggle = currentLayout !== "numbers" ? "numbers" : "default";

//   this.keyboard.setOptions({
//     layoutName: numbersToggle
//   });
// }
