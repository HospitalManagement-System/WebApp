import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BedManagement, bedRequest,BedType, fromType, RoomType } from 'src/app/models/bedallocate';
import { BedmangeService } from 'src/app/Services/Bed/bedmange.service';

@Component({
  selector: 'app-bed-details',
  templateUrl: './bed-details.component.html',
  styleUrls: ['./bed-details.component.css']
})
export class BedDetailsComponent implements OnInit {
  bedManagement: BedManagement;
  bedEnums: any;
  roomEnums: any;
  FilterAndOr : number = 1;      // Default And Condition
  ngOnInit(): void {
  }
  constructor(public dialogRef: MatDialogRef<BedDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: bedRequest, public service: BedmangeService) {
    this.bedManagement = data.bedDetails;    
    this.bedEnums = Object.values(BedType).filter(value => typeof value === 'string').map((i:any) => {
                        return {
                                 key: BedType[i],
                                 value: i,
                        };
                    });
    this.roomEnums = Object.values(RoomType).filter(value => typeof value === 'string').map((i:any) => {
                        return {
                                 key: RoomType[i],
                                 value: i,
                        };
                    });
  }
  Apply() {
    if(this.data.fromType == fromType.filter){
      let fData:any={};
      fData.Data = this.bedManagement;
      fData.FilterAndOr = this.FilterAndOr;
      this.dialogRef.close(fData);
    }
    else{
    this.service.UpdateBedStatus(this.bedManagement).then((result) => {
           this.dialogRef.close();
    });
  }
  }
}


