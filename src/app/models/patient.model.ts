export class PatientBookAppointmentDetails {
  constructor(public start: string, public end: string) {}
}

export interface Diagnosics {
  id: string;
  value: string;
}

//constructor(public ID: number, Value: string) {}

// export interface Physician {
//   Id: number;
//   PhysicianName: string;
// }

export interface Physician {
  id: string;
  physicianName: string;
}

// export interface Booking {
//   id: number;
//   title: string;
//   date: string;
//   description: string;
//   color: string;
// }

export interface Mode {
  id: string;
  modeType: string;
}

export class Booking {
  // public id: string,
  constructor(
    id: string,
    title: string,
    date: string,
    description: string,
    color: string,
    appointmentType: string,
    diagnosis: string,
    appointmentStatus: string,
    isCompleted: boolean,
    appointmentDateTime: string,
    patientId: string,
    physicianId: string,
    nurseId: string,
    bookslot: string,
    Mode: string
  ) {}
}

export class Employee {
  // public id: string,
  constructor(
    userName: string,
    roleId: string,
    employeeDetails: {
      title: string;
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      contact: string;
      specialization: string;
      email: string;
      Designation: string;
    }
  ) {}
}
