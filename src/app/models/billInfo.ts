import { patientdetails } from "../Services/patientdetails.service"
import { AllocatedPatientDetails, PatientdetailsDemo } from "./patientdetails-model"

export interface BillInfo
{
    id:string,
    totalAmount:number,
    startDateTime:string,
    endDateTime:string,
    billPaid:number,
    balance:number,
    isPaid:boolean,
    userId:string,
    patientId:string
}

export interface patientInOut
{
    id:string,
    productId:string,
    product:Products,
    dateOfProductAdded:string,
    amount:number,
    userId:string,
    patientId:string,
    employeeId:string,
}
export interface Products
{
    id:string,
    productName:string,
    cost:number,
}
export class PatientAllDetails
{
    patientInOut: patientInOut[];
    BillInfo!:BillInfo;
    patientDetails:PatientdetailsDemo;
    constructor(){
        this.patientInOut = [];
        this.patientDetails = new PatientdetailsDemo();        
    }

}