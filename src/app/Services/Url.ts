// export const environment = {
//   production: true,
//   ProductionUrl: 'https://example.com/api',
//   LocalUrl: 'https://localhost:44347',
//   postal: 'https://api.postalpincode.in/',
//   BaseURI: 'https://localhost:44311/api/',
// };

export enum Admin {
  DashBoard = '/AdminDashBoard',
  Event = '/INITIAL_EVENTS',
}
export enum Appointment {
  AppointmentGrid = '/APPOINTMENT_DATA',
}
export enum Patient {
  PatientBookedAppointment = '/PatientBookedAppointment',
  // Appointment = '/AppointmentData',
  Appointment = '/api/Appointments',
  UpcomingAppointment = '/api/Appointments/UpcomingAppointments',
  PastAppointment = '/api/Appointments/PastAppointments',
  DeclineAppointments = '/api/Appointments/DeclineAppointments',
  ApproveReject = '/api/Appointments/ApproveReject',
  GetPrescriptions = '/api/Appointments/GetPrescriptions',
}

export enum AddPhysycian {
  GetGender = '/GetGender',
  GetPhysicianEduaction = '/GetPhysicianEduaction',
  GetNurseEduaction = '/GetNurseEduaction',
  GetPhysicianDesignation = '/GetPhysicianDesignation',
  GetNurseDesignation = '/GetNurseDesignation',
  GetPhysicianDepartment = '/GetPhysicianDepartment',
  GetNurseDepartment = '/GetNurseDepartment',
}

//Admin Hospital
export enum GetAdminHospiatlUser {
  GetAdminHospiatlUsers = '/GetAdminHospiatlUsers',
  UserDetails = '/UserDetails',
}

//Admin Patient
export enum GetAdminPatientUser {
  GetAdminPatientUsers = '/GetAdminHospiatlUsers',
}
