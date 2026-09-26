import apiClient from "@/lib/apiClient";
import { ApiResponse } from "@/types";
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
