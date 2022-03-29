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
