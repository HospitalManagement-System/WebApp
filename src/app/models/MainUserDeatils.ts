import { Guid } from 'guid-typescript';

export class MainUserDetails {
  constructor(
    public Id: Guid | undefined,

    public UserName: string,

    public Password: string,

    public Status: boolean,

    public IsActive: boolean,

    public IsLocked: boolean,

    public IsFirstLogIn: boolean,

    public NoOfAttempts: number //public RoleId :Guid
  ) {}
}
