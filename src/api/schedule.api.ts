import apiClient from "@/lib/apiClient";
import { ApiResponse } from "@/types";
import {
  CreateSchedulePayload,
  Schedule,
  ScheduleParams,
} from "@/types/schedule.type";

export const createSchedule = (payload: CreateSchedulePayload) => {
  return apiClient<ApiResponse<Schedule>>("/schedule/create-schedule", {
    method: "POST",
    body: payload,
  });
};

export const getMySchedules = (params: ScheduleParams) => {
  return apiClient<ApiResponse<Schedule>>("/schedule/my-schedules", {
    params,
  });
};
