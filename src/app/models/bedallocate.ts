export class Floor{
  rooms:Room[];
  constructor(){
    this.rooms=[];
  }
}

export class Room{
  beds:Bed[];
  constructor(){
    this.beds=[];
  }
}

export class Bed{
  generalWard:number;
  constructor(){
    this.generalWard =1;
  }
}

export class BedManagement
    {
        floor:number
        room:number
        bed:number
        constructor(){
          this.floor = 0;
          this.room = 0;
          this.bed = 0;
        }
    }

export class BedRequest{
  AddBedDetails:BedManagement[];
  RemovedBedDetails:BedManagement[];
  UpdatedBedDetails:BedManagement[];
  constructor(){
    this.AddBedDetails =this.RemovedBedDetails = this.UpdatedBedDetails = [];
  }
}