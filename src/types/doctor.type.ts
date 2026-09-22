import { User } from "./user.type";

export interface DoctorApplicationData {
  user: {
    name: string;
    email: string;
  };
  doctor: {
    specialization: string;
    licenseNumber: string;
    qualifications: string;
    experienceYears: number;
    contactNumber: string;
    address: string;
    consultationFee: number | undefined;
    bio: string;
  };
}

export interface DoctorApplicationPayload {
  resume: File;
  additionalFiles: File[];
  data: DoctorApplicationData;
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  address?: string;
  specialization: string;
  licenseNumber: string;
  qualifications: string;
  experienceYears: number;
  bio?: string;
  consultationFee?: string;
  contactNumber?: string;
  verificationStatus: string;
  rejectionReason?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  resume?: string;
  resumePublicId: string;
  additionalFiles?: AdditionalFile[];
  isDeleted: boolean;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
}

export interface AdditionalFile {
  url: string;
  publicId: string;
}
