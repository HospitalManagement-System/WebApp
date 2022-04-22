import { Guid } from "guid-typescript";

export class Attendance {
   constructor(
      public id?:Guid,
      public physicianId?:string ,
      public timeSlot?:string[],
      public arrTimeSlot?:string,
      public dateTime?:Date,
      public isAbsent?:boolean,
    public firstName?:string,
    public speciliazation?:string,
   ){}
   
  }

export interface Specialization 
{
   id:string;
   specialization:string;
}


