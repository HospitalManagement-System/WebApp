export class HospitalUser {
  // id?: number;
  // title?: string;
  // firstName?: string;
  // lastName?: string;
  // contact?: number;
  // specialization?: string;
  // email?: string;
  // createdOn?: string;
  // isActive?: boolean;

  // constructor(
  //   id: number | undefined,
  //   title: string | undefined,
  //   firstName: any,
  //   lastName: any,
  //   contact: any,
  //   specialization: any,
  //   email: any,
  //   createdOn: any,
  //   isActive: any
  // ) {
  //   this.id = id;
  //   this.title = title;
  //   this.firstName = firstName;
  //   this.lastName = lastName;
  //   this.contact = contact;
  //   this.specialization = specialization;
  //   this.email = email;
  //   this.createdOn = createdOn;
  //   this.isActive = isActive;
  // }
  constructor(
    public id: number,
    public title: string,
    public firstName: any,
    public role: any,
    public contact: any,
    public specialization: any,
    public email: any,
    public createdOn: any,
    public isActive: any,
    public IsLocked: any
  ) {}
}
