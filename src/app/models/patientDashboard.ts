export interface AppointmentData {
  id: number;
  doctorName: string;
  appointmentDateTime: Date;
  appointmentStatus : string;
  nurseName: string;
  isDeclined: boolean;
  diagnosis:string;
  deletedReason:string;
  deletedBy:string;
  
}

export interface DrugData{
  id: number;
  drugName: string;
  drugGenericName : string;
  drugManufacturerName: string;
  isDrugData: boolean;
  drugForm:string;
  drugStrength:string;
}
export interface DrugHeaderData {
  // id: number;
  drugName: string;
  drugGenericName : string;
  drugManufacturerName: string;
  drugForm:string;
  drugStrength:string;
  // isDeclined: boolean;
}

export const drugHeaderData: DrugHeaderData[] = [
  {
    drugName: 'Paracitamol',
    drugGenericName : 'Fever',
    drugManufacturerName: 'Tablet',
    drugForm:'Tablet',
    drugStrength: '1'
  }
];

// export const appointmentData: AppointmentData[] = [
  
// ];
export interface Appointment { 
  value: string;
  viewValue: string;
}
export interface AppointmentPastHeaderData {
  // id: number;
  doctorName: string;
  appointmentStatus: string;
  date: Date;
  nurseName: string;
  diagnosis:string;
  // isDeclined: boolean;
}
export interface AppointmentHeaderData {
  appointmentStatus: string;
  doctorName: string;
  date: string;
  nurseName: string;
  diagnosis: string;
}

export const appointments: Appointment[] = [
  { value: '1', viewValue: 'Upcoming Appointments' },
  { value: '2', viewValue: 'Past Appointments' },
  { value: '3', viewValue: 'Decline Appointments' }
];

export const appointmentPastHeaderData: AppointmentPastHeaderData[] = [
  {
    doctorName: 'Doctor Name',
    date: new Date('2/12/2021'),
    nurseName: 'Nurse Name',
    appointmentStatus : 'AppointmentStatus',
    diagnosis: 'Diagnosis'
  }
];

export const appointmentHeaderData: AppointmentHeaderData[] = [
  {
    doctorName: 'Doctor Name',
    date: 'Appointment Date',
    appointmentStatus: 'AppointmentStatus',
    nurseName: 'Nurse Name',
    diagnosis: 'Diagnosis'
  }
];