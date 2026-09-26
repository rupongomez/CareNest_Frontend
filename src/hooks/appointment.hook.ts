import { bookAppointment } from "@/api/appointment.api";
import { useMutation } from "@tanstack/react-query";

export const useBookAppointment = () => {
  return useMutation({
    mutationFn: bookAppointment,
  });
};
