export interface UserTypes {
  full_name?: string;
  email?: string;
  password?: string;
}

export class User implements UserTypes {
  full_name?: string;
  email?: string;
  password?: string;
}

export default User
