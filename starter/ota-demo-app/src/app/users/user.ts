export interface IUser {
  id: number;
  name: string;
  role: string;
}

export class User implements IUser {
  id: number;
  name: string;
  role: string;

  public constructor() {}
}
