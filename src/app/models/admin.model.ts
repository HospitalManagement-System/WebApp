// export class AdminDashboard {
//   constructor(Appointments: number, LockedAccount: number) {}
// }

export interface AdminDashboard {
  Appointments: number;
  LockedAccount: number;
}

export interface Master { 
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  imageUrl: string;
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export class EventMap {
  constructor(public id: number, public title: string, public start: string) {}
}

//Patient
export interface Deactivate {
  id: number;
  firstName: string;
  contact: number;
  email: string;
  isActive: boolean;
}

export interface SoftDelete {
  id: number;
  firstName: string;
  contact: number;
  email: string;
  isActive: boolean;
}

export interface AdminPatient {
  userId: number;
  // title: string;
  firstName: string;
  //lastName: string;
  contact: number;
  specialization: string;
  email: string;
  //createdOn: string;
  isActive: boolean;
  isLocked: boolean;
}

export interface Specalization {
  id: string;
  value: string;
}

export interface Department {
  id: string;
  value: string;
}

export interface Eduaction {
  id: string;
  value: string;
}

export interface Gender {
  id: string;
  value: string;
}

export interface Designation {
  id: string;
  value: string;
}
