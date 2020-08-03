export interface UserTypes {
  username?: string;
  email?: string;
  password?: string;
}

export class User implements UserTypes {
  username?: string;
  email?: string;
  password?: string;
}

export default User
