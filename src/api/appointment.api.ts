import apiClient from "@/lib/apiClient";
import { ApiResponse, PublicDoctorProfile } from "@/types";
import {
  BookAppointmentPayload,
  BookAppointmentResponse,
} from "@/types/appointment.type";

export const bookAppointment = (payload: BookAppointmentPayload) => {
  return apiClient<ApiResponse<BookAppointmentResponse>>(
    "/appointment/book-appointment",
    {
      method: "POST",
      body: payload,
    },
  );
};

export const getMyAppointments = (params: {
  page?: number;
  limit?: number;
}) => {
  return apiClient<
    ApiResponse<{ doctor: PublicDoctorProfile; status: string; id: string }[]>
  >("/appointment/my-appointments", {
    params,
  });
};
