import { Component, OnInit, ViewChild} from '@angular/core';
import { Floor , Room,Bed, BedRequest, BedManagement} from 'src/app/models/bedallocate';
import { BedmangeService } from 'src/app/Services/Bed/bedmange.service';
@Component({
  selector: 'app-bed-allotment',
  templateUrl: './bed-allotment.component.html',
  styleUrls: ['./bed-allotment.component.css']
})
export class BedAllotmentComponent implements OnInit{
  constructor(public service:BedmangeService){
  }
  isAdmin :boolean = false;
  floors:Floor[]=[];
  floor:Floor=new Floor();
  rooms:Room[]=[];
  room:Room=new Room();
  beds:Bed[]=[];
  bed:Bed=new Bed();
  bedRequest!: BedRequest;
  ngOnInit() {
    let Get = localStorage.getItem('currentUser');
    if (typeof Get === 'string') {
      this.isAdmin  = JSON.parse(Get).role == "ADMIN" ? true : false;
    }
    this.service.GetBedDesign().subscribe((res:BedManagement[]) => {
      this.DesignBed(res);
    });
  }
  ResetAll(){
    this.floor=new Floor();
    this.room=new Room();
    this.bed =new Bed();
    this.beds=[];
    this.rooms=[];
  }
  AddFloor() {
      this.room.beds.push(this.bed);
      this.rooms.push(this.room);
      this.floor.rooms = this.rooms;
      this.floors.push(this.floor);
      this.ResetAll();
  }
  AddRoom(i:number){
    this.room.beds.push(this.bed);
    this.floors[i].rooms.push(this.room);
    this.ResetAll();
  }
  AddBed(i:number,j:number){
    this.floors[i].rooms[j].beds.push(this.bed);
    this.ResetAll();
  }
  AllocateBed(i:number,j:number,k:number){
    alert("Floor"+i+"===>"+"Room"+j+"===>"+"Bed"+k);
  }
  removeFloor(i:number){
    this.floors.splice(1,i)
    //this.bedRequest.RemovedBedDetails = ;
  }
  removeRoom(i:number,j:number){
    this.floors[i].rooms.splice(1,j)
    //this.bedRequest.RemovedBedDetails = ;
  }
  removeBed(i:number,j:number,k:number){
    this.floors[i].rooms[j].beds.splice(1,k)
    //this.bedRequest.RemovedBedDetails = ;
  }
  Save(){
   console.log(this.floors);
   this.bedRequest = new BedRequest();
   this.bedRequest.AddBedDetails =[];
   for(let i:number=0;i<this.floors.length;i++){
      for(let j:number=0;j<this.floors[i].rooms.length;j++){
          for(let k:number=0;k<this.floors[i].rooms[j].beds.length;k++){
            let BedManagement:BedManagement={
              floor: i,
              room : j,
              bed : k
            };
            this.bedRequest.AddBedDetails.push(BedManagement);
        }
      }
   }
   this.service.AddBed(this.bedRequest).then((result) => {
      if(result!=null){
        alert("Saved Succefully");
        this.ngOnInit();
      }
   });
  }
  DesignBed(request:BedManagement[]){
    for(let i=0;i<request.length;i++){
      let floor = request[i].floor;
      let room = request[i].room;
      let bed = request[i].bed;
      if(typeof this.floors[floor] == "undefined"){
        this.floors[floor] = new Floor();
      }
      if(typeof this.floors[floor].rooms[room] == "undefined"){
        this.floors[floor].rooms[room] = new Room();
      }
      this.floors[floor].rooms[room].beds[bed] = new Bed();
    }
  }
}

