import { Guid } from 'guid-typescript';

export class User {
  id?: Guid | undefined;
  userName!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  isLocked!: boolean;
  isActive!: boolean;
  isFirstLogin!: boolean;
  role: any;
  token?: string;
  loggedIn: any;
  NoOfAteempt!: number;
}

export class UserDetals{
  Id?: Guid | undefined;
  Designation!: string;
  EmployeeDetails!: any;
  firstName!: string;
  lastName!: string;
  email!: string;
  IsLocked!: boolean;
  IsActive!: boolean;
  IsFirstLogIn!: boolean;
  Role: any;
  Token?: string;
  loggedIn: any;
  NoOfAttempts!: number;
  CostPerVisit!:number;
}

// Designation: null
// EmployeeDetails: null
// Id: "93a3c427-1a04-4f4a-84f1-8a79dd469ff9"
// IsActive: true
// IsFirstLogIn: false
// IsLocked: false
// NoOfAttempts: 0
// Password: "UGFzc3dvcmRAMTIz"
// PatientDetails: null
// Role: "ADMIN"
// RoleId: "b6290c47-aa8d-4d67-aabd-f79b94abda4b"
// RoleMaster: {Id: 'b6290c47-aa8d-4d67-aabd-f79b94abda4b', UserRole: 'ADMIN', lstUserDetails: Array(0)}
// Status: true
// Token: null
// UserName: "admin@gmail.com"
