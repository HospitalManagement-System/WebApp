export class Floor{
  isAvilable:boolean;
  rooms:Room[];
  fullName :string
  constructor(){
    this.isAvilable = true;
    this.rooms=[];
    this.fullName="";
  }
}

export class Room{
  isAvilable:boolean;
  beds:Bed[];
  fullName :string;
  roomType : number;
  constructor(){
    this.isAvilable = true;
    this.beds=[];
    this.fullName="";
    this.roomType = RoomType.General_ward;
  }
}

export class Bed{
  isAvilable:boolean;
  bedType:number;
  fullName :string;
  floor:number;
  room:number;
  bed :number;
  constructor(){
    this.bedType = BedType.General_Bed;
    this.isAvilable = true;
    this.fullName="";
    this.floor =-1;
    this.room = -1;
    this.bed =-1;
  }
}

export class BedManagement
{
     floor:number
     room:number
     bed:number
     isAvilable:boolean
     bedType: number
     roomType:number
     fullName :string
     constructor(){
       this.floor = 0;
       this.room = 0;
       this.bed = 0;
       this.isAvilable = true;
       this.bedType = BedType.General_Bed;
       this.roomType = RoomType.General_ward;
       this.fullName = "";
     }
}

export enum RoomType{
  General_ward = 1,
  Medical_Store = 2,
  ICU = 3,
  Laboratory = 4  
}

export enum BedType{
  General_Bed = 1,
  Emergancy_Bed = 2,
  Labour_Bed = 3,
  Children_Bed = 4,
  ICU_Bed = 5,
  Executive_Bed = 6,
  Semi_Bed = 7
}

export class bedRequest{
  bedDetails!: BedManagement;
  fromType!: fromType;
}

export enum fromType{
  filter = 1,
  allocate = 2
}