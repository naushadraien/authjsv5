export interface UserModalType extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "user" | "admin";
  image: string;
  authProviderId: string;
}
