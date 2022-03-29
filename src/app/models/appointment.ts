export interface Product {
    id:number;
    name: string;
    gender: string;
    address: string;
    mobile: number;
    age:number;
    email:string;
    physician:string;
    diagnosis?:string;
    AppointmentDateTime?:Date;
    PhysicianId?:string;
    bookslot?:string;
    isCompleted:boolean;
}


