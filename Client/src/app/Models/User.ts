export class User {
  userId?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  verifyPassword?: string;
  role?: string;
  otp?: string;

  constructor(
    userId?: number,
    username?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    verifyPassword?: string,
    role?: string,
    otp?: string
  ) {
    this.userId = userId;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.verifyPassword = verifyPassword;
    this.role = role;
    this.otp = otp;
  }
}
