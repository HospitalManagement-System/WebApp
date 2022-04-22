import { Patientrelativedetails } from "./patientrelativedetails";

export class PatientdetailsDemo {
       
        id?: string;
        firstName!: string;
        lastName!: string;
        dateofBirth!: Date;
        age!: string;
        gender!: boolean;
        race!: string;
        ethinicity!: string;
        //languagesknown!: string;
        email!: string;
        address!: string;
        pincode!: string;
        country!: string;
        state!: string;
        contact!: string;
        allergynameList!:string;
        allergytypeList!:string;
        clinicalInformation!:string;
        isFatal!: boolean;
        patientId?:string;
        //patientDetails!:string;
        createddate!:Date;
        allergyDetails!:string;
        allergyList!:string[];
        allergyListname!:string[];
        patientRelativeDetails?: Patientrelativedetails ;
}
