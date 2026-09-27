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

export const getMyAppointments = (params: {
  page?: number;
  limit?: number;
}) => {
  return apiClient("/appointment/my-appointments", {
    params,
  });
};
