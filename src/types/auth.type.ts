export interface RegistrationPayload {
  name: string;
  email: string;
  patient: {
    contactNumber?: string;
  };
  password: string;
}
