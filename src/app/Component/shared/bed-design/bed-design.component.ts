import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Floor, Room, Bed, BedManagement, BedType, fromType, bedRequest, RoomType, BedFunctions } from 'src/app/models/bedallocate';
import { BedmangeService } from 'src/app/Services/Bed/bedmange.service';
import { BedAllocateComponent } from '../../bed/bed-allocate/bed-allocate.component';
import { BedDetailsComponent } from '../../bed/bed-details/bed-details.component';
import { CacheInfo } from '../CacheInfo';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/Services/loader.service';
import { BillInfoComponent } from '../bill-info/bill-info.component';
declare var $: any;
@Component({
  selector: 'app-bed-design',
  templateUrl: './bed-design.component.html',
  styleUrls: ['./bed-design.component.css']
})
export class BedDesignComponent implements OnInit {
  isAdmin: boolean = false;
  floors: Floor[] = [];
  floor: Floor = new Floor();
  rooms: Room[] = [];
  room: Room = new Room();
  beds: Bed[] = [];
  bed: Bed = new Bed();
  AllBeds: BedManagement[] = [];
  isMulti: boolean = false;
  selectedBed: BedManagement[] = [];
  NOData:boolean = false;
  constructor(public service: BedmangeService, public dialog: MatDialog) {
  }
  getEnumData(enumData: any, forBed: boolean) {
    if (forBed) {
      return BedType[enumData].replace("_"," ");
    }
    else {
      return RoomType[enumData].replace("_"," ");
    }
  }
  ngOnInit() {
    this.CheckForAdmin();
    this.service.GetBedDesign().subscribe((res: BedManagement[]) => {
      this.AllBeds = res;
      this.DesignBed();
    });
  }
  CheckForAdmin() {
    let Get = CacheInfo.get('currentUser');
    if (typeof Get === 'string') {
      this.isAdmin = JSON.parse(Get).role == "ADMIN" ? true : false;
    }
  }
  AddFloor() {
    this.floors.push(this.floor);
    let floorId = this.floors.length - 1;
    let BedManagement: BedManagement = {
      floor: floorId,
      room: -1,
      bed: -1,
      isAvilable: true,
      bedType: BedType.General_Bed,
      fullName: "Floor" + floorId,
      roomType: RoomType.General_ward,
      bedCost: -1
    };
    this.AddDetails(BedManagement);
  }
  AddRoom(i: number) {
    this.floors[i].rooms.push(this.room);
    let BedManagement: BedManagement = {
      floor: i,
      room: this.floors[i].rooms.length - 1,
      bed: -1,
      isAvilable: true,
      bedType: BedType.General_Bed,
      fullName: "Room" + this.floors[i].rooms.length,
      roomType: RoomType.General_ward,
      bedCost: -1
    };
    this.AddDetails(BedManagement);
  }
  AddBed(i: number, j: number) {
    this.floors[i].rooms[j].beds.push(this.bed);
    let BedManagement: BedManagement = {
      floor: i,
      room: j,
      bed: this.floors[i].rooms[j].beds.length - 1,
      isAvilable: true,
      bedType: BedType.General_Bed,
      fullName: "Bed" + this.floors[i].rooms[j].beds.length,
      roomType: RoomType.General_ward,
      bedCost: 1000
    };
    this.AddDetails(BedManagement);
  }
  AddDetails(BedManagement: BedManagement) {
    this.service.AddDetails(BedManagement).then((result) => {
      if (result != null) {
        this.ngOnInit();
      }
    });
  }
  getDetails(details: any) {
    return JSON.stringify(details);
  }
  ApplyChange(floor: number, room: number, bed: number, forFilter: boolean,event: any) {
    let bedReq = new bedRequest();
    if (forFilter) {
      bedReq.bedDetails = new BedManagement();
      bedReq.bedDetails.bedType = -1;
      bedReq.bedDetails.roomType = -1;
      bedReq.bedDetails.isAvilable = false;
    }
    else {
      bedReq.bedDetails = this.AllBeds.filter(x => x.floor == floor && x.room == room && x.bed == bed)[0];
    }
    bedReq.fromType = forFilter ? fromType.filter : fromType.allocate;
    let width = "60%";
    let height = "40%";
    if (forFilter) {
      width = "60%";
      height = "50%";
    }
    const dialogRef = this.dialog.open(BedDetailsComponent, {
      width: width,
      height: height,
      data: bedReq
    });
    dialogRef.afterClosed().subscribe(result => {
      if (forFilter) {
        if (typeof result == "undefined")
          return;
        //FilterAndOr
        let AllNodes = $("#mainDiv").find(".floorDiv,.roomDiv,.bedDiv");
        for (let i = 0; i < AllNodes.length; i++) {
          let noFilter = false;
          let details = JSON.parse(AllNodes.eq(i).attr("details"));
          if (result.FilterAndOr == 1) {
            noFilter = result.Data.fullName != "" ? AllNodes.eq(i).text().toLowerCase().indexOf(result.Data.fullName.toLowerCase()) == -1 : true;
            // noFilter = noFilter && result.Data.isAvilable;
            // if (typeof details.roomType != "undefined" && result.Data.roomType != -1) {
            //   noFilter = details.roomType != result.Data.roomType && noFilter;
            // }
            // else {
            //   noFilter = noFilter && true;
            // }
            // if (typeof details.bedType != "undefined" && result.Data.bedType != -1) {
            //   noFilter = details.bedType != result.Data.bedType && noFilter;
            // }
            // else {
            //   noFilter = noFilter && true;
            // }
          }
          else {
            noFilter = result.Data.fullName != "" ? AllNodes.eq(i).text().toLowerCase().indexOf(result.Data.fullName.toLowerCase()) == -1 : false;
            // noFilter = noFilter || result.Data.isAvilable;
            // if (typeof details.roomType != "undefined" && result.Data.roomType != -1) {
            //   noFilter = details.roomType != result.Data.roomType || noFilter;
            // }
            // else {
            //   noFilter = noFilter || true;
            // }
            // if (typeof details.bedType != "undefined" && result.Data.bedType != -1) {
            //   noFilter = details.bedType != result.Data.bedType || noFilter;
            // }
            // else {
            //   noFilter = noFilter || true;
            // }
          }
          if (noFilter) {
            AllNodes.eq(i).hide();
          }
          else {
            AllNodes.eq(i).attr("canShow", "true");
          }
        }
        let AllShowAbleNodes = $("#mainDiv").find("[canShow='true']");
        for (let i = 0; i < AllShowAbleNodes.length; i++) {
          AllShowAbleNodes.eq(i).parents().show();
        }

        // this.AllBeds =  this.AllBeds.filter(x=> x.bedType == result.bedType && x.fullName.includes(result.fullName) && x.isAvilable == result.isAvilable);
        // this.DesignBed();
      }
      else
        this.ngOnInit();
    });
    event.stopImmediatePropagation();
  }
  AllocateBedForUser(){
    let bedReq = new bedRequest();
    bedReq.bedDetails = this.selectedBed[0];
    bedReq.fromType = fromType.allocate;
    let width = "100%";
    let height = "100%";
    const dialogRef = this.dialog.open(BedAllocateComponent, {
      width: width,
      height: height,
      data: bedReq
    });
    dialogRef.afterClosed().subscribe(result => {
      bedReq.bedDetails.patientId = result;
      const dialogRef = this.dialog.open(BillInfoComponent, {
        width: width,
        height: height,
        data: bedReq
      });
      dialogRef.afterClosed().subscribe(result => {
         this.ngOnInit();
      });
    });
  }
  AllocateBed() {
    if(this.selectedBed.length > 0){
      if(BedFunctions.hasPatient(this.selectedBed[0])){
        alert("Bed is Allocated Already");
      }
      else{
        this.AllocateBedForUser();
      }
    }
    else{
      alert("Please Select Bed");
    }
  }
  Transfer() {
    switch(this.selectedBed.length){
      case 0:
        alert("Please Select 2 Beds to be Transfered");
        return;
      case 1:
        if(this.isMulti){
           alert("Please Select 2nd Bed to be Transfered");
           return;
        }
        else{
           alert("Transfer is activated");
        }
        break;
      case 2:
        this.service.TransferBedPatient(this.selectedBed).then((result) => {
          if (result != null) {
            alert("Transfer is Done");
            this.selectedBed = [];
            this.ngOnInit();
          }
        });  
    }
    this.isMulti = !this.isMulti;
  }
  removeBedFromSelectedBed(bedDetails:Bed){
    let removeIndex = this.selectedBed.findIndex(x=> x.floor == bedDetails.floor && x.room == bedDetails.room && x.bed == bedDetails.bed);
    this.selectedBed.splice(removeIndex,1);
  }
  selectBed(event: any) {
    let bedDiv = $(event.target).hasClass("bedDiv") ? $(event.target) : $(event.target).parents(".bedDiv");
    let bedDetails = JSON.parse(bedDiv.attr("details"));
    if(!bedDetails.isAvilable){
      alert("Bed can't be Allocated");
      event.stopImmediatePropagation();
      return;
    }
    if (this.isMulti && bedDiv.parents("#mainDiv").find(".selected").length == 2) {
      if(this.selectedBed.filter(x=> x.floor == bedDetails.floor && x.room == bedDetails.room && x.bed == bedDetails.bed).length == 0){
         alert("Can't select more than 2 Bed for Transfer");
          return;
      }
      else{
        bedDiv.removeClass("selected");
        this.removeBedFromSelectedBed(bedDetails);
        return;
      }
    }
    if (!this.isMulti) {
      this.selectedBed = [];
      if (bedDiv.parents("#mainDiv").find(".selected").length == 1) {
        let canGoout = bedDiv.hasClass("selected");
        bedDiv.parents("#mainDiv").find(".selected").removeClass("selected");
        if (canGoout)
          return;
      }
    }
    if (bedDiv.hasClass("selected")) {
      bedDiv.removeClass("selected");
      this.removeBedFromSelectedBed(bedDetails);
    }
    else {
      bedDiv.addClass("selected");
      this.selectedBed.push(bedDetails);
    }
    event.stopImmediatePropagation();
  }
  DesignBed() {
    this.floors = [];
    for (let i = 0; i < this.AllBeds.length; i++) {
      let floor = this.AllBeds[i].floor;
      let room = this.AllBeds[i].room;
      let bed = this.AllBeds[i].bed;
      let isAvilable = this.AllBeds[i].isAvilable;
      let bedType = this.AllBeds[i].bedType;
      let fullName = this.AllBeds[i].fullName;
      let bedCost = this.AllBeds[i].bedCost;
      let patientId = this.AllBeds[i].patientId;
      let floorDetails = this.AllBeds.filter(x => x.floor == floor && x.room == -1 && x.bed == -1)[0];
      let roomDetails = this.AllBeds.filter(x => x.floor == floor && x.room == room && x.bed == -1)[0];
      if (typeof this.floors[floor] == "undefined") {
        this.floors[floor] = new Floor();
        this.floors[floor].fullName = floorDetails.fullName;
      }
      if (room == -1) {
        continue;
      }
      if (typeof this.floors[floor].rooms[room] == "undefined") {
        this.floors[floor].rooms[room] = new Room();
        this.floors[floor].rooms[room].fullName = roomDetails.fullName;
        this.floors[floor].rooms[room].roomType = roomDetails.roomType;
        this.floors[floor].rooms[room].isAvilable = roomDetails.isAvilable;
      }
      if (bed == -1) {
        continue;
      }
      this.floors[floor].rooms[room].beds[bed] = new Bed();
      this.floors[floor].rooms[room].beds[bed].isAvilable = isAvilable;
      this.floors[floor].rooms[room].beds[bed].bedType = bedType;
      this.floors[floor].rooms[room].beds[bed].fullName = fullName;
      this.floors[floor].rooms[room].beds[bed].floor = floorDetails.floor;
      this.floors[floor].rooms[room].beds[bed].room = roomDetails.room;
      this.floors[floor].rooms[room].beds[bed].bed = bed;
      this.floors[floor].rooms[room].beds[bed].bedCost = bedCost;
      this.floors[floor].rooms[room].beds[bed].patientId = patientId;
    }
    this.NOData = this.AllBeds.length == 0 ? true : false
  }
  getBedStatus(bed:Bed):string{
    let status = "available";
    if(bed.isAvilable && !BedFunctions.hasPatient(bed)){
      status = "available";
    }
    else if(!bed.isAvilable){
      status = "unavailable";
    }
    else if(bed.isAvilable && BedFunctions.hasPatient(bed)){
      status = "allocated";
    }
    return status;
  }
}
