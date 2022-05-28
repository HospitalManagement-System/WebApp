import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/Services/loader.service';

import { PaymentService } from 'src/app/Services/Payment/payment.service';
import { CacheInfo } from '../CacheInfo';

// C:\Working Project\CosmoWebApp\src\assets\Images\CosmosLogo.png
// import {} from 'src/assets/Images/CosmosLogo.png'

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
})
export class SubscriptionComponent implements OnInit {
  rzp: any;
  //private _window?: ICustomWindow;
  private cachedImages = new Map<string, HTMLImageElement>();
  fullImagePath?: string;

  //horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  //Button Disbale
  basic: boolean = false;
  standard: boolean = false;
  premium: boolean = false;

  //Subscription Logic
  basicbutton: string = 'Buy Now';
  standardbutton: string = 'Buy Now';
  premiumbutton: string = 'Buy Now';

  constructor(private auth: PaymentService, private _snackBar: MatSnackBar) {
    // this.cachedImages.set('myImage', 'src/assets/Images/CosmosLogo.png');
    this.fullImagePath = 'src/assets/Images/CosmosLogo.png';
  }

  ngOnInit() {
    var Get = CacheInfo.get("currentUser");
    if (typeof Get === 'string') {
      var id = JSON.parse(Get).id;
    }
    this.auth
      .GetSubscribedData(id)
      .then((response) => response.text())
      .then((result) => {
        if (result != null) {
          var data = JSON.parse(result);
          var amount = data[0].amount;

          if (amount == 199) {
            this.basic = true;
            this.basicbutton = 'Subscribed';
            this.standardbutton = 'Upgrade';
            this.premiumbutton = 'Upgrade';
          } else if (amount == 499) {
            this.basic = true;
            this.standard = true;
            this.basicbutton = 'Subscribe Higher Plan';
            this.standardbutton = 'Subscribed';
            this.premiumbutton = 'Upgrade';
          } else if (amount == 999) {
            this.basic = true;
            this.standard = true;
            this.premium = true;
            this.basicbutton = 'Subscribe Higher Plan';
            this.standardbutton = 'Subscribe Higher Plan';
            this.premiumbutton = 'Subscribed';
          }
        }
      })
      .catch((error) => console.log('error', error));
  }

  Payment(amount: any) {
    var Get = CacheInfo.get("currentUser");
    if (typeof Get === 'string') {
      var id = JSON.parse(Get).id;
    }
    this.auth
      .GenerateOrderId(id, amount)
      .then((response) => response.text())
      .then((result) => {
        if (result != null) {
          var Data = JSON.parse(result);
          //alert(Data.amount);
          const options: any = {
            key: Data.razorpayKey,
            amount: Data.amount, // amount should be in paise format to display Rs 1255 without decimal point
            currency: 'INR',
            name: 'Cosmos Hospital', // company name or product name
            description: '', // product description
            //image: 'https://photos.app.goo.gl/ogT1qH7uGkxEbZf66 ', // company logo or product image
            order_id: Data.orderId, // order_id created by you in backend
            prefill: {
              name: Data.name,
              email: Data.email,
              contact: Data.contactNumber,
            },
            modal: {
              // We should prevent closing of the form when esc key is pressed.
              escape: false,
            },
            notes: {
              // include notes if any
            },
            theme: {
              color: '#0c238a',
            },
          };

          options.handler = (response: any, error: any) => {
            options.response = response;
            var orderId = response.razorpay_order_id;
            var paymentId = response.razorpay_payment_id;
            var signature = response.razorpay_signature;
            var Get = CacheInfo.get("currentUser");
            if (typeof Get === 'string') {
              var id = JSON.parse(Get).id;
            }

            if (response != null) {
              this.auth
                .OrderConfirmationId(id, paymentId, orderId)
                .then((response) => response.text())
                .then((result) => {
                  if (result == 'Success') {
                    this._snackBar.open('Subscription Activated', 'Done', {
                      panelClass: 'success',
                      //horizontalPosition: this.horizontalPosition,
                      verticalPosition: this.verticalPosition,
                      duration: 5000,
                    });
                    //alert('Success');
                    // const snackBarRef = this._snackBar.open(
                    //   'Subscription Activated',
                    //   'Done',
                    //   {
                    //     panelClass: 'success',
                    //     horizontalPosition: this.horizontalPosition,
                    //     verticalPosition: this.verticalPosition,
                    //     duration: 5000,
                    //   }
                    // );
                    // snackBarRef.afterDismissed().subscribe((info) => {
                    //   if (info.dismissedByAction === true) {
                    //     // your code for handling this goes here
                    //     window.location.reload();
                    //   }
                    // });
                  } else {
                    this._snackBar.open('Subscription Failed', 'Done', {
                      panelClass: 'success',
                      verticalPosition: this.verticalPosition,
                      duration: 5000,
                    });
                    // alert('Failure');
                    // const snackBarRef = this._snackBar.open(
                    //   'Subscription Failed',
                    //   'Done',
                    //   {
                    //     panelClass: 'success',
                    //     horizontalPosition: this.horizontalPosition,
                    //     verticalPosition: this.verticalPosition,
                    //     duration: 5000,
                    //   }
                    // );
                    // snackBarRef.afterDismissed().subscribe((info) => {
                    //   if (info.dismissedByAction === true) {
                    //     // your code for handling this goes here
                    //     window.location.reload();
                    //   }
                    // });
                  }
                });
            }
          };
          options.modal.ondismiss = () => {
            // handle the case when user closes the form while transaction is in progress
            //alert('Transaction cancelled.');

            this._snackBar.open('Subscription Closed', 'Done', {
              panelClass: 'failure',
              verticalPosition: this.verticalPosition,
              duration: 5000,
            });

            // const snackBarRef = this._snackBar.open(
            //   'Subscription Closed',
            //   'Done',
            //   {
            //     panelClass: 'success',
            //     horizontalPosition: this.horizontalPosition,
            //     verticalPosition: this.verticalPosition,
            //     duration: 5000,
            //   }
            // );

            // snackBarRef.afterDismissed().subscribe((info) => {
            //   if (info.dismissedByAction === true) {
            //     // your code for handling this goes here
            //     window.location.reload();
            //   }
            // });
          };

          this.rzp = new this.auth.nativeWindow.Razorpay(options);
          this.rzp.open();
        } else {
        }
      })
      .catch((error) => console.log('error', error));
  }
}
