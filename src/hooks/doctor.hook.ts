import { applyAsDoctor, getAllDoctors, verifyDoctorAccount } from "@/api";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";

export const useApplyAsDoctor = () => {
  return useMutation({
    mutationFn: applyAsDoctor,
  });
};
export const useVerifyDoctorAccount = () => {
  return useMutation({
    mutationFn: verifyDoctorAccount,
  });
};

export const useGetAllDoctors = () => {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: getAllDoctors,
  });
};

export const useSuspenseGetAllDoctors = () => {
  return useSuspenseQuery({
    queryKey: ["doctors"],
    queryFn: getAllDoctors,
  });
};
